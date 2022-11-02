import React, { useState, useEffect, useCallback } from 'react'
import { getListPost } from '../api/post'
import { Post, Author } from './review/[slug]'

const Home = () => {
  const [posts, setPosts] = useState<[{post: Post, author: Author}]>()

  useEffect(() => {
    fetchListPost()
  }, [])
  
  const fetchListPost = useCallback(
    async () => {
      try {
        const { data } = await getListPost()
        setPosts(data)
      } catch (error) {
        console.log(error)
      }
    },
    [],
  )
  
  return (
    <div>
      <h2 className="text-center">Home Page</h2>
      <div className="list-post mt-4">
        {posts?.map(item => (
        <div key={item.post._id} className="card">
          <div className="card-body">
            <a href={`/review/${item.post.slug}`}>{item.post.title}</a>
          </div>
        </div>
      ))}
      </div>
    </div>
  )
}

export default Home
