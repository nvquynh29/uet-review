import { Types } from 'mongoose'
import Comment from '../models/comment.model'
import Post from '../models/post.model'
import Reaction, { IReaction } from '../models/reaction.model'
import { ReactionTypes } from '../types'

const reactPost = async (userId: string, slug: string, type: ReactionTypes) => {
  const reaction = await Reaction.findOne({ user_id: userId, slug })
  if (reaction) {
    if (reaction.type == type) {
      await reaction.delete()
    } else {
      reaction.type = type
      await reaction.save()
    }
  } else {
    const newReaction: IReaction = {
      user_id: new Types.ObjectId(userId),
      slug,
      type,
    }
    await Reaction.create(newReaction)
  }
  const { likes, dislikes } = await getPostReactionCount(slug)
  const reactionType = await getPostReactionType(userId, slug)
  
  // update reaction count
  await Post.findOneAndUpdate({ slug }, { likes, dislikes })
  return { likes, dislikes, reaction: reactionType }
}

const reactComment = async (userId: string, commentId: string, type: ReactionTypes) => {
  const reaction = await Reaction.findOne({ user_id: userId, comment_id: commentId })
  if (reaction) {
    if (reaction.type == type) {
      await reaction.delete()
    } else {
      reaction.type = type
      await reaction.save()
    }
  } else {
    const newReaction: IReaction = {
      user_id: new Types.ObjectId(userId),
      comment_id: new Types.ObjectId(commentId),
      type,
    }
    await Reaction.create(newReaction)
  }
  const { likes, dislikes } = await getCommentReactionCount(commentId)
  const reactionType = await getCommentReactionType(userId, commentId)
  await Comment.findOneAndUpdate({ _id: commentId }, { likes, dislikes })
  return { likes, dislikes, _id: commentId, reaction: reactionType }
}

const getPostReactionCount = async (slug: string) => {
  const reactionCount = await Reaction.find({ slug }).countDocuments()
  const likes = await Reaction.find({ slug, type: ReactionTypes.LIKE }).countDocuments()
  const dislikes = reactionCount - likes
  return { likes, dislikes }
}

const getCommentReactionCount = async (commentId: string) => {
  const reactionCount = await Reaction.find({ comment_id: commentId }).countDocuments()
  const likes = await Reaction.find({
    comment_id: commentId,
    type: ReactionTypes.LIKE,
  }).countDocuments()
  const dislikes = reactionCount - likes
  return { likes, dislikes }
}

const getPostReactionType = async (userId: string, slug: string) => {
  const reaction = await Reaction.findOne({ user_id: userId, slug })
  if (reaction) {
    return reaction.type
  }
  return ReactionTypes.NONE
}

const getCommentReactionType = async (userId: string, commentId: string) => {
  const reaction = await Reaction.findOne({ user_id: userId, comment_id: commentId })
  if (reaction) {
    return reaction.type
  }
  return ReactionTypes.NONE
}

export { reactPost, reactComment, getPostReactionType }
