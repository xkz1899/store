import { ISlide } from "./../../../models/ISlide"

export interface SliderState {
	isLoading: boolean
	slider: ISlide[] | null
	count: number
}
