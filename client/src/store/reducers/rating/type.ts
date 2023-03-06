import { IRating } from "./../../../models/IRating"

export interface RatingState {
	rating: IRating[]
	count: number
	isLoading: boolean
	error: string | null
}
