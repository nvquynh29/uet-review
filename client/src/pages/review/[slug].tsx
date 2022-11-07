import React, { useEffect, useCallback, useState } from "react";
import { useParams } from "react-router-dom";

import { IParams, IComment } from "../../utils/TypeScript";
import { Reaction } from "../../utils/enum";
import avatar from "../../images/avatar.png";
import CommentElement from "../../components/review/CommentElement";
import { getPostBySlug } from "../../api/post";
import { lecturers, subjects } from "../create_review";
import CommentForm from "../../components/review/CommentForm";

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

const DetailReview = () => {
  const slug = useParams<IParams>().slug;
  const [postData, setPostData] = useState<{
    post: Post;
    author: Author;
    comments: IComment[];
  }>();
  useEffect(() => {
    fetchPost();
  }, []);

  const fetchPost = useCallback(async () => {
    try {
      const { data } = await getPostBySlug(slug);
      console.log(data);
      setPostData(data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const selected = postData?.post.lecturer_id ? "lecturer" : "subject";

  // *handleReaction
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
            <span>{clientReaction === Reaction.Like ? 0 + 1 : 0}</span>
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
            <span>{clientReaction === Reaction.Dislike ? 0 + 1 : 0}</span>
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

      <CommentForm id={postData ? postData.post._id : ""} />
    </div>
  );
};

export default DetailReview;
