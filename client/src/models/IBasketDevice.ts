import { IDevice } from "./IDevice"

export interface IBasketDevice {
	id: number
	createdAt: Date
	updatedAt: Date
	device: IDevice
}
