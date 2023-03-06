import { setCurrentBrand } from "../../../store/reducers/brand"
import { setCurrentPage } from "../../../store/reducers/device"
import { useAppDispatch, useAppSelector } from "./../../../hooks/redux"
import { IBrand } from "./../../../models/IBrand"
import st from "./FilterItem.module.scss"

interface IFilterItem {
	brand: IBrand
}

const FilterItem = ({ brand }: IFilterItem) => {
	const dispatch = useAppDispatch()
	const { currentBrand } = useAppSelector(state => state.brandReducer)

	const select = () => {
		if (currentBrand?.id !== brand.id) {
			dispatch(setCurrentPage(1))
			dispatch(setCurrentBrand(brand))
		} else {
			dispatch(setCurrentPage(1))
			dispatch(setCurrentBrand(null))
		}
	}

	return (
		<button
			className={`${st.brand} ${brand.id === currentBrand?.id ? st.active : ""}`}
			key={brand.id}
			onClick={select}
		>
			{brand.name}
		</button>
	)
}

export default FilterItem
