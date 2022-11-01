import mongoose, { Schema } from 'mongoose'

interface ILecturer {
  name: string
  email?: string
  introduction?: string
  department: string
}

const lecturerSchema = new Schema<ILecturer>({
  name: { type: String, required: true },
  email: { type: String },
  introduction: { type: String },
  department: { type: String, required: true },
})

const Lecturer = mongoose.model<ILecturer>('Lecturer', lecturerSchema)
export default Lecturer
