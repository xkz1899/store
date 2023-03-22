import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { ISlide } from "../../../models/ISlide"
import { SliderState } from "./type"

const initialState: SliderState = {
	isLoading: false,
	count: 0,
	slider: null,
}

const sliderReducer = createSlice({
	name: `slider`,
	initialState,
	reducers: {
		setSliderLoading(state, action: PayloadAction<boolean>) {
			state.isLoading = action.payload
		},
		setSliderCount(state, action: PayloadAction<number>) {
			state.count = action.payload
		},
		setSlider(state, action: PayloadAction<ISlide[] | null>) {
			state.slider = action.payload
		},
		addSlide(state, action: PayloadAction<ISlide>) {
			state.slider?.unshift(action.payload)
		},
		deleteSlide(state, action: PayloadAction<number>) {
			if (state.slider) {
				state.slider = [...state.slider].filter(f => f.id !== action.payload)
			}
		},
	},
})

export default sliderReducer.reducer
export const { setSlider, setSliderCount, setSliderLoading, addSlide, deleteSlide } =
	sliderReducer.actions
