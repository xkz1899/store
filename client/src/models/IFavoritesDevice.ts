import { IDevice } from "./IDevice"

export interface IFavoritesDevice {
	id: number
	createdAt: Date
	updatedAt: Date
	device: IDevice
}
