import React, { useState } from "react";
import { useHistory } from 'react-router-dom';
import { createPost } from "../api/post";
import { InputChange } from "../utils/TypeScript";

interface IReviews {
  name: string;
  content: string;
}

export const lecturers = [
  {
    id: "636125870f506d29b2baf95b",
    name: "Cô Hoàng Thị Điệp",
  },
  {
    id: "636bd02740ad3c2d5ec24745",
    name: "Thầy Trần Trọng Hiếu",
  },
  {
    id: "6375046e2484da41acb4e87c",
    name: "Thầy Lê Phê Đô",
  },
  {
    id: "6375047cabc7a65b070f6588",
    name: "Thầy Bùi Quang Hưng",
  },
  {
    id: "63750483aeb36e8767480940",
    name: "Cô Trần Thị Thu Trang",
  },
  {
    id: "6375048c9d86d6c585e117a2",
    name: "Cô Vũ Thị Hồng Nhạn",
  },
  {
    id: "6375049246e1eef3789f9caa",
    name: "Cô Nguyễn Thu Trang",
  },
];

export const subjects = [
  {
    id: "63750496becdfd83afc3114b",
    name: "Giải tích 1",
  },
  {
    id: "6375049a132a16dbae03b9ed",
    name: "Giải tích 2",
  },
  {
    id: "637504a02ac879e6ed14d180",
    name: "Vật lý đại cương 1",
  },
  {
    id: "637504a4e1d11cf2acabd8be",
    name: "Vật lý đại cương 2",
  },
  {
    id: "637504a92186c02f0915fd1f",
    name: "Tín hiệu và hệ thống",
  },
  {
    id: "637504ad8d1d06f832161190",
    name: "Cấu trúc dữ liệu và giải thuật",
  },
  {
    id: "637504b0ef839748b84b87fd",
    name: "Cơ sở dữ liệu",
  },
  {
    id: "637504b5b714c16723fee36b",
    name: "Triết học Mac-Lenin",
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
  "Nội dung môn học",
  "Cách thức tính điểm",
  "Hình thức thi giữa kỳ",
  "Hình thức thi cuối kỳ",
  "Giảng viên đề xuất",
];

const CreateReview = () => {
  const history = useHistory()
  const initState = {
    user: "636183710f506d29b2baf95b",
    title: "",
    content: "",
    reviews: [
      { name: "Mức độ nghiêm khắc", content: "" },
      { name: "Phương pháp giảng dạy", content: "" },
      { name: "Hình thức đánh giá sinh viên", content: "" },
      { name: "Tương tác với sinh viên", content: "" },
      { name: "Môn học đề xuất", content: "" },
    ],
    subject: "",
    lecturer: "",
    createdAt: new Date().toISOString(),
  };

  const [post, setPost] = useState(initState);
  const [selected, setSelected] = useState("lecturer");

  const isSelected = (value: string): boolean => selected === value;

  const validCreateReview = (title: string, content: string, reviews: IReviews[]) => {
    const err: string[] = []

    if (title.trim().length < 10) {
      err.push("Tiêu đề quá ngắn! Độ dài tối thiểu là 10 ký tự.")
    } else if (title.trim().length > 100) {
      err.push("Tiêu đề quá dài! Độ dài tối đa là 100 ký tự.")
    }

    for (let key in reviews) {
      let value = reviews[key]; 
      if (value.content.trim().length < 10) {
        err.push(value.name + " quá ngắn! Độ dài tối thiểu là 10 ký tự.")
      } else if (title.trim().length > 100) {
        err.push(value.name + " quá dài! Độ dài tối đa là 1000 ký tự.")
      }
    }

    if (content.trim().length < 10) {
      err.push("Đánh giá khác quá ngắn! Độ dài tối thiểu là 10 ký tự.")
    } else if (title.trim().length > 100) {
      err.push("Đánh giá khác quá dài! Độ dài tối đa là 1000 ký tự.")
    }

    return {
      errMsg: err,
      errLength: err.length
    }

  }

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
    const check = validCreateReview(data.title, data.content, data.reviews)
    if(check.errLength !== 0){
      let error = "";
      for (var i = 0; i < check.errLength; ++i) {
        error += check.errMsg[i] + "\n"
      }
      window.alert(error)
    } else {
      onCreatePost(data);
    }
  };

  const onCreatePost = async (post: object) => {
    try {
      const { data } = await createPost(post);
      history.push('/')
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="my-4 create_review">
      <div className="form-group position-relative">
        <label htmlFor="title" className="post-label">
          Tiêu đề
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
              : "Nội dung môn học"}
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
                : "Nội dung môn học"
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
