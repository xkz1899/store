import React from "react"
import st from "./Input.module.scss"

interface IInput {
	value: string
	setValue: React.Dispatch<React.SetStateAction<string>>
	placeholder?: string
	type?: string
}

const Input = ({ value, setValue, placeholder, type }: IInput) => {
	return (
		<input
			type={type || "text"}
			className={st.input}
			placeholder={placeholder}
			value={value}
			onChange={e => setValue(e.target.value)}
		/>
	)
}

export default Input
