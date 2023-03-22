import { setFilterVisible } from "../../../store/reducers/brand"
import { useAppDispatch } from "./../../../hooks/redux"
import Sort from "./../../UI/sort/Sort"
import st from "./OutputOptions.module.scss"

const OutputOptions = () => {
	const dispatch = useAppDispatch()

	const filterVisible = () => {
		dispatch(setFilterVisible(true))
	}

	return (
		<div>
			<button onClick={filterVisible} className={st.filter}>
				Фильтры
			</button>
			<div className={st.sorting}>
				<p>Сортировка:</p>
				<Sort />
			</div>
		</div>
	)
}

export default OutputOptions
