import instance from './axios'

export const getProfile = async () => {
    const { data } = await instance.get('/profile')
    return data
}