import { useEffect, useState } from "react"
import { useAppSelector } from "../../../hooks/redux"
import { setOrderCurrentPage } from "../../../store/reducers/order"
import { getOrders } from "../../../store/reducers/order/action"
import { roleChecking } from "../../../utils/roleChecking"
import Pagination from "../../UI/pagination/Pagination"
import { useAppDispatch } from "./../../../hooks/redux"
import VisibleButton from "./../../UI/visibleButton/VisibleButton"
import st from "./OrderAdmin.module.scss"
import OrderItem from "./orderItem/OrderItem"

const OrderAdmin = () => {
	const { currentUser } = useAppSelector(state => state.authReducer)
	const { route } = useAppSelector(state => state.adminReducer)
	const { orders, count, currentPage, limit } = useAppSelector(state => state.orderReducer)
	const dispatch = useAppDispatch()
	const [visibleActive, setVisibleActive] = useState(true)
	const [access, setAccess] = useState(false)

	useEffect(() => {
		setAccess(roleChecking(["admin"], currentUser))
	}, [])

	useEffect(() => {
		dispatch(getOrders(currentPage, limit))
	}, [currentPage])

	return route === `order` ? (
		access ? (
			<div className={st.wrapper}>
				<h1 className={st.title}>Заказы</h1>
				<VisibleButton visible={visibleActive} setVisible={setVisibleActive} text="Все заказы" />
				{ visibleActive &&
					<>
						<div className={st.list}>
							{orders?.map(order => (
								<OrderItem order={order} key={order.id} />
							))}
						</div>
						<Pagination count={count} currentPage={currentPage} limit={limit} setCurrentPage={setOrderCurrentPage} />
					</>
				}
			</div>
		) : (
			<h1 className={st.access}>Недостаточно прав для доступа</h1>
		)
	) : (
		<></>
	)
}

export default OrderAdmin
