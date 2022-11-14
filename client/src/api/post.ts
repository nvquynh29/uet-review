import instance from './axios'

const createPost = async (post: object) => {
  const { data } = await instance.post('/posts', post)
  return data
}

const getPostBySlug = async (slug: string) => {
  const { data } = await instance.get(`/posts/${slug}`)
  return data
}

const getListPost = async (search: string) => {
  let value = search ? search : `?page=${1}`
  const { data } = await instance.get(`/posts/${value}`)
  return data
}

export { createPost, getPostBySlug, getListPost }
