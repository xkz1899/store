import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { RouteName } from "../../routes"
import { clearBasket } from "../../store/reducers/basket/action"
import { setCurrentOrder } from "../../store/reducers/order"
import { createOrder } from "../../store/reducers/order/action"
import { useAppDispatch, useAppSelector } from "./../../hooks/redux"
import { addOrderDevice } from "./../../store/reducers/order/action"
import Input from "./../UI/input/Input"
import OrangeButton from "./../UI/orangeButton/OrangeButton"
import st from "./Prepare.module.scss"

const Prepare = () => {
	const { devices } = useAppSelector(state => state.basketReducer)
	const { currentOrder } = useAppSelector(state => state.orderReducer)

	const router = useNavigate()

	const [city, setCity] = useState(``)
	const [street, setStreet] = useState(``)
	const [phone, setPhone] = useState(``)

	const dispatch = useAppDispatch()

	const send = () => {
		if (city.length > 3 && street.length > 5 && phone.length > 7) {
			dispatch(createOrder(city, street, phone))
		}
	}

	useEffect(() => {
		if (currentOrder) {
			devices.forEach(device => {
				dispatch(addOrderDevice(currentOrder, device.device.id))
			})
			dispatch(clearBasket())
			setCity(``)
			setStreet(``)
			setPhone(``)
			router(RouteName.MAIN)
			dispatch(setCurrentOrder(null))
		}
	}, [currentOrder])

	return (
		<div className={st.wrap}>
		  <Input value={city} setValue={setCity} placeholder="Город..." />
		  <Input value={street} setValue={setStreet} placeholder="Адрес..." />
		  <Input type="tel" value={phone} setValue={setPhone} placeholder="Телефон..." />
		  <OrangeButton click={send}>Оформить</OrangeButton>
		</div>
	)
}

export default Prepare
