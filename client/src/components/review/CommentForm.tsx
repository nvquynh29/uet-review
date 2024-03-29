import { useState, useEffect } from "react";
import avatar from "../../images/avatar.png";
import { FormSubmit, IComment, InputChange } from "../../utils/TypeScript";
import { createComment } from "../../api/comment";
import { io, Socket } from 'socket.io-client';
import { isLoggedIn } from '../../utils/cookies';
import toast from 'react-hot-toast';

interface IProps {
  slug?: string;
  id: string;
  updateComments: (comment: IComment) => void
}

const socket: Socket = io(process.env.REACT_APP_SOCKET_URL as string)

function CommentForm(props: IProps) {
  const [content, setContent] = useState("");
  const loggedIn = isLoggedIn()

  useEffect(() => {
    socket.on('new-post-comment', (data) => {
      props.updateComments(data as IComment)
    })

    // return () => {
    //   socket.disconnect()
    // }
  }, [])

  const handleSubmit = async (e: FormSubmit) => {
    e.preventDefault();
    if (!loggedIn) {
      toast.remove();
      toast.error('Vui lòng đăng nhập để sử dụng chức năng này')
      return
    }
    try {
      const comment: IComment = {
        post_id: props.id,
        content: content,
        likes: 0,
        dislikes: 0,
        created_at: Date.now().toLocaleString(),
        updated_at: Date.now().toLocaleString(),
      }
      props.updateComments(comment)
      socket.emit('comment-post', comment)
      const { data } = await createComment(props?.id, { content: content });
      setContent('')
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
            value={content}
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
