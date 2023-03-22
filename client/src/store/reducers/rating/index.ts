import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { IRating } from "./../../../models/IRating"
import { RatingState } from "./type"

const initialState: RatingState = {
	rating: [],
	count: 0,
	isLoading: false,
	error: null,
}

const ratingReducer = createSlice({
	name: `rating`,
	initialState,
	reducers: {
		setRatingLoading(state, action: PayloadAction<boolean>) {
			state.isLoading = action.payload
		},
		setRating(state, action: PayloadAction<IRating[]>) {
			state.rating = action.payload
		},
		setCount(state, action: PayloadAction<number>) {
			state.count = action.payload
		},
		setRatingError(state, action: PayloadAction<string | null>) {
			state.error = action.payload
		},
		incrementRatingCount(state) {
			state.count += 1
		},
	},
})

export default ratingReducer.reducer
export const {
	setRatingLoading,
	setRating,
	setCount,
	setRatingError,
	incrementRatingCount,
} = ratingReducer.actions
