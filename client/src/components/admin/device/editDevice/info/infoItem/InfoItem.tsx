import { AiFillCloseCircle } from "react-icons/ai"
import { useAppDispatch, useAppSelector } from "../../../../../../hooks/redux"
import { IInfo } from "../../../../../../models/IInfo"
import { setInfoConfirmDelete } from "../../../../../../store/reducers/admin"
import { deleteCharacteristic } from "../../../../../../store/reducers/info/action"
import Confirm from "../../../../../UI/confirm/Confirm"
import st from "./InfoItem.module.scss"

interface IInfoItem {
	info: IInfo
}

const InfoItem = ({ info }: IInfoItem) => {
	const { infoConfirmDelete } = useAppSelector(state => state.adminReducer)

	const dispatch = useAppDispatch()

	const yes = () => {
		dispatch(deleteCharacteristic(info.id))
		dispatch(setInfoConfirmDelete(0))
	}

	const no = () => {
		dispatch(setInfoConfirmDelete(0))
	}

	return (
		<div key={info.id}>
			<div key={info.id} className={st.characteristic}>
				<h4>{info.key}</h4>
				<h4>{info.value}</h4>
				<button
					onClick={() => dispatch(setInfoConfirmDelete(info.id))}
					className={st.remove}
				>
					<AiFillCloseCircle />
				</button>
				<button
					onClick={() => dispatch(setInfoConfirmDelete(info.id))}
					className={st.remove_phone}
				>
					Удалить
				</button>
			</div>
			{infoConfirmDelete === info.id && <Confirm yes={yes} no={no} />}
		</div>
	)
}

export default InfoItem
