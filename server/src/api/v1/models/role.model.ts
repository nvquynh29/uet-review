import mongoose, { Schema } from 'mongoose'

interface IRole {
  name: string
}

const roleSchema = new Schema<IRole>({
  name: { type: String, required: true, lowercase: true }
})

const Role = mongoose.model<IRole>('Role', roleSchema)
export default Role
