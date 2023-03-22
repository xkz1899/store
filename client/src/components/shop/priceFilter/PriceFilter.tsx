import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useAppSelector } from "../../../hooks/redux"
import { setCurrentPage } from "../../../store/reducers/device"
import { setMaxPrice, setMinPrice } from "../../../store/reducers/filter"
import { useDelay } from "./../../../hooks/delay"
import { useAppDispatch } from "./../../../hooks/redux"
import { getPrice } from "./../../../store/reducers/filter/action"
import st from "./PriceFilter.module.scss"

const PriceFilter = () => {
	const { minPrice, maxPrice } = useAppSelector(state => state.filterReducer)
	const { searchDevice } = useAppSelector(state => state.deviceReducer)
	const { currentCategory } = useAppSelector(state => state.categoryReducer)
	const dispatch = useAppDispatch()

	const { id } = useParams()

	const [priceFrom, setPriceFrom] = useState(minPrice)
	const [priceTo, setPriceTo] = useState(maxPrice)

	const min = useDelay(priceFrom + ``)
	const max = useDelay(priceTo + ``)

	useEffect(() => {
		dispatch(getPrice(Number(id), searchDevice))
	}, [currentCategory, searchDevice])

	useEffect(() => {
		if (!isNaN(Number(min)) && !isNaN(Number(max))) {
			dispatch(setMinPrice(Number(min)))
			dispatch(setMaxPrice(Number(max)))
			dispatch(setCurrentPage(1))
		}
	}, [min, max])

	useEffect(() => {
		setPriceFrom(minPrice)
		setPriceTo(maxPrice)
	}, [maxPrice, minPrice])

	return (
		<div className={st.price}>
			<p className={st.title}>Цена, ₽</p>
			<div className={st.price_input}>
				<input
					type="number"
					value={priceFrom ?? 0}
					onChange={e => setPriceFrom(Number(e.target.value))}
					className={st.from}
				/>
				<span>-</span>
				<input
					type="number"
					value={priceTo ?? 0}
					onChange={e => setPriceTo(Number(e.target.value))}
				/>
			</div>
		</div>
	)
}

export default PriceFilter
