import mongoose, { Schema, Types } from 'mongoose'
import { ReactionTypes } from '../types'

export interface IReaction {
  user_id: object
  slug?: string
  comment_id?: object
  type: ReactionTypes
}

const reactionSchema = new Schema<IReaction>({
  user_id: { type: Types.ObjectId, required: true },
  slug: { type: String, required: false },
  comment_id: { type: Types.ObjectId, required: false },
  type: { type: Number, required: true },
})

const Reaction = mongoose.model<IReaction>('Reaction', reactionSchema)
export default Reaction
