import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { FilterState } from "./type"

const initialState: FilterState = {
	minPrice: 0,
	maxPrice: 0,
}

const filterReducer = createSlice({
	name: `filter`,
	initialState,
	reducers: {
		setMinPrice(state, action: PayloadAction<number>) {
			state.minPrice = action.payload
		},
		setMaxPrice(state, action: PayloadAction<number>) {
			state.maxPrice = action.payload
		},
	},
})

export default filterReducer.reducer
export const { setMinPrice, setMaxPrice } = filterReducer.actions
