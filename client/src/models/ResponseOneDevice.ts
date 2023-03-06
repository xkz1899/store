import { IImages } from "./IImages";
import { IInfo } from './IInfo';

export interface ResponseOneDevice {
	id: number
	name: string
	description: string
	price: number
	rating: number
	img: string
	createAt: Date
	updateAy: Date
	categoryId: number
	imgs: IImages[]
	device_infos: IInfo[]
}
