import { useEffect } from "react"
import { AiOutlineClose } from "react-icons/ai"
import { useParams } from "react-router-dom"
import { useAppSelector } from "../../../hooks/redux"
import { setCurrentBrand, setFilterVisible } from "../../../store/reducers/brand"
import FilterItem from "../filterItem/FilterItem"
import { useAppDispatch } from "./../../../hooks/redux"
import { getBrands } from "./../../../store/reducers/brand/action"
import { getPrice } from "./../../../store/reducers/filter/action"
import Loader from "./../../loader/Loader"
import PriceFilter from "./../priceFilter/PriceFilter"
import st from "./Filter.module.scss"

const FilterShop = () => {
	const { brands, isLoading, visible } = useAppSelector(state => state.brandReducer)
	const { searchDevice } = useAppSelector(state => state.deviceReducer)

	const { currentCategory } = useAppSelector(state => state.categoryReducer)
	const { id } = useParams()
	const dispatch = useAppDispatch()

	useEffect(() => {
		if (id !== undefined) {
			dispatch(getBrands(Number(id)))
		}
	}, [currentCategory, id])

	const close = () => {
		dispatch(setFilterVisible(false))
	}

	const clear = () => {
		dispatch(setCurrentBrand(null))
		dispatch(getPrice(Number(id), searchDevice))
	}

	return (
		<div
			onClick={() => dispatch(setFilterVisible(false))}
			className={`${st.background} ${visible ? st.active : ""}`}
		>
			<div onClick={e => e.stopPropagation()} className={st.wrap}>
				<div className={st.header}>
					<button onClick={close} className={st.close}>
						<AiOutlineClose />
					</button>
					<h1 className={st.title}>Фильтры</h1>
					<button onClick={clear} className={st.clear}>
						Очистить
					</button>
				</div>
				<PriceFilter />
				<h3 className={st.brand_title}>Бренды</h3>
				<div className={st.filter}>
					{!isLoading ? (
						brands.map(brand => <FilterItem key={brand.id} brand={brand} />)
					) : (
						<Loader />
					)}
				</div>
			</div>
		</div>
	)
}

export default FilterShop
