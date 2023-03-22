import { useNavigate } from "react-router-dom"
import { RouteName } from "../../routes"
import {
	setCurrentCategory,
	setVisibleCategory,
} from "../../store/reducers/category"
import { setCurrentPage, setSearchDevice } from "../../store/reducers/device"
import { setCurrentBrand, setFilterVisible } from "../../store/reducers/brand"
import { useAppDispatch } from "./../../hooks/redux"
import { ICategory } from "./../../models/ICategory"
import st from "./CategoryItem.module.scss"
import { IBrand } from "./../../models/IBrand"

interface ICategoryItem {
	category: ICategory
}

const CategoryItem = ({ category }: ICategoryItem) => {
	const router = useNavigate()
	const dispatch = useAppDispatch()

	const selectionCategory = () => {
		dispatch(setCurrentBrand({} as IBrand))
		router(RouteName.CATEGORY + "/" + category.id)
		dispatch(setCurrentCategory(category))
		dispatch(setVisibleCategory(false))
		dispatch(setFilterVisible(false))
		dispatch(setCurrentPage(1))
		dispatch(setSearchDevice(``))
	}

	return (
		<button className={st.category} onClick={selectionCategory}>
			{category.name}
		</button>
	)
}

export default CategoryItem
