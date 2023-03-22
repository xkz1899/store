import { IBasketDevice } from "./../../../models/IBasketDevice"

export interface BasketState {
	isLoading: boolean
	devices: IBasketDevice[]
	count: number
}
