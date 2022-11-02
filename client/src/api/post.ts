import instance from './index'

const createPost = async (post: object) => {
  const { data } = await instance.post('/posts', post)
  return data
}

const getPostBySlug = async (slug: string) => {
  const { data } = await instance.get(`/posts/${slug}`)
  return data
}

const getListPost = async () => {
  const { data } = await instance.get('/posts')
  return data
}

export { createPost, getPostBySlug, getListPost }
