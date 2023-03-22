import React from "react"
import st from "./Select.module.scss"

interface ISelect {
	setId?: React.Dispatch<React.SetStateAction<number>>
	data: Array<any>
	func?: (e: React.ChangeEvent<HTMLSelectElement>) => void
}

const Select = ({ setId, data, func }: ISelect) => {
	return (
		<select
			className={st.select}
			onChange={func ? func : e => setId && setId(Number(e.target.value))}
		>
			<option value={undefined}></option>
			{data.map(item => (
				<option key={item.id} value={item.id}>
					{item.name}
				</option>
			))}
		</select>
	)
}

export default Select
