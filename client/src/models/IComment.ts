export interface IComment {
	id: number
	message: string
	createdAt: Date
	updatedAt: Date
	user: User
}

interface User {
	id: number
	email: string
	login: string
}