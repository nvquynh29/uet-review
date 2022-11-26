import { IReport } from '../utils/TypeScript'
import instance from './axios'

export const report = async (report: IReport) => {
  const { data } = await instance.post('/reports', report)
  return data
}

export const getListReport = async (page: string | number | null = 1, size: number = 10) => {
  page = page ? page : 1
  const { data } = await instance.get(`reports?page=${page}&size=${size}`)
  return data
}
