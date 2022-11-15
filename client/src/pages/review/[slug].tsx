import { useEffect, useCallback, useState } from "react";
import { useParams } from "react-router-dom";

import { IParams, IComment } from "../../utils/TypeScript";
import { Reaction } from "../../utils/enum";
import avatar from "../../images/avatar.png";
import CommentElement from "../../components/review/CommentElement";
import { getPostBySlug } from "../../api/post";
import { lecturers, subjects } from "../create_review";
import CommentForm from "../../components/review/CommentForm";
import { io, Socket } from 'socket.io-client';
import { getAccessToken, getUID } from '../../utils/cookies';

export interface Author {
  nickname: string;
  email: string;
}

export interface Post {
  _id: string;
  author_id: string;
  lecturer_id?: string;
  subject_id?: string;
  title: string;
  slug: string;
  content: string;
  likes: number;
  dislikes: number;
  reviews: Review[];
  tags: any[];
  created_at: string;
  updated_at: string;
}

export interface Review {
  name: string;
  content: string;
  _id: string;
}

export type PostData = {
    post: Post;
    author: Author;
    comments: IComment[];
    reaction: number;  // reaction type
}

const socket: Socket = io(process.env.REACT_APP_SOCKET_URL as string, {
  auth: {
    token: getAccessToken()
  }
})

const DetailReview = () => {
  const uid = getUID()
  const slug = useParams<IParams>().slug;
  const [postData, setPostData] = useState<PostData>();
  // TODO: Refactor using T & { type: ReactionType }
  const [reactionCount, setReactionCount] = useState<{likes: number, dislikes: number}>({
    likes: 0,
    dislikes: 0,
  })

  useEffect(() => {
    fetchPost();
  }, []);

  useEffect(() => {
    socket.on('post-reacted', (data) => {
      const { likes, dislikes, reaction, userId } = data
      setReactionCount({likes, dislikes})
      if (uid && userId && uid == userId) {
        setClientReaction(reaction)
      }
    })

    // return () => {
    //   socket.disconnect()
    // }
  }, [])

  const fetchPost = useCallback(async () => {
    try {
      const { data } = await getPostBySlug(slug);
      setPostData(data);
      setReactionCount({
        likes: data.post.likes as number,
        dislikes: data.post.dislikes as number,
      })
      setClientReaction(data.reaction)
    } catch (error) {
      console.log(error);
    }
  }, []);

  const reactPost = async (reactionCode: Reaction) => {
    socket.emit('react-post', {
      slug,
      code: reactionCode,
    })
  }

  const selected = postData?.post.lecturer_id ? "lecturer" : "subject";

  // *handleReaction
  const [clientReaction, setClientReaction] = useState(Reaction.Null);
  const handleReactionButton = (reactionCode: Reaction) => {
    switch (clientReaction) {
      case reactionCode:
        setClientReaction(Reaction.Null);
        break;
      default:
        setClientReaction(reactionCode);
        break;
    }
    reactPost(reactionCode)
  };

  const updateComment = (comment: IComment) => {
    setPostData(prev => {
      const newComments: IComment[] = []
      prev?.comments.forEach(item => {
        newComments.push(item)
      });

      newComments.push(comment)
      return {
        post: prev?.post,
        author: prev?.author,
        comments: newComments,
      } as PostData
    })
  }

  return (
    <div className="my-4 detail_review">
      <div className="row mt-4 align-items-center postInfo">
        <div className="col-7">
          <h2>Review by {postData?.author.nickname}</h2>
        </div>
        <div className="col-2 d-flex justify-content-end align-self-center">
          <img src={avatar} alt="avatar" className="avatar"></img>
          <p className="date" style={{ margin: "auto" }}>
            {new Date().toLocaleDateString("vi")}
          </p>
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
        </div>
      </div>

      <div className="row mt-4 justify-content-center">
        <div className="col-md-2">
          <p className="post-label reviewObject">Đối tượng Review</p>
        </div>
        <div className="col-md-4">
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
        <div className="row mt-4">
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

      <CommentForm id={postData ? postData.post._id : ""} updateComments={updateComment} />
    </div>
  );
};

export default DetailReview;
