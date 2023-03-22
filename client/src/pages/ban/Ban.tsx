import { useAppSelector } from "../../hooks/redux"
import st from "./Ban.module.scss"

const Ban = () => {
	const { selectedUser } = useAppSelector(state => state.userReducer)
	return (
		<div className={st.ban}>
			<h1>Пользователь заблокирован причина {selectedUser.ban_message}</h1>
		</div>
	)
}

export default Ban
