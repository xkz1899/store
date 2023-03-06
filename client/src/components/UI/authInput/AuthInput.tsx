import React from "react"
import st from "./AuthInput.module.scss"

interface IAuthInput {
	value: string
	setValue: React.Dispatch<React.SetStateAction<string>>
	type?: string
	placeholder?: string
}

const AuthInput = ({ value, setValue, placeholder, type }: IAuthInput) => {
	return (
		<input
			type={type || "email"}
			placeholder={placeholder}
			className={st.input}
			value={value}
			onChange={e => setValue(e.target.value)}
		/>
	)
}

export default AuthInput
