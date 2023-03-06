import { HiOutlineArrowNarrowRight } from "react-icons/hi"
import { useAppSelector } from "../../../hooks/redux"
import { setDeviceRoute } from "../../../store/reducers/device"
import { useAppDispatch } from "../../../hooks/redux"
import st from "./Preview.module.scss"

const Preview = () => {
	const { info } = useAppSelector(state => state.infoReducer)
	const dispatch = useAppDispatch()

	return (
		<div className={st.wrap}>
			{info.map(
				(item, i) =>
					i < 4 && (
						<ul className={st.list} key={item.id}>
							<li className={st.item}>
								<span className={st.key}>{item.key}: </span>
								<span className={st.value}>{item.value}</span>
							</li>
						</ul>
					)
			)}
			<button
				onClick={() => dispatch(setDeviceRoute(`characteristic`))}
				className={st.btn}
			>
				<span>Все характеристики </span>
				<HiOutlineArrowNarrowRight />
			</button>
			<hr className={st.line} />
			<button
				onClick={() => dispatch(setDeviceRoute(`reviews`))}
				className={st.btn}
			>
				<span>Отзывы о товаре</span>
				<HiOutlineArrowNarrowRight />
			</button>
		</div>
	)
}

export default Preview
