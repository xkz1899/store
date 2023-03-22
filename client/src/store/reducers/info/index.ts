import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { InfoState } from "./type"
import { IInfo } from "./../../../models/IInfo"

const initialState: InfoState = {
	isLoading: false,
	info: [],
}

const infoReducer = createSlice({
	name: `info`,
	initialState,
	reducers: {
		setInfoLoading(state, action: PayloadAction<boolean>) {
			state.isLoading = action.payload
		},
		setInfo(state, action: PayloadAction<IInfo[]>) {
			state.info = action.payload
		},
		deleteInfo(state, action: PayloadAction<number>) {
			state.info = [...state.info].filter(f => f.id !== action.payload)
		},
		addInfo(state, action: PayloadAction<IInfo>) {
			state.info.unshift(action.payload)
		},
	},
})

export default infoReducer.reducer
export const { setInfoLoading, setInfo, deleteInfo, addInfo } =
	infoReducer.actions
