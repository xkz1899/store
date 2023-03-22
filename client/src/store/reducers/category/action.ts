import { setCategories, setCatalogLoading, deleteCategory } from "."
import { AppDispatch } from "../.."
import { $authHost, $host } from "../../../http"

export const getCategory = () => async (dispatch: AppDispatch) => {
	dispatch(setCatalogLoading(true))
	try {
		const response = await $host.get(`/category`)
		dispatch(setCategories(response.data))
	} catch (err) {
		console.log(err)
	} finally {
		dispatch(setCatalogLoading(false))
	}
}

export const deleteCategoryById =
	(id: number) => async (dispatch: AppDispatch) => {
		try {
			await $authHost.delete(`/category/${id}`)
			dispatch(deleteCategory(id))
		} catch (err) {
			console.log(err)
		}
	}

export const createCategory =
	(name: string) => async (dispatch: AppDispatch) => {
		try {
			await $authHost.post(`category`, { name })
			dispatch(getCategory())
		} catch (err) {
			console.log(err)
		}
	}

export const updateCategory =
	(id: number, name: string) => async (dispatch: AppDispatch) => {
		try {
			await $authHost.put(`category`, { id, name })
			dispatch(getCategory())
		} catch (err) {
			console.log(err)
		}
	}
