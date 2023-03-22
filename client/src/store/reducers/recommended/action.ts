import { setRecommendedDevices, setRecommendedLoading } from "."
import { AppDispatch } from "../.."
import { $authHost, $host } from "../../../http"
import { IDevice } from "./../../../models/IDevice"

export const getAllRecommended = () => async (dispatch: AppDispatch) => {
	dispatch(setRecommendedLoading(true))
	try {
		const response = await $host.get<IDevice[]>(`/device/recommended`)
		dispatch(setRecommendedDevices(response.data))
	} catch (err) {
		console.log(err)
	} finally {
		dispatch(setRecommendedLoading(false))
	}
}

export const changeRecommendedDevice =
	(id: number, recommended: boolean) => async (dispatch: AppDispatch) => {
		dispatch(setRecommendedLoading(true))
		try {
			await $authHost.patch<IDevice>(`/device/recommended`, { id, recommended })
			dispatch(getAllRecommended())
		} catch (err) {
			console.log(err)
		} finally {
			dispatch(setRecommendedLoading(false))
		}
	}
