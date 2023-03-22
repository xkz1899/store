import { IOrder } from "./../../../models/IOrder"

export interface OrderState {
	orders: IOrder[] | null
	currentOrder: number | null
	count: number
	limit: number
	currentPage: number
	isLoading: boolean
}
