import { useState, useEffect, useCallback } from 'react'
import { io, Socket } from 'socket.io-client'
import { getListPost } from '../api/post'
import { Post, Author } from './review/[slug]'
import avatar from "../images/avatar.png";
import { Link, useHistory } from 'react-router-dom';
import Pagination from '../components/global/Pagination';
import { getAccessToken } from '../utils/cookies';

const socket: Socket = io(process.env.REACT_APP_SOCKET_URL as string, {
  auth: {
    token: getAccessToken()
  }
})

const Home = () => {
  const [posts, setPosts] = useState<[{ post: Post, author: Author }]>()
  const [total, setTotal] = useState(0)

  const history = useHistory()
  const { search } = history.location;

  useEffect(() => {
    fetchListPost(search)
  }, [search])

  useEffect(() => {
    socket.on('post-liked', (data) => {
      console.log(data)
    })

    // return () => {
    //   socket.disconnect()
    // }
  }, [socket])
  
  const fetchListPost = useCallback(
    async (search) => {
      try {
        const res = await getListPost(search)
        setPosts(res.data)
        setTotal(res.meta.total_page)
      } catch (error) {
        console.log(error)
      }
    },
    [],
  )

  return (
    <>
      <div className="list-post mt-4">
        {posts?.map(item => (
          <div key={item.post._id} className="card mb-3" style={{ minWidth: "260px" }}>
            <div className="row g-0 p-2">
              <div className="col-md">
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-8">
                      <h5 className="card-title">
                        <Link to={`/review/${item.post.slug}`}
                          className="text-capitalize text-decoration-none">
                          {item.post.title}
                        </Link>
                      </h5>
                    </div>
                    <div className="col-md-4 d-flex justify-content-end">
                      <small className="text-muted">
                        by {item.author.nickname}
                      </small>
                      <img src={avatar} alt="avatar" style={{
                        height: 40,
                        width: 40
                      }}></img>
                    </div>
                  </div>
                  <p className="card-text">{item.post.content}</p>

                  {
                    item.post.title &&
                    <div className="card-text d-flex justify-content-between
                    align-items-center"
                    >
                      {
                        <div className="reactionContainer">
                          <button
                            className="reactionButton"
                            id="likeButton"
                            style={{ fontSize: "1.05rem" }}
                          >
                            <i className="bi bi-hand-thumbs-up"></i>
                            <span>{item.post.likes}</span>
                          </button>
                          <button
                            className="reactionButton"
                            id="dislikeButton"
                            style={{ fontSize: "1.05rem" }}
                          >
                            <i className="bi bi-hand-thumbs-down"></i>
                            <span>{item.post.dislikes}</span>
                          </button>
                        </div>
                      }
                      <small className="text-muted">
                        {new Date(item.post.created_at).toLocaleString()}
                      </small>
                    </div>
                  }
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Pagination
        total={total}
      />

    </>
  )
}

export default Home
