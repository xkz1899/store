import { BsBookmark } from "react-icons/bs"
import { useNavigate, useParams } from "react-router-dom"
import { useAppSelector } from "../../../hooks/redux"
import { RouteName } from "../../../routes"
import { addDeviceInBasket } from "../../../store/reducers/basket/action"
import { addToFavoritesDevice } from "../../../store/reducers/favorites/action"
import Stars from "../stars/Stars"
import { useAppDispatch } from "./../../../hooks/redux"
import { priceFormat } from "./../../../utils/priceFormat"
import st from "./Controller.module.scss"

const Controller = () => {
	const { currentDevice } = useAppSelector(state => state.deviceReducer)
	const { isAuth } = useAppSelector(state => state.authReducer)
	const { id } = useParams()
	const router = useNavigate()

	const dispatch = useAppDispatch()

	const addToBasket = () => {
		isAuth ? dispatch(addDeviceInBasket(Number(id))) : router(RouteName.LOGIN)
	}

	return (
		<div className={st.wrap}>
			<h1 className={st.price}>{priceFormat(currentDevice.price)} ₽</h1>
			<button onClick={addToBasket} className={st.buy}>
				В корзину
			</button>
			<Stars />
			<button
				onClick={() => isAuth ? dispatch(addToFavoritesDevice(Number(id))) : router(RouteName.LOGIN)}
				className={st.favorites}>
				<BsBookmark />
				<span>В избранное</span>
			</button>
		</div>
	)
}

export default Controller
