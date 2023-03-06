import { useEffect, useState } from "react"
import { useAppSelector } from "../../../hooks/redux"
import { setUserCurrentPage } from "../../../store/reducers/user"
import { roleChecking } from "../../../utils/roleChecking"
import { useDelay } from "./../../../hooks/delay"
import { useAppDispatch } from "./../../../hooks/redux"
import { getAllUsers, searchUsers } from "./../../../store/reducers/user/action"
import Loader from "./../../loader/Loader"
import Pagination from "./../../UI/pagination/Pagination"
import SelectedUser from "./selectedUser/SelectedUser"
import st from "./UserAdmin.module.scss"
import UserItem from "./userItem/UserItem"

const UserAdmin = () => {
	const { route } = useAppSelector(state => state.adminReducer)
	const { users, currentPage, count, isLoading } = useAppSelector(
		state => state.userReducer
	)
	const [searchValue, setSearchValue] = useState(``)
	const value = useDelay(searchValue)

	const dispatch = useAppDispatch()

	const { currentUser } = useAppSelector(state => state.authReducer)
	const [access, setAccess] = useState(false)
	useEffect(() => {
		setAccess(roleChecking(["admin"], currentUser))
	}, [])

	useEffect(() => {
		if (value.length) {
			dispatch(searchUsers(value))
		} else {
			dispatch(getAllUsers(currentPage))
		}
	}, [currentPage, value])

	return route === `user` ? (
		access ? (
			<div className={st.wrap}>
				<h1 className={st.title}>Пользователи</h1>
				<input
					type="text"
					placeholder="Поиск..."
					className={st.search}
					value={searchValue}
					onChange={e => setSearchValue(e.target.value)}
				/>
				<div className={st.users}>
					<div className={st.titles}>
						<h4>E-mail</h4>
						<h4>Логин</h4>
						<h4>Статус</h4>
					</div>
					{!isLoading ? (
						users.length ? (
							users.map(user => <UserItem key={user.id} user={user} />)
						) : (
							<h1 className={st.empty}>Пользователей не найдено</h1>
						)
					) : (
						<Loader />
					)}
				</div>
				<Pagination
					count={count}
					currentPage={currentPage}
					setCurrentPage={setUserCurrentPage}
					limit={9}
				/>
				<SelectedUser />
			</div>
		) : (
			<h1 className={st.access}>Недостаточно прав для доступа</h1>
		)
	) : (
		<></>
	)
}

export default UserAdmin
