import { IUser } from "./../../../models/IUser"

export interface AuthState {
	isAuth: boolean
	isLoading: boolean
	errorMessage: string | null
	currentUser: IUser
}
