import { useState, useEffect } from "react"
import { useAppSelector } from "../../hooks/redux"
import BasketItem from "./basketItem/BasketItem"
import Loader from "./../loader/Loader"
import st from "./BasketDevice.module.scss"
import { priceFormat } from "./../../utils/priceFormat"
import { Link, useNavigate } from "react-router-dom"
import { RouteName } from "../../routes"
import { useAppDispatch } from "./../../hooks/redux"
import { getBasket } from "./../../store/reducers/basket/action"

const BasketDevice = () => {
	const { devices, isLoading, count } = useAppSelector(
		state => state.basketReducer
	)
	const { isAuth } = useAppSelector(state => state.authReducer)
	const dispatch = useAppDispatch()
	const [sum, setSum] = useState(0)

	const router = useNavigate()

	useEffect(() => {
		let price = 0
		devices.forEach(i => (price += i.device.price))
		setSum(price)
	}, [count])

	useEffect(() => {
		isAuth && dispatch(getBasket())
	}, [])

	return isAuth ? (
		<div className={st.wrap}>
			<h1 className={st.title}>Корзина</h1>
			<div className={st.goods}>
				{!isLoading ? (
					devices.length ? (
						devices?.map(item => <BasketItem key={item.id} item={item} />)
					) : (
						<h2 className={st.empty}>Список покупок пуст</h2>
					)
				) : (
					<Loader />
				)}
				<hr className={st.line} />
				<div className={st.buy}>
					<h1 className={st.sum}>Всего: {priceFormat(sum)} ₽</h1>
					<button onClick={() => devices.length && router(RouteName.PREPARE)}>
						Оформить
					</button>
				</div>
			</div>
		</div>
	) : (
		<div className={st.no_auth}>
			<h1>Войдите или зарегистрируйтесь</h1>
			<div>
				<Link to={RouteName.LOGIN}>Войти</Link>
				<span>/</span>
				<Link to={RouteName.REGISTRATION}>Зарегистрироваться</Link>
			</div>
		</div>
	)
}

export default BasketDevice
