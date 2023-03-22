import React, { useState } from "react"
import Eye from "./eye/Eye"
import st from "./PasswordInput.module.scss"

interface IPasswordInput {
	password: string
	setPassword: React.Dispatch<React.SetStateAction<string>>
}

const PasswordInput = ({ password, setPassword }: IPasswordInput) => {
	const [visible, setVisible] = useState(false)

	return (
		<div className={st.password}>
			<input
				type={visible ? "text" : "password"}
				value={password}
				onChange={e => setPassword(e.target.value)}
				placeholder="Password"
			/>
			<Eye visible={visible} setVisible={setVisible} />
		</div>
	)
}

export default PasswordInput
