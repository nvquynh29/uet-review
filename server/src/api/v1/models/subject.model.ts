import mongoose, { Schema } from 'mongoose'

interface ISubject {
  name: string
  code: string
  description: string
  department: string
}

const subjectSchema = new Schema<ISubject>({
  name: { type: String, required: true },
  code: { type: String, required: true},
  description: { type: String, required: true},
  department: { type: String, required: true},
})

const Subject = mongoose.model<ISubject>('Subject', subjectSchema)
export default Subject
