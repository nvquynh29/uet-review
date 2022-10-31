import React, { useState } from "react";
import { InputChange } from "../utils/TypeScript";

const CreateReview = () => {
  const initState = {
    user: "",
    title: "",
    content: "",
    reviews: ["", "", "", "", ""],
    subject: "",
    lecturer: "",
    createdAt: new Date().toISOString(),
  };

  const [review, setReview] = useState(initState);
  const [selected, setSelected] = useState("lecturer");

  const isSelected = (value: string): boolean => selected === value;

  const handleChangeRadio = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelected(e.currentTarget.value);
  };

  const handleChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value, name } = e.target;
    setReview({ ...review, [name]: value });
  };

  const review1 = (e: InputChange) => {
    const { value, name } = e.target;
    let newReviews = review.reviews;
    newReviews[0] = value;
    setReview({ ...review, [name]: newReviews });
  };

  const review2 = (e: InputChange) => {
    const { value, name } = e.target;
    let newReviews = review.reviews;
    newReviews[1] = value;
    setReview({ ...review, [name]: newReviews });
  };

  const review3 = (e: InputChange) => {
    const { value, name } = e.target;
    let newReviews = review.reviews;
    newReviews[2] = value;
    setReview({ ...review, [name]: newReviews });
  };

  const review4 = (e: InputChange) => {
    const { value, name } = e.target;
    let newReviews = review.reviews;
    newReviews[3] = value;
    setReview({ ...review, [name]: newReviews });
  };

  const review5 = (e: InputChange) => {
    const { value, name } = e.target;
    let newReviews = review.reviews;
    newReviews[4] = value;
    setReview({ ...review, [name]: newReviews });
  };

  const handleChangeTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value, name } = e.target;
    setReview({ ...review, [name]: value });
  };

  const handleChangeInput = (e: InputChange) => {
    const { value, name } = e.target;
    setReview({ ...review, [name]: value });
  };

  const handleSubmit = async () => {
    console.log(review);
  };

  return (
    <div className="my-4 create_review">
      <div className="form-group position-relative">
        <label htmlFor="title" className="post-label">
          Tên bài viết
        </label>
        <input
          type="text"
          className="form-control"
          value={review.title}
          name="title"
          onChange={handleChangeInput}
        />
      </div>

      <div className="row mt-4 align-items-center">
        <div className="col-md-6">
          <div className="form-group selectPostType">
            <input
              type="radio"
              name="lecturer"
              value="lecturer"
              checked={isSelected("lecturer")}
              onChange={handleChangeRadio}
            />
            <label htmlFor="lecturer">Giảng viên</label>
            <input
              type="radio"
              name="subject"
              value="subject"
              checked={isSelected("subject")}
              onChange={handleChangeRadio}
            />
            <label htmlFor="subject">Môn học</label>
          </div>
        </div>

        <div className="col-md-4">
          <div className="form-group selectContainer">
            {selected === "lecturer" ? (
              <select
                className="form-control text-capitalize"
                value={review.lecturer}
                name="lecturer"
                onChange={handleChangeSelect}
              >
                <option value="">Chọn giảng viên</option>
                <option value="Nguyễn Văn A">Nguyễn Văn A</option>
                <option value="Nguyễn Văn B">Nguyễn Văn B</option>
              </select>
            ) : (
              <select
                className="form-control text-capitalize"
                value={review.subject}
                name="subject"
                onChange={handleChangeSelect}
              >
                <option value="">Chọn môn học</option>
                <option value="Giải tích 1">Giải tích 1</option>
                <option value="Giải tích 2">Giải tích 2</option>
              </select>
            )}
          </div>
        </div>
      </div>

      <div className="row mt-4 mx-0 descriptionContainer">
        <p>Description</p>
      </div>

      <div className="row mt-4">
        <div className="col-4">
          <label htmlFor="reviews" className="post-label">
            {selected === "lecturer"
              ? "Mức độ nghiêm khắc"
              : "Nội dung môn học"}
          </label>
        </div>
        <div className="col-8">
          <input
            type="text"
            className="form-control"
            id="review0"
            name="reviews"
            value={review.reviews[0]}
            onChange={review1}
          />
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-4">
          <label htmlFor="reviews" className="post-label">
            {selected === "lecturer"
              ? "Mức độ hiểu bài"
              : "Cách thức tính điểm"}
          </label>
        </div>
        <div className="col-8">
          <input
            type="text"
            className="form-control"
            id="review1"
            name="reviews"
            value={review.reviews[1]}
            onChange={review2}
          />
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-4">
          <label htmlFor="reviews" className="post-label">
            {selected === "lecturer" ? "Điểm số" : "Hình thức thi giữa kỳ"}
          </label>
        </div>
        <div className="col-8">
          <input
            type="text"
            className="form-control"
            id="review2"
            name="reviews"
            value={review.reviews[2]}
            onChange={review3}
          />
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-4">
          <label htmlFor="reviews" className="post-label">
            {selected === "lecturer"
              ? "Tương tác với sinh viên"
              : "Hình thức thi cuối kỳ"}
          </label>
        </div>
        <div className="col-8">
          <input
            type="text"
            className="form-control"
            id="review3"
            name="reviews"
            value={review.reviews[3]}
            onChange={review4}
          />
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-4">
          <label htmlFor="reviews" className="post-label">
            {selected === "lecturer" ? "Môn học đề xuất" : "Giảng viên đề xuất"}
          </label>
        </div>
        <div className="col-8">
          <input
            type="text"
            className="form-control"
            id="review4"
            name="reviews"
            value={review.reviews[4]}
            onChange={review5}
          />
        </div>
      </div>

      <div className="row mt-4">
        <div className="form-group">
          <label htmlFor="content" className="post-label">
            Nội dung
          </label>
          <textarea
            className="form-control"
            id="content"
            name="content"
            value={review.content}
            rows={10}
            onChange={handleChangeTextArea}
          ></textarea>
        </div>
      </div>

      <div className="tagRow" style={{ display: "flex", flexDirection: "row" }}>
        <p>Tag 1</p>
        <p>Tag 2</p>
      </div>

      <button
        className="btn btn-primary mt-3 px-5 d-block mx-auto"
        onClick={handleSubmit}
      >
        Đăng
      </button>
    </div>
  );
};

export default CreateReview;
