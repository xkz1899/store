import { addBrand, deleteBrandById, editBrand, setBrandLoading, setBrands } from "."
import { AppDispatch } from "../.."
import { $authHost, $host } from "../../../http"
import { IBrand } from "./../../../models/IBrand"

export const getBrands = (categoryId: number) => 
	async (dispatch: AppDispatch) => {
		dispatch(setBrandLoading(true))
		try {
			const response = await $host.get<IBrand[]>(`/brand?categoryId=${categoryId}`)
			dispatch(setBrands(response.data))
		} catch (err) {
			console.log(err)
		} finally {
			dispatch(setBrandLoading(false))
		}
	}

export const createBrand = (categoryId: number, name: string) => 
	async (dispatch:AppDispatch) => {
		try {
			const response = await $authHost.post(`/brand`, { categoryId, name })
			dispatch(addBrand(response.data))
		}
		catch (err) {
			console.log(err)
		}
	}

	export const deleteBrand = (id: number) => 
		async (dispatch: AppDispatch) => {
			try {
				await $authHost.delete(`/brand/${id}`)
				dispatch(deleteBrandById(id))
			}
			catch (err) {
				console.log(err)
			}
		}

	export const updateBrand = (id: number, name: string) => 
		async (dispatch: AppDispatch) => {
			try {
				const response = await $authHost.patch<IBrand>(`/brand`, {id, name})
				dispatch(editBrand(response.data))
			}
			catch (err) {
				console.log(err)
			}
	}