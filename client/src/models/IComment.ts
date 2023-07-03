export interface IComment {
	id: number
	message: string
	createdAt: Date
	updatedAt: Date
	user: {
		id: number
		email: string
		login: string
	}
}
