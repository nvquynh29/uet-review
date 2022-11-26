import { IReport } from '../utils/TypeScript'
import instance from './axios'

export const report = async (report: IReport) => {
  const { data } = await instance.post('/reports', report)
  return data
}
