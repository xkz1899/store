import { AiTwotoneStar } from "react-icons/ai"
import { BsBookmark } from "react-icons/bs"
import { Link, useNavigate } from "react-router-dom"
import { IDevice } from "../../../models/IDevice"
import { RouteName } from "../../../routes"
import { addDeviceInBasket } from "../../../store/reducers/basket/action"
import { priceFormat } from "../../../utils/priceFormat"
import { useAppDispatch, useAppSelector } from "./../../../hooks/redux"
import { addToFavoritesDevice } from "./../../../store/reducers/favorites/action"
import st from "./DeviceItem.module.scss"

interface IDeviceItem {
	device: IDevice
}

const DeviceShopItem = ({ device }: IDeviceItem) => {
	const dispatch = useAppDispatch()
	const { isAuth } = useAppSelector(state => state.authReducer)
	const router = useNavigate()

	const addToBasket = () => {
		isAuth ? dispatch(addDeviceInBasket(device.id)) : router(RouteName.LOGIN)
	}

	return (
		<div className={st.wrap}>
			<div>
				<img
					src={process.env.REACT_APP_API_URL + "/" + device.img}
					alt=""
					className={st.img}
				/>
				<Link to={RouteName.DEVICE + "/" + device.id} className={st.name}>
					{device.name}
				</Link>
			</div>
			<div className={st.bottom}>
				<div className={st.block}>
					<h3 className={st.price}>{priceFormat(device.price)} ₽</h3>
					<div className={st.block}>
						<button
							className={st.favorites}
							title="В избранное"
							onClick={() =>
								isAuth
									? dispatch(addToFavoritesDevice(device.id))
									: router(RouteName.LOGIN)
							}
						>
							<BsBookmark />
						</button>
						<div className={st.star}>
							<span>{device.rating}</span>
							<AiTwotoneStar />
						</div>
					</div>
				</div>
				<button onClick={addToBasket} className={st.buy}>
					Купить
				</button>
			</div>
		</div>
	)
}

export default DeviceShopItem
