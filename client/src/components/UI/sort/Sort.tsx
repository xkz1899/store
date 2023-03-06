import React from "react"
import { setSort } from "../../../store/reducers/device"
import { useAppDispatch } from "./../../../hooks/redux"
import st from "./Sort.module.scss"

const Sort = () => {
	const dispatch = useAppDispatch()

	const data = [
		{ value: `createdAt:DESC`, name: `По дате (сначала новые)` },
		{ value: `createdAt:ASC`, name: `По дате (сначала старые)` },
		{ value: `price:DESC`, name: `По убыванию цены` },
		{ value: `price:ASC`, name: `По возрастанию цены` },
		{ value: `rating:DESC`, name: `По убыванию рейтинга` },
		{ value: `rating:ASC`, name: `По возрастанию рейтинга` },
		{ value: `name:ASC`, name: `По алфавиту A-Z` },
		{ value: `name:DESC`, name: `По алфавиту Z-A` },
	]

	const selected = (e: React.ChangeEvent<HTMLSelectElement>) => {
		dispatch(setSort(e.target.value))
	}

	return (
		<select className={st.sort} onChange={selected}>
			{data.map(sort => (
				<option key={sort.value} value={sort.value}>
					{sort.name}
				</option>
			))}
		</select>
	)
}

export default Sort
