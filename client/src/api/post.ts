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


const fetchPosts = async (page?: string, size?: string, search?: string, type?: string) => {
  const query = new URLSearchParams()
  if (page && page.trim().length > 0) {
    query.append('page', page)
  }
  if (size && size.trim().length > 0) {
    query.append('size', size)
  }
  if (search && search.trim().length > 0) {
    query.append('search', search)
  }
  if (type && type.trim().length > 0) {
    query.append('type', type)
  }
  console.log(`/posts?${query.toString()}`)
  const { data } = await instance.get(`/posts?${query.toString()}`)
  return data
}

export { createPost, getPostBySlug, getListPost, fetchPosts }
