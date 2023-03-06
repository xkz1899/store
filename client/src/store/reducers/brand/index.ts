import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { IBrand } from "./../../../models/IBrand"
import { BrandState } from "./type"

const initialState: BrandState = {
	brands: [],
	currentBrand: null,
	visible: false,
	isLoading: false,
}

const brandReducer = createSlice({
	name: `brand`,
	initialState,
	reducers: {
		setBrandLoading(state, action: PayloadAction<boolean>) {
			state.isLoading = action.payload
		},
		setBrands(state, action: PayloadAction<IBrand[]>) {
			state.brands = action.payload
		},
		addBrand(state, action: PayloadAction<IBrand>) {
			state.brands.unshift(action.payload)
		},
		editBrand(state, action: PayloadAction<IBrand>) {
			state.brands = [...state.brands].map(brand =>
				brand.id === action.payload.id ? action.payload : brand
			)
		},
		deleteBrandById(state, action: PayloadAction<number>) {
			state.brands = [...state.brands].filter(f => f.id !== action.payload)
		},
		setFilterVisible(state, action: PayloadAction<boolean>) {
			state.visible = action.payload
		},
		setCurrentBrand(state, action: PayloadAction<IBrand | null>) {
			state.currentBrand = action.payload
		},
	},
})

export default brandReducer.reducer
export const {
	setBrands,
	setFilterVisible,
	setBrandLoading,
	setCurrentBrand,
	addBrand,
	editBrand,
	deleteBrandById,
} = brandReducer.actions
