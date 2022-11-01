import mongoose, { Schema, Types } from 'mongoose'

interface IReaction {
  user_id: object
  post_id: object
  type: ReactionType
}

enum ReactionType {
  DISLIKE = 0,
  LIKE = 1,
}

const reactionSchema = new Schema<IReaction>({
  user_id: { type: Types.ObjectId, required: true },
  post_id: { type: Types.ObjectId, required: true },
  type: { type: Number, required: true },
})

const Reaction = mongoose.model<IReaction>('Reaction', reactionSchema)
export default Reaction
