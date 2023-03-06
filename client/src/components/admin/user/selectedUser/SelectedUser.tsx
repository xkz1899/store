import { useState, useEffect } from "react"
import { useAppSelector } from "../../../../hooks/redux"
import Confirm from "../../../UI/confirm/Confirm"
import { useAppDispatch } from "./../../../../hooks/redux"
import { bannedUser } from "./../../../../store/reducers/user/action"
import st from "./SelectedUser.module.scss"

const SelectedUser = () => {
	const { selectedUser } = useAppSelector(state => state.userReducer)
	const dispatch = useAppDispatch()
	const [visibleConfirm, setVisibleConfirm] = useState(false)
	const [banMessage, setBanMessage] = useState(``)
	const [admin, setAdmin] = useState(false)

	const ban = () => {
		banMessage.length > 3 &&
			dispatch(bannedUser(selectedUser.id, true, banMessage))
		setVisibleConfirm(false)
	}

	useEffect(() => {
		Object.keys(selectedUser).length &&
			selectedUser?.roles.forEach(i => i.role === "admin" ? setAdmin(true): setAdmin(false))
	}, [selectedUser])

	const removeBan = () => {
		dispatch(bannedUser(selectedUser.id, false, null))
	}

	return Object.keys(selectedUser).length ? (
		<div className={st.wrap}>
			<div className={st.header}>
				<h3 className={st.title}>ID {selectedUser?.id}</h3>
				<div className={st.banned}>
					{!admin ? (
						!selectedUser.ban ? (
							<button
								className={st.delete_btn}
								onClick={() => setVisibleConfirm(true)}
							>
								Заблокировать пользователя
							</button>
						) : (
							<button onClick={removeBan} className={st.remove_ban}>
								Снять блокировку
							</button>
						)
					) : (
						<></>
					)}
					{visibleConfirm && (
						<>
							<input
								className={st.ban_message}
								type="text"
								placeholder="Причина блокировки..."
								value={banMessage}
								onChange={e => setBanMessage(e.target.value)}
							/>
							<Confirm yes={ban} no={() => setVisibleConfirm(false)} />
						</>
					)}
				</div>
			</div>
			<div className={st.user}>
				<div className={st.email}>
					<h4>E-mail:</h4>
					<h4>{selectedUser?.email}</h4>
				</div>
				<div className={st.login}>
					<h4>Логин:</h4>
					<h4>{selectedUser?.login}</h4>
				</div>
				<div className={st.date}>
					<h4>Дата создания:</h4>
					<h4>{(selectedUser?.createdAt + ``).slice(0, 10)}</h4>
				</div>
				<div className={st.status}>
					<h4>Статус:</h4>
					<h4 style={{ color: selectedUser?.ban ? "#f00" : "#0f0" }}>
						{selectedUser?.ban ? "Заблокирован" : "Активен"}
					</h4>
				</div>
				{selectedUser?.ban && (
					<div className={st.ban}>
						<h4>Причина блокировки:</h4>
						<h4>{selectedUser?.ban_message}</h4>
					</div>
				)}
				<div className={st.roles}>
					<h4>Роли:</h4>
					<div>
						{selectedUser?.roles?.map(role => (
							<h4 key={role.id}>{role.role}</h4>
						))}
					</div>
				</div>
			</div>
		</div>
	) : (
		<></>
	)
}

export default SelectedUser
