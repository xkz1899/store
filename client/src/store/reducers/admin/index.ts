import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { AdminState } from "./type"

const initialState: AdminState = {
	route: ``,
	infoConfirmDelete: 0,
	categoryVisible: false,
	editDeviceVisible: false,
	createDeviceVisible: false,
}

const adminReducer = createSlice({
	name: `admin`,
	initialState,
	reducers: {
		setRoute(state, action: PayloadAction<string>) {
			state.route = action.payload
		},
		setInfoConfirmDelete(state, action: PayloadAction<number>) {
			state.infoConfirmDelete = action.payload
		},
		setEditDeviceVisible(state, action: PayloadAction<boolean>) {
			state.editDeviceVisible = action.payload
		},
		setCreateDeviceVisible(state, action: PayloadAction<boolean>) {
			state.createDeviceVisible = action.payload
		},
	},
})

export default adminReducer.reducer
export const {
	setRoute,
	setInfoConfirmDelete,
	setEditDeviceVisible,
	setCreateDeviceVisible,
} = adminReducer.actions
