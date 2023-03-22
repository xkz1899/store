import { deleteOrder, setCurrentOrder, setOrder, setOrderCount, setOrderLoading } from "."
import { AppDispatch } from "../.."
import { $authHost } from "../../../http"
import { ResponseOrder } from "../../../models/ResponseOrder"

export const getOrders =
	(page: number, limit: number) => async (dispatch: AppDispatch) => {
		dispatch(setOrderLoading(true))
		try {
			const response = await $authHost.get<ResponseOrder>(
				`/order?page=${page}&limit=${limit}`
			)
			dispatch(setOrder(response.data.rows))
			dispatch(setOrderCount(response.data.count))
		} catch (err) {
			console.log(err)
		} finally {
			dispatch(setOrderLoading(true))
		}
	}

export const createOrder =
	(city: string, street: string, phone: string) =>
	async (dispatch: AppDispatch) => {
		try {
			const response = await $authHost.post(`/order`, {
				city,
				street,
				phone,
			})
			dispatch(setCurrentOrder(response.data.id))
		} catch (err) {
			console.log(err)
		}
	}

export const addOrderDevice =
	(orderId: number, deviceId: number) => async (dispatch: AppDispatch) => {
		try {
			await $authHost.post(`/order/device`, {
				orderId,
				deviceId,
			})
		} catch (err) {
			console.log(err)
		}
	}

	export const destroyOrder = (id: number) => async (dispatch: AppDispatch) => {
		try {
			await $authHost.delete(`/order/${id}`)
			dispatch(deleteOrder(id))
		}
		catch (err) {
			console.log(err)
		}
	}