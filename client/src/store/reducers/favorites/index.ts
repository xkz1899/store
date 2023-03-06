import { createSlice } from "@reduxjs/toolkit"
import { PayloadAction } from "@reduxjs/toolkit"
import { FavoritesState } from "./type"
import { IFavoritesDevice } from "./../../../models/IFavoritesDevice"

const initialState: FavoritesState = {
	devices: [],
	count: 0,
	isLoading: false,
}

const favoritesReducer = createSlice({
	name: `favorites`,
	initialState,
	reducers: {
		setFavoritesLoading(state, action: PayloadAction<boolean>) {
			state.isLoading = action.payload
		},
		setFavoritesDevices(state, action: PayloadAction<IFavoritesDevice[]>) {
			state.devices = action.payload
		},
		addFavoritesDevice(state, action: PayloadAction<IFavoritesDevice>) {
			state.devices.unshift(action.payload)
		},
		setFavoritesCount(state, action: PayloadAction<number>) {
			state.count = action.payload
		},
		decrementFavoritesCount(state) {
			state.count -= 1
		},
		incrementFavoritesCount(state) {
			state.count += 1
		},
		deleteFavoritesDeviceById(state, action: PayloadAction<number>) {
			state.devices = [...state.devices].filter(f => f.id !== action.payload)
		},
	},
})

export default favoritesReducer.reducer
export const {
	setFavoritesLoading,
	setFavoritesDevices,
	addFavoritesDevice,
	setFavoritesCount,
	decrementFavoritesCount,
	incrementFavoritesCount,
	deleteFavoritesDeviceById,
} = favoritesReducer.actions
