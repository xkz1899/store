import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { DeviceState } from "./type"
import { ICategory } from "./../../../models/ICategory"

const initialState: DeviceState = {
	categories: [],
	currentCategory: {} as ICategory,
	isLoading: false,
	visible: false,
}

const categoryReducer = createSlice({
	name: "category",
	initialState,
	reducers: {
		setCategories(state, action: PayloadAction<ICategory[]>) {
			state.categories = action.payload
		},
		deleteCategory(state, action: PayloadAction<number>) {
			state.categories = [...state.categories].filter(
				f => f.id !== action.payload
			)
		},
		setCurrentCategory(state, action: PayloadAction<ICategory>) {
			state.currentCategory = action.payload
		},
		setCatalogLoading(state, action: PayloadAction<boolean>) {
			state.isLoading = action.payload
		},
		setVisibleCategory(state, action: PayloadAction<boolean>) {
			state.visible = action.payload
		},
	},
})

export default categoryReducer.reducer
export const {
	setCategories,
	deleteCategory,
	setCatalogLoading,
	setVisibleCategory,
	setCurrentCategory,
} = categoryReducer.actions
