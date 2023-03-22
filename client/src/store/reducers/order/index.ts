import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { OrderState } from "./type"
import { IOrder } from "./../../../models/IOrder"

const initialState: OrderState = {
	orders: null,
	currentOrder: null,
	isLoading: false,
	count: 0,
	currentPage: 1,
	limit: 9,
}

const orderReducer = createSlice({
	name: `order`,
	initialState,
	reducers: {
		setOrder(state, action: PayloadAction<IOrder[] | null>) {
			state.orders = action.payload
		},
		deleteOrder(state, action: PayloadAction<number>) {
			if (state.orders) {
				state.orders = [...state.orders].filter(f => f.id !== action.payload)
			}
		},
		setOrderLoading(state, action: PayloadAction<boolean>) {
			state.isLoading = action.payload
		},
		setOrderCurrentPage(state, action: PayloadAction<number>) {
			state.currentPage = action.payload
		},
		setOrderCount(state, action: PayloadAction<number>) {
			state.count = action.payload
		},
		setCurrentOrder(state, action: PayloadAction<number | null>) {
			state.currentOrder = action.payload
		},
	},
})

export default orderReducer.reducer
export const {
	setOrder,
	deleteOrder,
	setOrderCount,
	setOrderCurrentPage,
	setOrderLoading,
	setCurrentOrder,
} = orderReducer.actions
