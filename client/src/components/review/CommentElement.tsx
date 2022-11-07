import avatar from "../../images/avatar.png";
import { IComment } from "../../utils/TypeScript";
import { useState } from "react";
import { Reaction } from "../../utils/enum";
interface IProps {
  comment: IComment;
}

function CommentElement(props: IProps) {
  const [clientReaction, setClientReaction] = useState(Reaction.Null);

  const handleReactionButton = (reactionCode: number) => {
    switch (clientReaction) {
      case reactionCode:
        setClientReaction(Reaction.Null);
        break;
      default:
        setClientReaction(reactionCode);
        break;
    }
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
            <span>{clientReaction === Reaction.Like ? 0 + 1 : 0}</span>
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
            <span>{clientReaction === Reaction.Dislike ? 0 + 1 : 0}</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default CommentElement;
