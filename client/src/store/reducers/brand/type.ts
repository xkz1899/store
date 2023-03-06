import { IBrand } from "./../../../models/IBrand"

export interface BrandState {
	brands: IBrand[]
	currentBrand: IBrand | null
	isLoading: boolean
	visible: boolean
}
