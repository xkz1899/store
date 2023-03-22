import { useAppSelector } from "../../../hooks/redux"
import { setRoute } from "../../../store/reducers/admin"
import { useAppDispatch } from "./../../../hooks/redux"
import st from "./AdminList.module.scss"

const AdminList = () => {
	const data = [
		{ name: `Категории`, route: `category` },
		{ name: `Бренды`, route: `brand` },
		{ name: `Товары`, route: `device` },
		{ name: `Пользователи`, route: `user` },
		{ name: `Заказы`, route: `order` },
		{ name: `Настройки`, route: `settings` },
	]
	const { route } = useAppSelector(state => state.adminReducer)
	const dispatch = useAppDispatch()

	return (
		<div className={st.wrap}>
			{data.map(item => (
				<button
					key={item.route}
					onClick={() => dispatch(setRoute(item.route))}
					className={`${st.btn} ${route === item.route ? st.active : ""}`}
				>
					{item.name}
				</button>
			))}
		</div>
	)
}

export default AdminList
