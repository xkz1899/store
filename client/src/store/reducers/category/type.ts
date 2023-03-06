import { ICategory } from "./../../../models/ICategory"

export interface DeviceState {
	categories: ICategory[]
	currentCategory: ICategory
	isLoading: boolean
	visible: boolean
}
