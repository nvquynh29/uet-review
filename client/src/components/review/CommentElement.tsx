import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import avatar from "../../images/avatar.png";
import { getAccessToken, getUID, isLoggedIn } from "../../utils/cookies";
import { Reaction, ReportType } from "../../utils/enum";
import { IComment } from "../../utils/TypeScript";
import ReportModal from "./ReportModal";
import toast from 'react-hot-toast';
interface IProps {
  comment: IComment;
}

const socket: Socket = io(process.env.REACT_APP_SOCKET_URL as string, {
  auth: {
    token: getAccessToken(),
  },
});

function CommentElement(props: IProps) {
  const uid = getUID(); // user id
  const loggedIn = isLoggedIn()
  const [clientReaction, setClientReaction] = useState(props.comment.type);
  const [reactionCount, setReactionCount] = useState<{
    likes: number;
    dislikes: number;
  }>({
    likes: props.comment.likes,
    dislikes: props.comment.dislikes,
  });

  const [isReported, setReported] = useState(false);
  const [isReportModalShow, setReportModalShow] = useState(false);
  const invokeReportModal = () => {
    if (!loggedIn) {
      toast.remove();
      toast.error('Vui lòng đăng nhập để sử dụng chức năng này')
      return
    }
    setReportModalShow(!isReportModalShow);
    console.log(isReportModalShow);
  };

  useEffect(() => {
    socket.on("comment-reacted", (data) => {
      const { _id, likes, dislikes, reaction, userId } = data;
      if (props.comment._id === _id) {
        setReactionCount({ likes, dislikes });
        if (uid && userId && uid == userId) {
          setClientReaction(reaction);
        }
      }
    });

    // return () => {
    //   socket.disconnect()
    // }
  }, []);

  const handleReactionButton = (reactionCode: number) => {
    if (!loggedIn) {
      toast.remove();
      toast.error('Vui lòng đăng nhập để sử dụng chức năng này')
      return
    }
    switch (clientReaction) {
      case reactionCode:
        setClientReaction(Reaction.Null);
        break;
      default:
        setClientReaction(reactionCode);
        break;
    }
    reactComment(reactionCode);
  };

  const showToast = () => {
    toast.success('OKKKKKK')
  }

  const reactComment = async (reactionCode: Reaction) => {
    socket.emit("react-comment", {
      code: reactionCode,
      _id: props.comment._id,
    });
  };

  return (
    <div className="row mt-4 align-items-center justify-content-center commentContainer">
      <div className="col-2 d-flex justify-content-end">
        <img src={avatar} alt="avatar" className="commentAvt"></img>
      </div>
      <div className="col-7">
        <p className="commentUsername">Trịnh Mai Huy</p>
        <p className="commentContent">{props?.comment?.content}</p>
      </div>
      <div className="col-2 d-flex flex-column align-items-end">
        <div className="date mb-auto">
          <p className="date">01/11/2022</p>
        </div>
        <div className="reactionContainer">
          <button
            className="reactionButton"
            id="likeButton"
            style={{ fontSize: "1.05rem" }}
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
            style={{ fontSize: "1.05rem" }}
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
      <ReportModal
        reportType={ReportType.Comment}
        isShow={isReportModalShow}
        invokeModal={invokeReportModal}
        setReported={setReported}
        slug={''}
      />
    </div>
  );
}

export default CommentElement;
