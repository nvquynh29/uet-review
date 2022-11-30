import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import Cookies from 'universal-cookie'

const cookies = new Cookies()

const getHeader = () => {
  let headers: object = { 'Content-Type': 'application/json' }
  if (cookies.get('accessToken')) {
    headers = { ...headers, 'X-ACCESS-TOKEN': cookies.get('accessToken') }
  }
  if (cookies.get('refreshToken')) {
    headers = { ...headers, 'X-REFRESH-TOKEN': cookies.get('refreshToken') }
  }
  return headers
}

const instance: AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: getHeader(),
})

const configAxios = () => {
  instance.defaults.headers = getHeader()
}

const refreshToken = () => {
  return instance.get('/refresh-token')
}

instance.interceptors.response.use(
  async (response: AxiosResponse) => {
    // TODO: Handle refresh token
    // const config: AxiosRequestConfig = response.config
    // if (config.url && (config.url?.indexOf('/login') >= 0 || config.url?.indexOf('/refresh-token') >= 0)) {
    //   return response
    // }
    // const status = response.status
    // if (status && status === 200) {
    //   if (response == 'jwt expired') {
    //     cookies.remove('accessToken')
    //     const { accessToken } = (await refreshToken()).data
    //     if (accessToken) {
    //       cookies.set('accessToken', accessToken, { path: '/' })
    //       return response
    //     }
    //   }
    // }
    return response
  },
  (err) => {
    return Promise.reject(err)
  }
)

export { configAxios }

export default instance
