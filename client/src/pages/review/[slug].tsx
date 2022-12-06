import { useCallback, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useParams } from "react-router-dom";

import { io, Socket } from "socket.io-client";
import { getPostBySlug } from "../../api/post";
import CommentElement from "../../components/review/CommentElement";
import CommentForm from "../../components/review/CommentForm";
import ReportModal from "../../components/review/ReportModal";
import avatar from "../../images/avatar.png";
import { getAccessToken, getUID, isLoggedIn } from "../../utils/cookies";
import { Reaction, ReportType } from "../../utils/enum";
import { IComment, IParams, PostData } from "../../utils/TypeScript";
import { lecturers, subjects } from "../create_review";

const socket: Socket = io(process.env.REACT_APP_SOCKET_URL as string, {
  auth: {
    token: getAccessToken(),
  },
});

const DetailReview = () => {
  const uid = getUID();
  const loggedIn = isLoggedIn();
  const slug = useParams<IParams>().slug;
  const [postData, setPostData] = useState<PostData>();
  // TODO: Refactor using T & { type: ReactionType }
  const [reactionCount, setReactionCount] = useState<{
    likes: number;
    dislikes: number;
  }>({
    likes: 0,
    dislikes: 0,
  });

  useEffect(() => {
    fetchPost();
  }, []);

  useEffect(() => {
    socket.on("post-reacted", (data) => {
      const { likes, dislikes, reaction, userId } = data;
      setReactionCount({ likes, dislikes });
      if (uid && userId && uid == userId) {
        setClientReaction(reaction);
      }
    });

    // return () => {
    //   socket.disconnect()
    // }
  }, []);

  const fetchPost = useCallback(async () => {
    try {
      const { data } = await getPostBySlug(slug);
      setPostData(data);
      setReactionCount({
        likes: data.post.likes as number,
        dislikes: data.post.dislikes as number,
      });
      setClientReaction(data.reaction);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const reactPost = async (reactionCode: Reaction) => {
    socket.emit("react-post", {
      slug,
      code: reactionCode,
    });
  };

  const selected = postData?.post.lecturer_id ? "lecturer" : "subject";

  // *handleReaction
  const [clientReaction, setClientReaction] = useState(Reaction.Null);
  const handleReactionButton = (reactionCode: Reaction) => {
    if (!loggedIn) {
      toast.remove();
      toast.error("Vui lòng đăng nhập để sử dụng chức năng này");
      return;
    }
    switch (clientReaction) {
      case reactionCode:
        setClientReaction(Reaction.Null);
        break;
      default:
        setClientReaction(reactionCode);
        break;
    }
    reactPost(reactionCode);
  };

  const updateComment = (comment: IComment) => {
    setPostData((prev) => {
      const newComments: IComment[] = [];
      prev?.comments.forEach((item) => {
        newComments.push(item);
      });

      newComments.push(comment);
      return {
        post: prev?.post,
        author: prev?.author,
        comments: newComments,
      } as PostData;
    });
  };

  const [isReportModalShow, setReportModalShow] = useState(false);
  const invokeReportModal = () => {
    if (!loggedIn) {
      toast.remove();
      toast.error("Vui lòng đăng nhập để sử dụng chức năng này");
      return;
    }
    setReportModalShow(!isReportModalShow);
  };

  const [isReported, setReported] = useState(false);

  return (
    <div className="my-4 detail_review">
      <Toaster />
      <ReportModal
        reportType={ReportType.Review}
        isShow={isReportModalShow}
        invokeModal={invokeReportModal}
        setReported={setReported}
        slug={slug}
      />

      <div className="row mt-4 align-items-center postInfo">
        <div className="col-9">
          <h2>{postData?.post.title}</h2>
        </div>
        <div className="col-3 reactionContainer">
          <button
            className="reactionButton"
            id="likeButton"
            onClick={() => handleReactionButton(Reaction.Like)}
          >
            <i
              className={
                "bi " +
                (clientReaction === Reaction.Like
                  ? "bi-hand-thumbs-up-fill"
                  : "bi-hand-thumbs-up")
              }
              style={{ color: "#5b8cf7" }}
            ></i>
            <span>{reactionCount.likes}</span>
          </button>
          <button
            className="reactionButton"
            id="dislikeButton"
            onClick={() => handleReactionButton(Reaction.Dislike)}
          >
            <i
              className={
                "bi " +
                (clientReaction === Reaction.Dislike
                  ? "bi-hand-thumbs-down-fill"
                  : "bi-hand-thumbs-down")
              }
              style={{ color: "#f10000" }}
            ></i>
            <span>{reactionCount.dislikes}</span>
          </button>
          <button className="reactionButton" id="reportButton">
            <i
              className={
                "bi " + (isReported === true ? "bi-flag-fill" : "bi-flag")
              }
              style={isReported ? { color: "#cc3300" } : { color: "black" }}
              onClick={invokeReportModal}
            ></i>
          </button>
        </div>
      </div>
      <div className="row align-items-center postInfo">
        <div className="col-4 d-flex justify-content-start">
          <p className="date" style={{ margin: "auto 0" }}>
            Review by {postData?.author.nickname}
          </p>
          <img src={avatar} alt="avatar" className="avatar"></img>
        </div>
        <div className="col-8 d-flex justify-content-end">
          <p className="date" style={{ margin: "auto 0" }}>
            {new Date(
              postData ? postData.post.created_at : "Date error"
            ).toLocaleString()}
          </p>
        </div>
      </div>

      <div className="row my-4 justify-content-md-center">
        <div className="col-4">
          <p className="post-label reviewObject">Đối tượng Review</p>
        </div>
        <div className="col-5">
          <p className="labelContent reviewObject">
            {selected === "lecturer"
              ? lecturers.find(
                  (item) => item.id === postData?.post?.lecturer_id
                )?.name
              : subjects.find((item) => item.id === postData?.post?.subject_id)
                  ?.name}
          </p>
        </div>
      </div>

      {postData?.post.reviews.map((item) => (
        <div key={item._id} className="row mt-4">
          <div className="col-4">
            <p className="post-label">{item.name}</p>
          </div>
          <div className="col-8">
            <p className="labelContent" id="review3">
              {item.content}
            </p>
          </div>
        </div>
      ))}

      <div className="row mt-4">
        <div className="row">
          <div className="form-group">
            <p className="post-label" style={{ width: "13rem" }}>
              Đánh giá khác
            </p>

            <p className="mainContent">{postData?.post.content}</p>
          </div>
        </div>

        <div className="tagRow d-flex flex-row">
          <p>Tag 1</p>
          <p>Tag 2</p>
        </div>
      </div>

      <h3 className="mt-5">Bình luận</h3>
      {postData?.comments?.map((item) => (
        <CommentElement comment={item} />
      ))}

      <CommentForm
        id={postData ? postData.post._id : ""}
        updateComments={updateComment}
      />
    </div>
  );
};

export default DetailReview;
