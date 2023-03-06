import { IComment } from "./../../../models/IComment"

export interface CommentState {
	isLoading: boolean
	comments: IComment[]
  count: number
  currentPage: number
  limit: number
}
