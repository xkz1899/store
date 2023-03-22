import { IDevice } from "./../../../models/IDevice"

export interface DeviceState {
	devices: IDevice[]
	currentDevice: IDevice
	searchDevice: string
	route: string
	currentPage: number
	limit: number
	devicesCount: number
	sort: string
	isLoading: boolean
}
