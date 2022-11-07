import axios, { AxiosInstance } from 'axios'

const instance: AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
})

export default instance
