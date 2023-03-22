import {
	deleteComment,
	setCommentLoading,
	setComments,
	setCommentsCount
} from "."
import { AppDispatch } from "../.."
import { $authHost, $host } from "../../../http"
import { IComment } from "./../../../models/IComment"
import { ResponseComment } from "./../../../models/ResponseComment"

export const getComments =
	(id: number, page: number) => async (dispatch: AppDispatch) => {
		setCommentLoading(true)
		try {
			const response = await $host.get<ResponseComment>(`/comment`, {
				params: { id, page },
			})
			dispatch(setCommentsCount(response.data.count))
			dispatch(setComments(response.data.rows))
		} catch (err) {
			console.log(err)
		} finally {
			setCommentLoading(false)
		}
	}

export const createComment =
	(message: string, deviceId: number, userId: number) =>
	async (dispatch: AppDispatch) => {
		try {
			await $authHost.post<IComment>(`/comment`, {
				message,
				deviceId,
				userId,
			})
			dispatch(getComments(deviceId, 1))
		} catch (err) {
			console.log(err)
		}
	}

export const removeComment = (id: number) => async (dispatch: AppDispatch) => {
	try {
		await $authHost.delete(`/comment/${id}`)
		dispatch(deleteComment(id))
	} catch (err) {
		console.log(err)
	}
}
