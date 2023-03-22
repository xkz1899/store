import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { AuthState } from "./type"
import { IUser } from "./../../../models/IUser"

const initialState: AuthState = {
	isAuth: false,
	isLoading: false,
	errorMessage: null,
	currentUser: {} as IUser,
}

export const authReducer = createSlice({
	name: "auth",
	initialState,
	reducers: {
		setAuth(state, action: PayloadAction<boolean>) {
			state.isAuth = action.payload
		},
		setAuthLoading(state, action: PayloadAction<boolean>) {
			state.isLoading = action.payload
		},
		setCurrentUser(state, action: PayloadAction<IUser>) {
			state.currentUser = action.payload
		},
		setErrorMessage(state, action: PayloadAction<string | null>) {
			state.errorMessage = action.payload
		},
	},
})

export default authReducer.reducer
export const { setAuth, setAuthLoading, setCurrentUser, setErrorMessage } =
	authReducer.actions
