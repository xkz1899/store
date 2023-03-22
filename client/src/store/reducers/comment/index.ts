import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { IComment } from "../../../models/IComment"
import { CommentState } from "./type"

const initialState: CommentState = {
	comments: [],
	count: 0,
	currentPage: 1,
	limit: 5,
	isLoading: false,
}

const commentReducer = createSlice({
	name: `comment`,
	initialState,
	reducers: {
		setCommentLoading(state, action: PayloadAction<boolean>) {
			state.isLoading = action.payload
		},
		setComments(state, action: PayloadAction<IComment[]>) {
			state.comments = action.payload
		},
		deleteComment(state, action: PayloadAction<number>) {
			state.comments = [...state.comments].filter(f => f.id !== action.payload)
		},
		setCommentsCount(state, action: PayloadAction<number>) {
			state.count = action.payload
		},
		setCurrentCommentsPage(state, action: PayloadAction<number>) {
			state.currentPage = action.payload
		},
		setCommentLimit(state, action: PayloadAction<number>) {
			state.limit = action.payload
		},
	},
})

export default commentReducer.reducer
export const {
	setCommentLoading,
	setComments,
	deleteComment,
	setCommentsCount,
	setCurrentCommentsPage,
	setCommentLimit,
} = commentReducer.actions
