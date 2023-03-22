import { BsTrash } from "react-icons/bs"
import { Link } from "react-router-dom"
import { RouteName } from "../../../routes"
import { useAppDispatch } from "./../../../hooks/redux"
import { IFavoritesDevice } from "./../../../models/IFavoritesDevice"
import { deleteFavoritesDevice } from "./../../../store/reducers/favorites/action"
import { priceFormat } from "./../../../utils/priceFormat"
import st from "./FavoritesItem.module.scss"

interface IFavoritesItem {
	item: IFavoritesDevice
}

const FavoritesItem = ({ item }: IFavoritesItem) => {
	const dispatch = useAppDispatch()

	const deleteDevice = () => {
		dispatch(deleteFavoritesDevice(item.id))
	}

	return (
		<div className={st.wrap}>
			<img
				className={st.image}
				src={process.env.REACT_APP_API_URL + "/" + item?.device?.img}
				alt=""
			/>
			<Link to={RouteName.DEVICE + "/" + item?.device?.id} className={st.name}>
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

export default FavoritesItem
