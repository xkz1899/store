import React from "react"
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai"
import st from "./Eye.module.scss"

interface IEye {
	visible: boolean
	setVisible: React.Dispatch<React.SetStateAction<boolean>>
}

const Eye = ({ visible, setVisible }: IEye) => {
	return (
		<button
			tabIndex={-1}
			onClick={() => setVisible(!visible)}
			className={st.eye}
		>
			{visible ? (
				<AiFillEyeInvisible title="Скрыть" />
			) : (
				<AiFillEye title="Показать" />
			)}
		</button>
	)
}

export default Eye
