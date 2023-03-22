import { addImages, deleteImages } from "."
import { AppDispatch } from "../.."
import { $authHost } from "../../../http"
import { IImages } from "./../../../models/IImages"

export const createImage =
	(file: File, deviceId: number) => async (dispatch: AppDispatch) => {
		try {
			const formData = new FormData()
			formData.append(`img`, file)
			if (deviceId) {
				formData.append(`deviceId`, deviceId.toString())
			}
			const response = await $authHost.post<IImages>(`/device/img`, formData)
			dispatch(addImages(response.data))
		} catch (err) {
			console.log(err)
		}
	}

export const deleteImage = (id: number) => async (dispatch: AppDispatch) => {
	try {
		if (typeof id === "number") {
			await $authHost.delete(`device/img/${id}`)
			dispatch(deleteImages(id))
		}
	} catch (err) {
		console.log(err)
	}
}
