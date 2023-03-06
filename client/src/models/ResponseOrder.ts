import { IOrder } from "./IOrder"

export interface ResponseOrder {
	count: number
	rows: IOrder[]
}
