import React, { useState } from "react";
import { createPost } from "../api/post";
import { InputChange } from "../utils/TypeScript";

export const lecturers = [
  {
    id: "636125870f506d29b2baf95b",
    name: "Nguyễn Văn A",
  },
  {
    id: "636bc393891242fb6d0957a1",
    name: "Nguyễn Văn B",
  },
];

export const subjects = [
  {
    id: "636bc404891242fb6d09585c",
    name: "Giải tích 1",
  },
  {
    id: "636bc491891242fb6d0959ab",
    name: "Giải tích 2",
  },
];

const lecturerReviews = [
  "Mức độ nghiêm khắc",
  "Phương pháp giảng dạy",
  "Hình thức đánh giá sinh viên",
  "Tương tác với sinh viên",
  "Môn học đề xuất",
];

const subjectReviews = [
  "Đánh giá khác môn học",
  "Cách thức tính điểm",
  "Hình thức thi giữa kỳ",
  "Hình thức thi cuối kỳ",
  "Giảng viên đề xuất",
];

const CreateReview = () => {
  const initState = {
    user: "636183710f506d29b2baf95b",
    title: "",
    content: "",
    reviews: [
      { name: "", content: "" },
      { name: "", content: "" },
      { name: "", content: "" },
      { name: "", content: "" },
      { name: "", content: "" },
    ],
    subject: "",
    lecturer: "",
    createdAt: new Date().toISOString(),
  };

  const [post, setPost] = useState(initState);
  const [selected, setSelected] = useState("lecturer");

  const isSelected = (value: string): boolean => selected === value;

  const handleChangeRadio = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedReview = e.currentTarget.value;
    setSelected(selectedReview);

    setPost((prev) => {
      prev.reviews.map((element, idx) =>
        selectedReview === "lecturer"
          ? (element.name = lecturerReviews[idx])
          : (element.name = subjectReviews[idx])
      );
      return prev;
    });
  };

  const handleChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value, name } = e.target;
    setPost({ ...post, [name]: value });
  };

  const review1 = (e: InputChange) => {
    const { value, name } = e.target;
    const newReviews = post.reviews;
    newReviews[0].content = value;
    newReviews[0].name = name;
    setPost({ ...post, ...{ reviews: newReviews } });
  };

  const review2 = (e: InputChange) => {
    const { value, name } = e.target;
    const newReviews = post.reviews;
    newReviews[1].content = value;
    newReviews[1].name = name;
    setPost({ ...post, ...{ reviews: newReviews } });
  };

  const review3 = (e: InputChange) => {
    const { value, name } = e.target;
    const newReviews = post.reviews;
    newReviews[2].content = value;
    newReviews[2].name = name;
    setPost({ ...post, ...{ reviews: newReviews } });
  };

  const review4 = (e: InputChange) => {
    const { value, name } = e.target;
    const newReviews = post.reviews;
    newReviews[3].content = value;
    newReviews[3].name = name;
    setPost({ ...post, ...{ reviews: newReviews } });
  };

  const review5 = (e: InputChange) => {
    const { value, name } = e.target;
    const newReviews = post.reviews;
    newReviews[4].content = value;
    newReviews[4].name = name;
    setPost({ ...post, ...{ reviews: newReviews } });
  };

  const handleChangeTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value, name } = e.target;
    setPost({ ...post, [name]: value });
  };

  const handleChangeInput = (e: InputChange) => {
    const { value, name } = e.target;
    setPost({ ...post, [name]: value });
  };

  const handleSubmit = async () => {
    const data = { ...post };
    if (selected === "lecturer") {
      data.subject = "";
    } else {
      data.lecturer = "";
    }
    console.log(data);
    onCreatePost(data);
  };

  const onCreatePost = async (post: object) => {
    try {
      const { data } = await createPost(post);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
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
          value={post.title}
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
                value={post.lecturer}
                name="lecturer"
                onChange={handleChangeSelect}
              >
                <option>Chọn giảng viên</option>
                {lecturers.map((lecturer) => (
                  <option key={lecturer.id} value={lecturer.id}>
                    {lecturer.name}
                  </option>
                ))}
              </select>
            ) : (
              <select
                className="form-control text-capitalize"
                value={post.subject}
                name="subject"
                onChange={handleChangeSelect}
              >
                <option>Chọn môn học</option>
                {subjects.map((subject) => (
                  <option key={subject.id} value={subject.id}>
                    {subject.name}
                  </option>
                ))}
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
              : "Đánh giá khác môn học"}
          </label>
        </div>
        <div className="col-8">
          <input
            type="text"
            className="form-control"
            id="review0"
            name={
              selected === "lecturer"
                ? "Mức độ nghiêm khắc"
                : "Đánh giá khác môn học"
            }
            value={post.reviews[0].content}
            onChange={review1}
          />
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-4">
          <label htmlFor="reviews" className="post-label">
            {selected === "lecturer"
              ? "Phương pháp giảng dạy"
              : "Cách thức tính điểm"}
          </label>
        </div>
        <div className="col-8">
          <input
            type="text"
            className="form-control"
            id="review1"
            name={
              selected === "lecturer"
                ? "Phương pháp giảng dạy"
                : "Cách thức tính điểm"
            }
            value={post.reviews[1].content}
            onChange={review2}
          />
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-4">
          <label htmlFor="reviews" className="post-label">
            {selected === "lecturer"
              ? "Hình thức đánh giá sinh viên"
              : "Hình thức thi giữa kỳ"}
          </label>
        </div>
        <div className="col-8">
          <input
            type="text"
            className="form-control"
            id="review2"
            name={
              selected === "lecturer"
                ? "Hình thức đánh giá sinh viên"
                : "Hình thức thi giữa kỳ"
            }
            value={post.reviews[2].content}
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
            name={
              selected === "lecturer"
                ? "Tương tác với sinh viên"
                : "Hình thức thi cuối kỳ"
            }
            value={post.reviews[3].content}
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
            name={
              selected === "lecturer" ? "Môn học đề xuất" : "Giảng viên đề xuất"
            }
            value={post.reviews[4].content}
            onChange={review5}
          />
        </div>
      </div>

      <div className="row mt-4">
        <div className="form-group">
          <label htmlFor="content" className="post-label">
            Đánh giá khác
          </label>
          <textarea
            className="form-control"
            id="content"
            name="content"
            value={post.content}
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
