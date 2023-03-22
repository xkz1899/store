import { addSlide, deleteSlide, setSlider, setSliderCount, setSliderLoading } from "."
import { AppDispatch } from "../.."
import { $authHost, $host } from "../../../http"
import { ResponseSlider } from "./../../../models/ResponseSlider"
import { ISlide } from "./../../../models/ISlide"

export const getAllSlide = () => async (dispatch: AppDispatch) => {
	dispatch(setSliderLoading(true))
	try {
		const response = await $host<ResponseSlider>(`/slide`)
		dispatch(setSliderCount(response.data.count))
		dispatch(setSlider(response.data.rows))
	} catch (err) {
		console.log(err)
	} finally {
		dispatch(setSliderLoading(false))
	}
}

export const createSlide =
	(img: File, url: string) => async (dispatch: AppDispatch) => {
		dispatch(setSliderLoading(true))
		try {
			const formData = new FormData()
			formData.append("img", img)
			formData.append("url", url)
			const response = await $authHost.post<ISlide>(`/slide`, formData)
			dispatch(addSlide(response.data))
		} catch (err) {
			console.log(err)
		} finally {
			dispatch(setSliderLoading(false))
		}
	}

export const destroySlide = (id: number) => async (dispatch: AppDispatch) => {
	dispatch(setSliderLoading(true))
	try {
		await $authHost.delete(`/slide/${id}`)
		dispatch(deleteSlide(id))
	} catch (err) {
		console.log(err)
	} finally {
		dispatch(setSliderLoading(false))
	}
}
