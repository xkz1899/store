import {
	addDevice,
	deleteDeviceById,
	setCurrentDevice,
	setDeviceImage,
	setDeviceLoading,
	setDevices,
	setDevicesCount,
} from "."
import { AppDispatch } from "../.."
import { $authHost, $host } from "../../../http"
import { IDevice } from "../../../models/IDevice"
import { IImages } from "../../../models/IImages"
import { setCurrentImage, setImages } from "../image"
import { setInfo } from "../info"
import { ResponseDevices } from "../../../models/ResponseDevices"
import { ResponseOneDevice } from "./../../../models/ResponseOneDevice"

export const getDeviceByCategory =
	(
		categoryId: number,
		brandId: number | null,
		page: number,
		limit: number = 9,
		sort: string,
		max: number = 2147483647,
		min: number = 0
	) =>
	async (dispatch: AppDispatch) => {
		dispatch(setDeviceLoading(true))
		try {
			const response = await $host.get<ResponseDevices>(`device`, {
				params: { categoryId, brandId, page, limit, sort, max, min },
			})
			dispatch(setDevices(response.data.rows))
			dispatch(setDevicesCount(response.data.count))
		} catch (err) {
			console.log(err)
		} finally {
			dispatch(setDeviceLoading(false))
		}
	}

export const searchDevices =
	(
		search: string,
		brandId: number | null,
		page: number,
		limit: number,
		sort: string,
		max: number = 2147483647,
		min: number = 0
	) =>
	async (dispatch: AppDispatch) => {
		dispatch(setDeviceLoading(true))
		try {
			const response = await $host.get<ResponseDevices>(`/device/search`, {
				params: { search, brandId, page, limit, sort, max, min },
			})
			dispatch(setDevices(response.data.rows))
			dispatch(setDevicesCount(response.data.count))
		} catch (err) {
			console.log(err)
		} finally {
			dispatch(setDeviceLoading(false))
		}
	}

export const getDeviceById = (id: number) => async (dispatch: AppDispatch) => {
	try {
		const response = await $host.get<ResponseOneDevice>(`/device/${id}`)
		if (response.data?.imgs) {
			dispatch(setImages(response.data.imgs))
			dispatch(setCurrentImage(response.data?.imgs[0]))
		}
		response.data?.device_infos && dispatch(setInfo(response.data.device_infos))
		if (response.data?.imgs && response.data?.device_infos) {
			let device = Object.assign(response.data)
			delete device.imgs
			delete device.device_infos
			dispatch(setCurrentDevice(device))
		}
	} catch (err) {
		console.log(err)
	}
}

export const editDevice =
	(
		id: number,
		name: string,
		description: string,
		price: number,
		categoryId: number,
		brandId: number
	) =>
	async (dispatch: AppDispatch) => {
		try {
			await $authHost.patch(`/device`, {
				id,
				name,
				description,
				price,
				categoryId,
				brandId,
			})
		} catch (err) {
			console.log(err)
		}
	}

export const updateDeviceImage =
	(file: File, id: number) => async (dispatch: AppDispatch) => {
		try {
			const formData = new FormData()
			formData.append(`img`, file)
			id && formData.append(`id`, id.toString())
			const response = await $authHost.patch<IDevice>(`/device/img`, formData)
			dispatch(setDeviceImage(response.data.img))
		} catch (err) {
			console.log(err)
		}
	}

export const createDevice =
	(
		name: string,
		description: string,
		price: number,
		categoryId: number,
		img: File,
		brandId: number
	) =>
	async (dispatch: AppDispatch) => {
		try {
			const formData = new FormData()
			formData.append(`img`, img)
			formData.append(`name`, name)
			formData.append(`description`, description)
			formData.append(`price`, price + ``)
			formData.append(`rating`, 5 + ``)
			formData.append(`categoryId`, categoryId + ``)
			formData.append(`brandId`, brandId + ``)
			const response = await $authHost.post<IDevice>(`/device`, formData)
			dispatch(setCurrentDevice(response.data))
			dispatch(addDevice(response.data))
		} catch (err) {
			console.log(err)
		}
	}

export const deleteDevice = (id: number) => async (dispatch: AppDispatch) => {
	try {
		await $authHost.delete(`/device/${id}`)
		dispatch(deleteDeviceById(id))
		dispatch(setCurrentDevice({} as IDevice))
		dispatch(setImages([]))
		dispatch(setInfo([]))
		dispatch(setCurrentImage({} as IImages))
	} catch (err) {
		console.log(err)
	}
}
