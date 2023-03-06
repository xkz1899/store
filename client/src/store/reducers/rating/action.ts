import { incrementRatingCount, setCount, setRating, setRatingError } from "."
import { AppDispatch } from "../.."
import { $authHost, $host } from "../../../http"
import { setDeviceRating } from "../device"
import { ResponseRating } from "./../../../models/ResponseRating"

export const getRating =
	(deviceId: number) => async (dispatch: AppDispatch) => {
		try {
			const response = await $host.get<ResponseRating>(
				`/device/rating/${deviceId}`
			)
			dispatch(setRating(response.data.rows))
			dispatch(setCount(response.data.count))
		} catch (err) {
			console.log(err)
		}
	}

export const addRating =
	(deviceId: number, rating: number) => async (dispatch: AppDispatch) => {
		try {
			dispatch(setRatingError(null))
			const response = await $authHost.post(`/device/rating`, {
				deviceId,
				rating,
			})
			dispatch(setDeviceRating(response.data))
			dispatch(incrementRatingCount())
		} catch (err: any) {
			dispatch(setRatingError(err.response.data.message))
		}
	}
