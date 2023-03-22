import { useEffect } from "react"
import { AiFillStar } from "react-icons/ai"
import { useParams } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "./../../../hooks/redux"
import { getRating } from "./../../../store/reducers/rating/action"
import st from "./Rating.module.scss"

const Rating = () => {
	const { rating, count } = useAppSelector(state => state.ratingReducer)
	const { currentDevice } = useAppSelector(state => state.deviceReducer)
	const dispatch = useAppDispatch()
	const { id } = useParams()
	const numRate = [5, 4, 3, 2, 1]
	const rate = [0, 0, 0, 0, 0]

	rating?.forEach(item => {
		if (item.rating === 5) rate[0] += 1
		if (item.rating === 4) rate[1] += 1
		if (item.rating === 3) rate[2] += 1
		if (item.rating === 2) rate[3] += 1
		if (item.rating === 1) rate[4] += 1
	})

	useEffect(() => {
		dispatch(getRating(Number(id)))
	}, [count])

	return (
		<div className={st.wrap}>
			<div className={st.info}>
				<div className={st.star}>
					<AiFillStar />
					<h3>{currentDevice.rating}</h3>
				</div>
				<h4>Оценки: {count}</h4>
			</div>
			<div className={st.rating}>
				{numRate.map((item, i) => (
					<div key={item} className={st.rate}>
						<p>{item}</p>
						<div className={st.line}>
							<div style={{ width: `${((rate[i] / count) * 100) | 0}%` }}></div>
						</div>
						<p className={st.percent}>{((rate[i] / count) * 100) | 0}%</p>
					</div>
				))}
			</div>
		</div>
	)
}

export default Rating
