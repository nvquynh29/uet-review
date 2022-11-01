import React from "react";
// import { useParams } from 'react-router-dom'

// import { IParams } from '../../utils/TypeScript'
import avatar from "../../images/avatar.png";
import Comment from "../../components/review/Comment";

const DetailReview = () => {
  // const id = useParams<IParams>().slug

  let selected = "lecturer";

  return (
    <div className="my-4 detail_review">
      <div className="row mt-4 align-items-center postInfo">
        <div className="col-7">
          <h2>Review by Trinh Mai Huy</h2>
        </div>
        <div className="col-2 d-flex justify-content-end align-self-center">
          <img src={avatar} alt="avatar" className="avatar"></img>
          <p className="date" style={{ margin: "auto" }}>
            01/11/2022
          </p>
        </div>
        <div className="col-3 reactionContainer">
          <button className="reactionButton" id="likeButton">
            <i className="bi bi-hand-thumbs-up"></i>
            <span>1.2k</span>
          </button>
          <button className="reactionButton" id="dislikeButton">
            <i className="bi bi-hand-thumbs-down"></i>
            <span>1.2k</span>
          </button>
        </div>
      </div>

      <div className="row mt-4 justify-content-center">
        <div className="col-md-2">
          <p className="post-label reviewObject">Đối tượng Review</p>
        </div>
        <div className="col-md-4">
          <p className="labelContent reviewObject">Thầy Nguyễn Văn A</p>
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-4">
          <p className="post-label">
            {selected === "lecturer"
              ? "Mức độ nghiêm khắc"
              : "Nội dung môn học"}
          </p>
        </div>
        <div className="col-8">
          <p className="labelContent" id="review0">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
            in neque ipsum.
          </p>
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-4">
          <p className="post-label">
            {selected === "lecturer"
              ? "Mức độ hiểu bài"
              : "Cách thức tính điểm"}
          </p>
        </div>
        <div className="col-8">
          <p className="labelContent" id="review1">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
            in neque ipsum.
          </p>
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-4">
          <p className="post-label">
            {selected === "lecturer" ? "Điểm số" : "Hình thức thi giữa kỳ"}
          </p>
        </div>
        <div className="col-8">
          <p className="labelContent" id="review2">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
            in neque ipsum.
          </p>
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-4">
          <p className="post-label">
            {selected === "lecturer"
              ? "Tương tác với sinh viên"
              : "Hình thức thi cuối kỳ"}
          </p>
        </div>
        <div className="col-8">
          <p className="labelContent" id="review3">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
            in neque ipsum.
          </p>
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-4">
          <p className="post-label">
            {selected === "lecturer" ? "Môn học đề xuất" : "Giảng viên đề xuất"}
          </p>
        </div>
        <div className="col-8">
          <p className="labelContent" id="review4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
            in neque ipsum.
          </p>
        </div>

        <div className="row mt-4">
          <div className="form-group">
            <p className="post-label" style={{ width: "13rem" }}>
              Nội dung
            </p>

            <p className="mainContent">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Vestibulum in neque ipsum. Nulla elementum nunc vel tellus
              porttitor maximus. Aenean sed pulvinar elit, nec porta ligula. Sed
              ac iaculis tellus. Nam odio sapien, porta ut rutrum ut,
              pellentesque non eros. Donec varius nibh nec gravida finibus. Sed
              dapibus felis dolor, at aliquam diam rutrum in. Donec sed cursus
              arcu. Sed pellentesque tellus vel lectus elementum, ut mattis enim
              consequat. Maecenas ultricies venenatis tellus eget congue. Ut id
              sagittis tortor. Mauris eget iaculis ligula. Mauris eleifend
              ornare augue eget pellentesque. Maecenas libero nibh, tempus nec
              elementum at, ultricies nec augue.
            </p>
          </div>
        </div>

        <div className="tagRow d-flex flex-row">
          <p>Tag 1</p>
          <p>Tag 2</p>
        </div>
      </div>

      <h3 className="mt-5">Bình luận</h3>
      <Comment />

      {/* CommentForm */}
      <div className="row mt-5 align-items-center justify-content-center commentContainer">
        <div className="col-2 d-flex justify-content-end">
          <img src={avatar} alt="avatar" className="commentAvt"></img>
        </div>
        <div className="col-9">
          <form>
            <input
              className="commentInput"
              type="text"
              placeholder="Viết bình luận..."
            ></input>
          </form>
        </div>
      </div>
      {/* End CommentForm */}
    </div>
  );
};

export default DetailReview;
