import { setAuth, setCurrentUser, setAuthLoading, setErrorMessage } from "."
import { AppDispatch } from "../.."
import { $authHost, $host } from "../../../http"
import { ResponseAuth } from "../../../models/ResponseAuth"
import { IUser } from "./../../../models/IUser"

export const registration =
	(email: string, password: string, login: string) =>
	async (dispatch: AppDispatch) => {
		setAuthLoading(true)
		try {
			const response = await $host.post<ResponseAuth>("/auth/registration", {
				email,
				password,
				login,
			})
			dispatch(setCurrentUser(response.data.user))
			localStorage.setItem("accessToken", response.data.accessToken)
			dispatch(setAuth(true))
			dispatch(setErrorMessage(null))
		} catch (err: any) {
			dispatch(setErrorMessage(err.response.data.message))
		} finally {
			setAuthLoading(false)
		}
	}

export const login =
	(email: string, password: string) => async (dispatch: AppDispatch) => {
		setAuthLoading(true)
		try {
			const response = await $host.post<ResponseAuth>("/auth/login", {
				email,
				password,
			})
			dispatch(setCurrentUser(response.data.user))
			localStorage.setItem("accessToken", response.data.accessToken)
			dispatch(setAuth(true))
			dispatch(setErrorMessage(null))
		} catch (err: any) {
			dispatch(setErrorMessage(err.response.data.message))
		} finally {
			setAuthLoading(false)
		}
	}

export const logout = () => async (dispatch: AppDispatch) => {
	try {
		await $host.get("/auth/logout")
		dispatch(setCurrentUser({} as IUser))
		localStorage.removeItem("accessToken")
		dispatch(setAuth(false))
	} catch (err: any) {
		dispatch(setErrorMessage(err.response.data.message))
	}
}

export const refresh = () => async (dispatch: AppDispatch) => {
	setAuthLoading(true)
	try {
		const response = await $authHost.post<ResponseAuth>("/auth/refresh")
		dispatch(setCurrentUser(response.data.user))
		localStorage.setItem("accessToken", response.data.accessToken)
		dispatch(setAuth(true))
	} catch (err) {
		console.log(err)
	} finally {
		setAuthLoading(false)
	}
}
