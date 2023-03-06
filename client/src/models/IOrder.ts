import { IOrderDevice } from "./IOrderDevice"

export interface IOrder {
	id: number
	city: string
	street: string
	phone: string
	createdAt: Date
	updatedAt: Date
	order_devices: IOrderDevice[]
  user: User
}

interface User {
  id: number
  email: string
  login: string
}