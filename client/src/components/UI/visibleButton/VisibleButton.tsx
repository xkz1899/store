import React from "react"
import { MdArrowRight } from "react-icons/md"
import st from "./VisibleButton.module.scss"

interface IVisibleButton {
	visible: boolean
	text: string
	setVisible: React.Dispatch<React.SetStateAction<boolean>>
	title?: string
}

const VisibleButton = ({ visible, setVisible, title, text }: IVisibleButton) => {
	return (
	<div className={st.visible}>
		{text.length ? <p className={st.title}>{text}</p> : <></>}
			<button
				className={`${st.hide} ${visible ? st.show : ""}`}
				onClick={() => setVisible(!visible)}
				title={title}
			>
				<MdArrowRight />
			</button>
	</div>
	)
}

export default VisibleButton
