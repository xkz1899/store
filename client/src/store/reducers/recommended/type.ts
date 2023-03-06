import { IDevice } from "./../../../models/IDevice"

export interface RecommendedState {
	isLoading: boolean
	devices: IDevice[]
}
