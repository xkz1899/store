import { createSlice } from "@reduxjs/toolkit"
import { PayloadAction } from "@reduxjs/toolkit"
import { IDevice } from "./../../../models/IDevice"
import { RecommendedState } from "./type"

const initialState: RecommendedState = {
	isLoading: false,
	devices: [],
}

const recommendedReducer = createSlice({
	name: `recommended`,
	initialState,
	reducers: {
		setRecommendedLoading(state, action: PayloadAction<boolean>) {
			state.isLoading = action.payload
		},
		setRecommendedDevices(state, action: PayloadAction<IDevice[]>) {
			state.devices = action.payload
		},
	},
})

export default recommendedReducer.reducer
export const { setRecommendedDevices, setRecommendedLoading } =
	recommendedReducer.actions
