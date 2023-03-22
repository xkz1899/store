import { useEffect, useRef, useState } from "react"
import { AiOutlineSearch } from "react-icons/ai"
import { useNavigate } from "react-router-dom"
import { useDelay } from "../../../hooks/delay"
import { RouteName } from "../../../routes"
import { setCurrentPage, setSearchDevice } from "../../../store/reducers/device"
import { useAppDispatch, useAppSelector } from "./../../../hooks/redux"
import st from "./Search.module.scss"

interface ISearch {
	redirect: boolean
}

const Search = ({ redirect }: ISearch) => {
	const [searchValue, setSearchValue] = useState(``)
	const [visible, setVisible] = useState(false)
	const router = useNavigate()
	const { categories } = useAppSelector(state => state.categoryReducer)
	const dispatch = useAppDispatch()

	const value = useDelay(searchValue)

	const ref = useRef<HTMLInputElement>(null)

	useEffect(() => {
		dispatch(setSearchDevice(value))
		dispatch(setCurrentPage(1))
		redirect && value && router(RouteName.CATEGORY + "/" + categories[0]?.id)
	}, [value])

	const visibleClickHandler = () => {
		setVisible(true)
		setTimeout(() => ref.current?.focus(), 100)
	}

	return (
		<div className={`${st.search} ${visible ? st.active : ""}`}>
			<input
				placeholder="Поиск по товарам..."
				type="text"
				ref={ref}
				value={searchValue}
				onChange={e => setSearchValue(e.target.value)}
				onBlur={e => e.target.value === "" && setVisible(false)}
			/>
			<button onClick={visibleClickHandler}>
				<AiOutlineSearch />
			</button>
		</div>
	)
}

export default Search
