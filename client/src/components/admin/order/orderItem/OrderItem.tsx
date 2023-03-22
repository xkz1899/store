import { useState } from "react"
import { BsTrash } from "react-icons/bs"
import { destroyOrder } from "../../../../store/reducers/order/action"
import OrderDeviceItem from "../orderDevice/OrderDeviceItem"
import { useAppDispatch } from "./../../../../hooks/redux"
import { IOrder } from "./../../../../models/IOrder"
import Confirm from "./../../../UI/confirm/Confirm"
import VisibleButton from "./../../../UI/visibleButton/VisibleButton"
import st from "./OrderItem.module.scss"

interface IOrderItem {
	order: IOrder
}

const OrderItem = ({ order }: IOrderItem) => {
	const [visibleDevice, setVisibleDevice] = useState(false)
	const [visibleConfirm, setVisibleConfirm] = useState(false)

	const dispatch = useAppDispatch()

	const yes = () => {
		dispatch(destroyOrder(order.id))
		setVisibleConfirm(false)
	}

	const no = () => {
		setVisibleConfirm(false)
	}

	return (
		<div className={st.wrap}>
			<p>E-mail: {order.user.email}</p>
			<p>Логин: {order.user.login}</p>
			<p>Город: {order.city}</p>
			<p>Адрес: {order.street}</p>
			<p>Номер: {order.phone}</p>
			<p>Создание: {(order.createdAt + "").slice(0, 19).replace(/T/, " ")}</p>
			<VisibleButton visible={visibleDevice} setVisible={setVisibleDevice} text="Товары" />
			{visibleDevice && (
				<div className={st.device_list}>
					{order.order_devices.map((item, i) => (
						<OrderDeviceItem key={item.id} item={item} index={i} />
					))}
				</div>
			)}
			<div className={st.delete}>
				{visibleConfirm && <Confirm yes={yes} no={no} />}
				<button onClick={() => setVisibleConfirm(true)} className={st.trash}>
					<BsTrash />
				</button>
			</div>
		</div>
	)
}

export default OrderItem
