import React, { useEffect, useCallback, useState } from "react";
import { useParams } from 'react-router-dom'

import { IParams } from '../../utils/TypeScript'
import avatar from "../../images/avatar.png";
import Comment from "../../components/review/Comment";
import { getPostBySlug } from '../../api/post';
import { lecturers, subjects } from '../create_review';

export interface Author {
    nickname: string;
    email:    string;
}

export interface Post {
    _id:         string;
    author_id:   string;
    lecturer_id?: string;
    subject_id?: string;
    title:       string;
    slug:        string;
    content:     string;
    reviews:     Review[];
    tags:        any[];
    created_at:  string;
    updated_at:  string;
}

export interface Review {
    name:    string;
    content: string;
    _id:     string;
}


const DetailReview = () => {
  const slug = useParams<IParams>().slug
  const [postData, setPostData] = useState<{post: Post, author: Author}>()
  useEffect(() => {
    fetchPost()
  }, [])
  
  const fetchPost = useCallback(
    async () => {
      try {
        const { data } = await getPostBySlug(slug)
        console.log(data)
        setPostData(data)
      } catch (error) {
        console.log(error)
      }
    },
    [],
  )
  

  const selected = postData?.post.lecturer_id ? "lecturer" : "subject";

  return (
    <div className="my-4 detail_review">
      <div className="row mt-4 align-items-center postInfo">
        <div className="col-7">
          <h2>Review by {postData?.author.nickname}</h2>
        </div>
        <div className="col-2 d-flex justify-content-end align-self-center">
          <img src={avatar} alt="avatar" className="avatar"></img>
          <p className="date" style={{ margin: "auto" }}>
            {new Date().toLocaleDateString('vi')}
          </p>
        </div>
        <div className="col-3 reactionContainer">
          <button className="reactionButton" id="likeButton">
            <i className="bi bi-hand-thumbs-up"></i>
            <span>0</span>
          </button>
          <button className="reactionButton" id="dislikeButton">
            <i className="bi bi-hand-thumbs-down"></i>
            <span>0</span>
          </button>
        </div>
      </div>

      <div className="row mt-4 justify-content-center">
        <div className="col-md-2">
          <p className="post-label reviewObject">Đối tượng Review</p>
        </div>
        <div className="col-md-4">
          <p className="labelContent reviewObject">{ selected == 'lecturer' 
          ? lecturers.find(item => item.id === postData?.post?.lecturer_id)?.name 
          : subjects.find(item => item.id === postData?.post?.subject_id)?.name }</p>
        </div>
      </div>

      {postData?.post.reviews.map(item => (
        <div key={item._id} className="row mt-4">
        <div className="col-4">
          <p className="post-label">
            {item.name}
          </p>
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
              Nội dung
            </p>

            <p className="mainContent">
              {postData?.post.content}
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
