export interface IDevice {
	id: number
	name: string
	price: number
	rating: number
	description: string
	img: string
	categoryId: number
	brandId: number
	recommended: boolean
	createdAt: Date
	updateAt: Date
}
