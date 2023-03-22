import { useAppSelector } from "../../../hooks/redux"
import st from "./Characteristic.module.scss"

const Characteristic = () => {
	const { route } = useAppSelector(state => state.deviceReducer)
	const { info } = useAppSelector(state => state.infoReducer)

	return route === "characteristic" ? (
		<div className={st.wrap}>
			{info.length ? (
				info.map((item, i) => (
					<div
						key={item.id}
						className={`${st.item} ${i % 2 === 0 ? st.even : ""}`}
					>
						<h4>{item.key}</h4>
						<h4>{item.value}</h4>
					</div>
				))
			) : (
				<h4 className={st.empty}>Для этого товара нет характеристик</h4>
			)}
		</div>
	) : (
		<></>
	)
}

export default Characteristic
