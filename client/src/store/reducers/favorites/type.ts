import { IFavoritesDevice } from "./../../../models/IFavoritesDevice"

export interface FavoritesState {
	devices: IFavoritesDevice[]
	count: number
	isLoading: boolean
}
