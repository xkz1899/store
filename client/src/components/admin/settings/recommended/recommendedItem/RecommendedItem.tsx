import { useState } from "react"
import { IDevice } from "./../../../../../models/IDevice"
import { useNavigate } from "react-router-dom"
import { useAppDispatch } from './../../../../../hooks/redux';
import { changeRecommendedDevice } from "../../../../../store/reducers/recommended/action";
import { RouteName } from "../../../../../routes";
import { BsTrash } from 'react-icons/bs';
import Confirm from './../../../../UI/confirm/Confirm';
import st from "./RecommendedItem.module.scss"

interface IRecommendedItem {
	device: IDevice
}

const RecommendedItem = ({ device }: IRecommendedItem) => {
	const [visibleConfirm, setVisibleConfirm] = useState(false)
	const router = useNavigate()

  const dispatch = useAppDispatch()

	const yes = (id: number) => {
		dispatch(changeRecommendedDevice(id, false))
		setVisibleConfirm(false)
	}

	const no = () => {
		setVisibleConfirm(false)
	}

	return (
		<div key={device.id} className={st.device}>
			<button
				onClick={() => router(RouteName.DEVICE + "/" + device.id)}
				className={st.btn}
			>
				{device.name}
			</button>
			<div className={st.flex}>
				<button
					onClick={() => setVisibleConfirm(true)}
					className={`${st.btn} ${st.trash}`}
				>
					<BsTrash />
					<span>Удалить</span>
				</button>
				{visibleConfirm && <Confirm yes={() => yes(device.id)} no={no} />}
			</div>
		</div>
	)
}

export default RecommendedItem
