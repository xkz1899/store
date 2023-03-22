import {
	addBasketDevices,
	decrementBasketCount,
	deleteBasketDevices,
	incrementBasketCount,
	setBasketCount,
	setBasketDevices,
	setBasketLoading,
} from "."
import { AppDispatch } from "../.."
import { $authHost } from "../../../http"
import { IBasketDevice } from "./../../../models/IBasketDevice"
import { ResponseBasket } from "./../../../models/ResponseBasket"

export const getBasket = () => async (dispatch: AppDispatch) => {
	dispatch(setBasketLoading(true))
	try {
		const response = await $authHost.get<ResponseBasket>(`/basket`)
		dispatch(setBasketDevices(response.data.rows))
		dispatch(setBasketCount(response.data.count))
	} catch (err) {
		console.log(err)
	} finally {
		dispatch(setBasketLoading(false))
	}
}

export const addDeviceInBasket =
	(deviceId: number) => async (dispatch: AppDispatch) => {
		try {
			const response = await $authHost.post<IBasketDevice>(`/basket`, {
				deviceId,
			})
			dispatch(addBasketDevices(response.data))
			dispatch(incrementBasketCount())
		} catch (err) {
			console.log(err)
		}
	}

export const deleteDeviceInBasket =
	(id: number) => async (dispatch: AppDispatch) => {
		try {
			await $authHost.delete(`/basket?id=${id}`)
			dispatch(deleteBasketDevices(id))
			dispatch(decrementBasketCount())
		} catch (err) {
			console.log(err)
		}
	}

export const clearBasket = () => async (dispatch: AppDispatch) => {
	try {
		await $authHost.delete(`/basket/clear`)
		dispatch(setBasketDevices([]))
		dispatch(setBasketCount(0))
	} catch (err) {
		console.log(err)
	}
}
