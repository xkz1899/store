import { useAppSelector } from "../../../hooks/redux"
import { setDeviceRoute } from "../../../store/reducers/device"
import { useAppDispatch } from "./../../../hooks/redux"
import st from "./Navigate.module.scss"

const Navigate = () => {
	const { route } = useAppSelector(state => state.deviceReducer)
	const dispatch = useAppDispatch()

	const data = [
		{ name: `О товаре`, value: `about` },
		{ name: `Характеристики`, value: `characteristic` },
		{ name: `Отзывы`, value: `reviews` },
	]

	return (
		<div className={`${st.list} `}>
			{data.map(item => (
				<button
					key={item.value}
					onClick={() => dispatch(setDeviceRoute(item.value))}
					className={`${route === item.value ? st.active : ""}`}
				>
					{item.name}
				</button>
			))}
		</div>
	)
}

export default Navigate
