import { BsBookmark } from "react-icons/bs"
import { useNavigate } from "react-router-dom"
import { useAppSelector } from "../../../hooks/redux"
import { RouteName } from "../../../routes"
import st from "./FavoritesButton.module.scss"

const FavoritesButton = () => {
	const { isAuth } = useAppSelector(state => state.authReducer)
	const router = useNavigate()

	return (
		<button
			onClick={() => router(isAuth ? RouteName.FAVORITES : RouteName.LOGIN)}
			className={st.favorites}
		>
			<BsBookmark />
			<span>Избранное</span>
		</button>
	)
}

export default FavoritesButton
