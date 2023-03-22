import React from "react"
import st from "./RedButton.module.scss"

interface IRedButton {
	click: () => void
	children: React.ReactNode
}

const RedButton = ({ click, children }: IRedButton) => {
	return <button className={st.red} onClick={click}>{children}</button>
}

export default RedButton
