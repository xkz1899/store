import { useEffect } from "react"
import { useAppSelector } from "../../hooks/redux"
import { getAllFavorites } from "../../store/reducers/favorites/action"
import { useAppDispatch } from "./../../hooks/redux"
import FavoritesItem from "./favoritesItem/FavoritesItem"
import st from "./FavoritesList.module.scss"
import Loader from "./../loader/Loader"
const FavoritesList = () => {
	const { devices, count, isLoading } = useAppSelector(
		state => state.favoritesReducer
	)
	const dispatch = useAppDispatch()

	useEffect(() => {
		dispatch(getAllFavorites())
	}, [])

	return (
		<>
			<h1 className={st.title}>Избранное: {count} товаров</h1>
			<div className={st.wrapper}>
				{!isLoading ? (
					devices.length ? (
						devices.map(item => <FavoritesItem key={item.id} item={item} />)
					) : (
						<h2 className={st.empty}>Список избранного пуст</h2>
					)
				) : (
					<Loader />
				)}
			</div>
		</>
	)
}

export default FavoritesList
