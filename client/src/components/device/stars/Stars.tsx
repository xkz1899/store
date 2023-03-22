import st from "./Stars.module.scss"
import { useState } from "react"
import { useAppDispatch, useAppSelector } from "../../../hooks/redux"
import { addRating } from "../../../store/reducers/rating/action"
import { AiFillStar } from "react-icons/ai"
import { AiOutlineStar } from "react-icons/ai"
import { useParams } from "react-router-dom"

const Stars = () => {
	const { currentDevice } = useAppSelector(state => state.deviceReducer)
	const { isAuth } = useAppSelector(state => state.authReducer)
	const { error } = useAppSelector(state => state.ratingReducer)
	const dispatch = useAppDispatch()
	const { id } = useParams()

	const [currentStar, setCurrentStar] = useState(0)
	const stars = [1, 2, 3, 4, 5]

	const rate = (star: number) => {
		if (isAuth) {
			dispatch(addRating(Number(id), star))
		}
	}

	return (
		<>
			{error && <p className={st.error}>Вы уже оставили оценку</p>}
			<div className={st.wrap}>
				<div className={st.rate}>
					<AiFillStar />
					<h1>{currentDevice.rating}</h1>
				</div>
				<div className={st.stars}>
					{stars.map(star => (
						<div key={star} className={st.star}>
							<button
								onClick={() => rate(star)}
								onMouseMove={() => setCurrentStar(star)}
								onMouseLeave={() => setCurrentStar(0)}
								className={st.active}
								title={star + ``}
							>
								{currentStar === 0 ? (
									star <= currentDevice.rating ? (
										<AiFillStar />
									) : (
										<AiOutlineStar />
									)
								) : star <= currentStar ? (
									<AiFillStar />
								) : (
									<AiOutlineStar />
								)}
							</button>
							<h3>{star}</h3>
						</div>
					))}
				</div>
			</div>
		</>
	)
}

export default Stars
