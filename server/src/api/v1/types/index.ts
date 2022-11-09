export interface IPagination {
  page: number
  size: number
  total?: number
  total_page?: number
}

export enum ReactionTypes {
  NONE = -1,
  DISLIKE = 0,
  LIKE = 1,
}

// TODO: Remove dummy data
const userId = '6367d1362d289b4017d4f82a'
export { userId }
