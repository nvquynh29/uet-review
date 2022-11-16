import { ICredential } from '../utils/TypeScript'
import instance from './axios'

export const signup = async (credential: ICredential) => {
  const { data } = await instance.post('/auth/signup', credential)
  return data
}

export const login = async (credential: ICredential) => {
  const { data } = await instance.post('/auth/login', credential)
  return data
}

export const logout = async () => {
  return await instance.get('/auth/logout')
}

export const refreshToken = async () => {
  const { data } = await instance.get('/refresh-token')
  return data
}
