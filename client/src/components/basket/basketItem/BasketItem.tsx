import { BsTrash } from "react-icons/bs"
import { Link } from "react-router-dom"
import { RouteName } from "../../../routes"
import { deleteDeviceInBasket } from "../../../store/reducers/basket/action"
import { useAppDispatch } from "./../../../hooks/redux"
import { IBasketDevice } from "./../../../models/IBasketDevice"
import { priceFormat } from "./../../../utils/priceFormat"
import st from "./BasketItem.module.scss"

interface IBasketItem {
	item: IBasketDevice
}

const BasketItem = ({ item }: IBasketItem) => {
	const dispatch = useAppDispatch()

	const deleteDevice = () => {
		dispatch(deleteDeviceInBasket(item.id))
	}

	return (
		<div className={st.wrap} key={item.id}>
				<img
					className={st.image}
					src={process.env.REACT_APP_API_URL + "/" + item?.device?.img}
					alt=""
				/>
				<Link
					to={RouteName.DEVICE + "/" + item?.device?.id}
					className={st.name}
				>
					{item?.device?.name}
				</Link>
				<p className={st.price}>{priceFormat(item?.device?.price)} ₽</p>
				<button onClick={deleteDevice} className={st.trash}>
					<BsTrash />
					<span>Удалить</span>
				</button>
		</div>
	)
}

export default BasketItem
