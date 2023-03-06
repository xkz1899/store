import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { BasketState } from "./type"
import { IBasketDevice } from "./../../../models/IBasketDevice"

const initialState: BasketState = {
	isLoading: false,
	devices: [],
	count: 0,
}

const basketReducer = createSlice({
	name: `basket`,
	initialState,
	reducers: {
		setBasketLoading(state, action: PayloadAction<boolean>) {
			state.isLoading = action.payload
		},
		setBasketDevices(state, action: PayloadAction<IBasketDevice[]>) {
			state.devices = action.payload
		},
		addBasketDevices(state, action: PayloadAction<IBasketDevice>) {
			state.devices.unshift(action.payload)
		},
		deleteBasketDevices(state, action: PayloadAction<number>) {
			state.devices = [...state.devices].filter(f => f.id !== action.payload)
		},
		setBasketCount(state, action: PayloadAction<number>) {
			state.count = action.payload
		},
		incrementBasketCount(state) {
			state.count += 1
		},
		decrementBasketCount(state) {
			state.count -= 1
		},
	},
})

export default basketReducer.reducer
export const {
	setBasketLoading,
	setBasketDevices,
	addBasketDevices,
	deleteBasketDevices,
	setBasketCount,
	incrementBasketCount,
	decrementBasketCount,
} = basketReducer.actions
