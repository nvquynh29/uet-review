import { useState } from "react";
import avatar from "../../images/avatar.png";
import { FormSubmit, InputChange } from "../../utils/TypeScript";
import { createComment } from "../../api/comment";

interface IProps {
  slug?: string;
  id: string;
}

function CommentForm(props: IProps) {
  const [content, setContent] = useState("");

  const handleSubmit = async (e: FormSubmit) => {
    e.preventDefault();
    try {
      const { data } = await createComment(props?.id, { content: content });
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="row mt-5 align-items-center justify-content-center commentContainer">
      <div className="col-2 d-flex justify-content-end">
        <img src={avatar} alt="avatar" className="commentAvt"></img>
      </div>
      <div className="col-9">
        <form onSubmit={handleSubmit}>
          <input
            className="commentInput"
            type="text"
            placeholder="Viết bình luận..."
            onChange={(e: InputChange) => {
              setContent(e.target.value);
            }}
          ></input>
          <button
            type="submit"
            style={{
              border: "none",
              backgroundColor: "transparent",
              backgroundRepeat: "no-repeat",
            }}
          >
            <i className="bi bi-send" style={{ fontSize: "25px" }}></i>
          </button>
        </form>
      </div>
    </div>
  );
}

export default CommentForm;
