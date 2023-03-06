import {
	addFavoritesDevice,
	decrementFavoritesCount,
	deleteFavoritesDeviceById,
	incrementFavoritesCount,
	setFavoritesCount,
	setFavoritesDevices,
	setFavoritesLoading
} from "."
import { AppDispatch } from "../.."
import { $authHost } from "../../../http"
import { IFavoritesDevice } from "./../../../models/IFavoritesDevice"
import { ResponseFavorites } from "./../../../models/ResponseFavorites"

export const addToFavoritesDevice =
	(deviceId: number) => async (dispatch: AppDispatch) => {
		try {
			const response = await $authHost.post<IFavoritesDevice>(`/favorites`, {
				deviceId,
			})
			dispatch(addFavoritesDevice(response.data))
			dispatch(incrementFavoritesCount())
		} catch (err) {
			console.log(err)
		}
	}

export const getAllFavorites = () => async (dispatch: AppDispatch) => {
	dispatch(setFavoritesLoading(true))
	try {
		const response = await $authHost.get<ResponseFavorites>(`/favorites`)
		dispatch(setFavoritesDevices(response.data.rows))
		dispatch(setFavoritesCount(response.data.count))
	} catch (err) {
		console.log(err)
	} finally {
		dispatch(setFavoritesLoading(false))
	}
}

export const deleteFavoritesDevice =
	(id: number) => async (dispatch: AppDispatch) => {
		try {
			await $authHost.delete(`/favorites/${id}`)
			dispatch(deleteFavoritesDeviceById(id))
			dispatch(decrementFavoritesCount())
		} catch (err) {
			console.log(err)
		}
	}
