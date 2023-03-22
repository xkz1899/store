import { setUserCount, setUserLoading, setUsers, updateSelectedUser } from "."
import { AppDispatch } from "../.."
import { $authHost } from "../../../http"
import { ResponseUser } from "./../../../models/ResponseUser"

export const getAllUsers =
	(page: number = 1, limit: number = 9) =>
	async (dispatch: AppDispatch) => {
		dispatch(setUserLoading(true))
		try {
			const response = await $authHost.get<ResponseUser>(
				`/user?page=${page}&limit=${limit}`
			)
			dispatch(setUsers(response.data.rows))
			dispatch(setUserCount(response.data.count))
		} catch (err) {
			console.log(err)
		} finally {
			dispatch(setUserLoading(false))
		}
	}

export const searchUsers =
	(search: string, page: number = 1, limit: number = 9) =>
	async (dispatch: AppDispatch) => {
		dispatch(setUserLoading(true))

		try {
			const response = await $authHost.get<ResponseUser>(
				`/user/search?search=${search}&page=${page}&limit=${limit}`
			)
			dispatch(setUsers(response.data.rows))
			dispatch(setUserCount(response.data.count))
		} catch (err) {
			console.log(err)
		} finally {
			dispatch(setUserLoading(false))
		}
	}

export const bannedUser =
	(id: number, ban: boolean, message: string | null) =>
	async (dispatch: AppDispatch) => {
		try {
			await $authHost.patch(`/user`, { id, ban, message })
			dispatch(getAllUsers())
			dispatch(updateSelectedUser({ ban, message }))
		} catch (err) {
			console.log(err)
		}
	}
