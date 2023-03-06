import { IFavoritesDevice } from "./IFavoritesDevice"

export interface ResponseFavorites {
	count: number
	rows: IFavoritesDevice[]
}
