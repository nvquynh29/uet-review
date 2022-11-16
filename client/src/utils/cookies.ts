import Cookies from 'universal-cookie'

const cookies = new Cookies()

const getCookie = (key: string) => {
  return cookies.get(key)
}

const getAccessToken = () => {
  return getCookie('accessToken')
}

// TODO: Using redux
const getUID = () => {
  return getCookie('_id')
}

const clearCookies = (key: string) => {
  cookies.remove(key)
}

export { getCookie, getAccessToken, clearCookies, getUID }
