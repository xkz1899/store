import { IUser } from "./IUser"

export interface ResponseAuth {
	accessToken: string
	refreshToken: string
	basketId: number
	user: IUser
}
