import { ICredential } from '../utils/TypeScript'
import instance from './axios'

export const signup = async (credential: ICredential) => {
  const { data } = await instance.post('/signup', credential)
  return data
}
export const login = async (credential: ICredential) => {
  const { data } = await instance.post('/login', credential)
  return data
}

export const refreshToken = async () => {
  const { data } = await instance.get('/refresh-token')
  return data
}
