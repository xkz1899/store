import { useAppSelector } from "../../hooks/redux"
import st from "./Recommended.module.scss"
import { useEffect } from "react"
import { useAppDispatch } from "./../../hooks/redux"
import { getAllRecommended } from "./../../store/reducers/recommended/action"
import DeviceShopItem from "../shop/deviceItem/DeviceItem"
import Loader from "../loader/Loader"

const Recommended = () => {
	const { devices, isLoading } = useAppSelector(
		state => state.recommendedReducer
	)
	const dispatch = useAppDispatch()

	useEffect(() => {
		dispatch(getAllRecommended())
	}, [])

	return !isLoading ? (
		devices.length ? (
			<div className={st.wrap}>
				<h1 className={st.title}>Рекомендуемое</h1>
				{
					<>
						<div className={st.grid}>
							{devices?.map(device => (
								<DeviceShopItem key={device.id} device={device} />
							))}
						</div>
					</>
				}
			</div>
		) : (
			<></>
		)
	) : (
		<Loader />
	)
}

export default Recommended
