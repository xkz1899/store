import React from "react"
import { MdManageSearch } from "react-icons/md"
import { setVisibleCategory } from "../../../store/reducers/category"
import st from "./CatalogButton.module.scss"
import { useAppDispatch, useAppSelector } from "./../../../hooks/redux"

const CatalogButton = () => {
	const { visible } = useAppSelector(state => state.categoryReducer)
	const dispatch = useAppDispatch()

	return (
		<button
			onClick={() => dispatch(setVisibleCategory(!visible))}
			className={st.catalog}
		>
			<MdManageSearch />
			<span>Каталог</span>
		</button>
	)
}

export default CatalogButton
