import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { UserState } from "./type"
import { IUser } from "./../../../models/IUser"
import { IBan } from "./../../../models/IBan"

const initialState: UserState = {
	users: [],
	selectedUser: {} as IUser,
	currentPage: 1,
	count: 0,
	isLoading: false,
}

const userReducer = createSlice({
	name: `user`,
	initialState,
	reducers: {
		setUsers(state, action: PayloadAction<IUser[]>) {
			state.users = action.payload
		},
		setUserCurrentPage(state, action: PayloadAction<number>) {
			state.currentPage = action.payload
		},
		setUserCount(state, action: PayloadAction<number>) {
			state.count = action.payload
		},
		deleteUser(state, action: PayloadAction<number>) {
			state.users = [...state.users].filter(f => f.id !== action.payload)
		},
		setUserLoading(state, action: PayloadAction<boolean>) {
			state.isLoading = action.payload
		},
		setSelectedUser(state, action: PayloadAction<IUser>) {
			state.selectedUser = action.payload
		},
		updateSelectedUser(state, action: PayloadAction<IBan>) {
			state.selectedUser.ban = action.payload.ban
			state.selectedUser.ban_message = action.payload.message
		},
	},
})

export default userReducer.reducer
export const {
	setUsers,
	setUserCount,
	setUserCurrentPage,
	deleteUser,
	setUserLoading,
	setSelectedUser,
	updateSelectedUser,
} = userReducer.actions
