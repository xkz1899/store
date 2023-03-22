import { IUser } from "./../../../models/IUser"

export interface UserState {
	users: IUser[]
	selectedUser: IUser
	currentPage: number
	count: number
	isLoading: boolean
}
