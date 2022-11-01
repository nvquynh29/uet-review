import avatar from "../../images/avatar.png";

function Comment() {
  return (
    <div className="row mt-4 align-items-center justify-content-center commentContainer">
      <div className="col-2 d-flex justify-content-end">
        <img src={avatar} alt="avatar" className="commentAvt"></img>
      </div>
      <div className="col-7">
        <p className="commentUsername">Trịnh Mai Huy</p>
        <p className="commentContent">Tuyệt vời ông mặt trời!</p>
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
          >
            <i className="bi bi-hand-thumbs-up"></i>
            <span>1.2k</span>
          </button>
          <button
            className="reactionButton"
            id="dislikeButton"
            style={{ fontSize: "1.05rem" }}
          >
            <i className="bi bi-hand-thumbs-down"></i>
            <span>1.2k</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Comment;
