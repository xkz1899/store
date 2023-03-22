import { useEffect } from "react"
import { AiOutlineShoppingCart } from "react-icons/ai"
import { useNavigate } from "react-router-dom"
import { useAppSelector } from "../../../hooks/redux"
import { RouteName } from "../../../routes"
import { useAppDispatch } from "./../../../hooks/redux"
import { getBasket } from "./../../../store/reducers/basket/action"
import st from "./Cart.module.scss"

const Cart = () => {
	const { isAuth } = useAppSelector(state => state.authReducer)
	const { count } = useAppSelector(state => state.basketReducer)
	const dispatch = useAppDispatch()

	const router = useNavigate()

	useEffect(() => {
		isAuth && dispatch(getBasket())
	}, [isAuth])

	return (
		<button onClick={() => router(RouteName.BASKET)} className={st.cart}>
			<AiOutlineShoppingCart />
			<span className={st.count}>
				{isAuth ? (count > 99 ? "99+" : count) : 0}
			</span>
			<span>Корзина</span>
		</button>
	)
}

export default Cart
