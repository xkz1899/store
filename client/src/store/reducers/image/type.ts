import { IImages } from "./../../../models/IImages"

export interface ImageState {
	images: IImages[]
	currentImage: IImages
	isLoading: boolean
}
