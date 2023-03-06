import { IRole } from "./IRole"

export interface IUser {
	id: number
	email: string
	login: string
	roles: IRole[]
	ban: boolean
	ban_message: string | null
	createdAt?: Date
	updatedAt?: Date
}
