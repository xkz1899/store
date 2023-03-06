import React from "react"
import { useNavigate } from "react-router-dom"
import { RouteName } from "../../../../routes"
import st from "./OrderDeviceItem.module.scss"
import { IOrderDevice } from "../../../../models/IOrderDevice"

interface IOrderDeviceItem {
	item: IOrderDevice
	index: number
}

const OrderDeviceItem = ({ item, index }: IOrderDeviceItem) => {
	const router = useNavigate()

	return (
		<div className={st.device}>
			<p>{index + 1}.</p>
			<button
				className={st.btn}
				onClick={() => router(RouteName.DEVICE + "/" + item.device.id)}
			>
				{item.device.name}
			</button>
			<span>{item.device.price}₽</span>
		</div>
	)
}

export default OrderDeviceItem
