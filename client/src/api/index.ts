import axios, { AxiosInstance } from 'axios'

const instance: AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_V1_URL || 'http://localhost:5500/v1',
})

export default instance
