import { IUser } from "../../../../models/IUser"
import { setSelectedUser } from "../../../../store/reducers/user"
import { useAppDispatch } from "./../../../../hooks/redux"
import st from "./UserItem.module.scss"

interface IUserItem {
	user: IUser
}

const UserItem = ({ user }: IUserItem) => {
	const dispatch = useAppDispatch()

	return (
		<div
			className={st.user}
			onClick={() => dispatch(setSelectedUser(user))}
			key={user.id}
		>
			<h4>{user.email}</h4>
			<h4>{user.login}</h4>
			<h4 style={{ color: user.ban ? "#f00" : "#0f0" }}>
				{user.ban ? "Заблокирован" : "Активен"}
			</h4>
		</div>
	)
}

export default UserItem
