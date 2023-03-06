import { addInfo, deleteInfo } from "."
import { AppDispatch } from "../.."
import { $authHost } from "../../../http"
import { IInfo } from "../../../models/IInfo"

export const deleteCharacteristic =
	(id: number) => async (dispatch: AppDispatch) => {
		await $authHost.delete(`/device/info/${id}`)
		dispatch(deleteInfo(id))
	}

export const createCharacteristic =
	(key: string, value: string, deviceId: number) =>
	async (dispatch: AppDispatch) => {
		try {
			const response = await $authHost.post<IInfo>(`/device/info`, {
				key,
				value,
				deviceId,
			})
			dispatch(addInfo(response.data))
		} catch (err) {
			console.log(err)
		}
	}
