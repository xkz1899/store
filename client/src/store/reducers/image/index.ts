import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { ImageState } from "./type"
import { IImages } from "./../../../models/IImages"

const initialState: ImageState = {
	images: [],
	currentImage: {} as IImages,
	isLoading: false,
}

const imageReducer = createSlice({
	name: `image`,
	initialState,
	reducers: {
		setImageLoading(state, action: PayloadAction<boolean>) {
			state.isLoading = action.payload
		},
		setImages(state, action: PayloadAction<IImages[]>) {
			state.images = action.payload
		},
		addImages(state, action: PayloadAction<IImages>) {
			state.images.unshift(action.payload)
		},
		deleteImages(state, action: PayloadAction<number>) {
			state.images = [...state.images].filter(f => f.id !== action.payload)
		},
		setCurrentImage(state, action: PayloadAction<IImages>) {
			state.currentImage = action.payload
		},
	},
})

export default imageReducer.reducer
export const {
	setImageLoading,
	setImages,
	deleteImages,
	addImages,
	setCurrentImage,
} = imageReducer.actions
