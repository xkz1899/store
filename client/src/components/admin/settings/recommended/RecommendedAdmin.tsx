import { useEffect } from "react"
import { getAllRecommended } from "../../../../store/reducers/recommended/action"
import { useAppDispatch, useAppSelector } from "./../../../../hooks/redux"
import Loader from "./../../../loader/Loader"
import st from "./RecommendedAdmin.module.scss"
import RecommendedItem from "./recommendedItem/RecommendedItem"

const RecommendedAdmin = () => {
	const { isLoading, devices } = useAppSelector(
		state => state.recommendedReducer
	)
	const dispatch = useAppDispatch()

	useEffect(() => {
		dispatch(getAllRecommended())
	}, [])

	return (
		<div className={st.wrap}>
			{!isLoading ? (
				devices.length ? (
					devices.map(device => (
						<RecommendedItem key={device.id} device={device} />
					))
				) : (
					<h2 className={st.empty}>Список рекомендуемого пуст</h2>
				)
			) : (
				<Loader />
			)}
		</div>
	)
}

export default RecommendedAdmin
