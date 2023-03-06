import React from "react"
import st from "./OrangeButton.module.scss"

interface IOrangeButton {
	children: React.ReactNode
	click: () => void
}

const OrangeButton = ({ children, click }: IOrangeButton) => {
	return (
		<button onClick={click} className={st.btn}>
			{children}
		</button>
	)
}

export default OrangeButton
