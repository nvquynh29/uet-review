import Cookies from 'universal-cookie'

const cookies = new Cookies()

const getCookie = (key: string) => {
  return cookies.get(key)
}

const getAccessToken = () => {
  return getCookie('accessToken')
}

export { getCookie, getAccessToken }
