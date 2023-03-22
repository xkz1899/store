import { useState } from "react"
import { useAppDispatch } from "./../../../../../hooks/redux"
import Confirm from "./../../../../UI/confirm/Confirm"
import { BsTrash } from "react-icons/bs"
import { destroySlide } from "../../../../../store/reducers/slider/action"
import st from "./DeleteSlide.module.scss"

interface IDeleteSlide {
	id: number
}

const DeleteSlide = ({ id }: IDeleteSlide) => {
	const dispatch = useAppDispatch()
	const [sliderConfirm, setSliderConfirm] = useState(false)

	const yes = (id: number) => {
		dispatch(destroySlide(id))
		setSliderConfirm(false)
	}

	const no = () => {
		setSliderConfirm(false)
	}

	return (
		<div className={st.bin}>
			{sliderConfirm && <Confirm yes={() => yes(id)} no={no} />}
			<button onClick={() => setSliderConfirm(true)} className={st.trash}>
				<BsTrash />
			</button>
		</div>
	)
}

export default DeleteSlide
