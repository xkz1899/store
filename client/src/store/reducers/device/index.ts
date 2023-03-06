import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { IDevice } from "./../../../models/IDevice"
import { DeviceState } from "./type"

const initialState: DeviceState = {
	devices: [],
	currentDevice: {} as IDevice,
	searchDevice: ``,
	currentPage: 1,
	limit: 9,
	devicesCount: 0,
	route: `about`,
	sort: `createdAt:DESC`,
	isLoading: false,
}

const deviceReducer = createSlice({
	name: "device",
	initialState,
	reducers: {
		setDevices(state, action: PayloadAction<IDevice[]>) {
			state.devices = action.payload
		},
		addDevice(state, action: PayloadAction<IDevice>) {
			state.devices.unshift(action.payload)
		},
		setSearchDevice(state, action: PayloadAction<string>) {
			state.searchDevice = action.payload
		},
		deleteDeviceById(state, action: PayloadAction<number>) {
			state.devices = [...state.devices].filter(f => f.id !== action.payload)
		},
		setDeviceImage(state, action: PayloadAction<string>) {
			state.currentDevice.img = action.payload
		},
		setCurrentPage(state, action: PayloadAction<number>) {
			state.currentPage = action.payload
		},
		setDeviceLoading(state, action: PayloadAction<boolean>) {
			state.isLoading = action.payload
		},
		setDevicesCount(state, action: PayloadAction<number>) {
			state.devicesCount = action.payload
		},
		setCurrentDevice(state, action: PayloadAction<IDevice>) {
			state.currentDevice = action.payload
		},
		setDeviceRoute(state, action: PayloadAction<string>) {
			state.route = action.payload
		},
		setDeviceLimit(state, action: PayloadAction<number>) {
			state.limit = action.payload
		},
		setDeviceRating(state, action: PayloadAction<number>) {
			state.currentDevice.rating = action.payload
		},
		setSort(state, action: PayloadAction<string>) {
			state.sort = action.payload
		},
		setDeviceRecommend(state) {
			state.currentDevice.recommended = !state.currentDevice.recommended
		},
	},
})

export default deviceReducer.reducer
export const {
	setDevices,
	setSearchDevice,
	addDevice,
	setDeviceImage,
	deleteDeviceById,
	setCurrentPage,
	setDeviceLoading,
	setDevicesCount,
	setCurrentDevice,
	setDeviceRoute,
	setDeviceRating,
	setSort,
	setDeviceRecommend,
} = deviceReducer.actions
