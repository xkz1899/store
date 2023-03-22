import { useEffect } from "react"
import { AiOutlineClose } from "react-icons/ai"
import { useNavigate } from "react-router-dom"
import { useAppSelector } from "../../hooks/redux"
import { RouteName } from "../../routes"
import { setVisibleCategory } from "../../store/reducers/category"
import { getCategory } from "../../store/reducers/category/action"
import { useAppDispatch } from "./../../hooks/redux"
import Loader from "./../loader/Loader"
import st from "./Category.module.scss"
import CategoryItem from "./CategoryIItem"

const Category = () => {
	const { categories, visible, isLoading } = useAppSelector(
		state => state.categoryReducer
	)
	const dispatch = useAppDispatch()
	const router = useNavigate()

	useEffect(() => {
		dispatch(getCategory())
	}, [])

	const goMain = () => {
		router(RouteName.MAIN)
		dispatch(setVisibleCategory(false))
	}

	return (
		<div
			className={`${st.wrapper} ${visible ? st.wrapper__active : ""}`}
			onClick={() => dispatch(setVisibleCategory(false))}
		>
			<div className={st.wrap} onClick={e => e.stopPropagation()}>
				<div className={st.header}>
					<button onClick={goMain} className={st.logo} title="Главная">
						Orange Shop
					</button>
					<button
						className={st.close}
						onClick={() => dispatch(setVisibleCategory(false))}
					>
						<AiOutlineClose />
					</button>
				</div>
				<h1 className={st.title}>Каталог</h1>
				{isLoading ? (
					<Loader />
				) : (
					<div className={st.container}>
						{categories.map(category => (
							<CategoryItem key={category.id} category={category} />
						))}
					</div>
				)}
			</div>
		</div>
	)
}

export default Category
