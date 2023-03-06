import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useAppSelector } from "../../../hooks/redux"
import { setCurrentCommentsPage } from "../../../store/reducers/comment"
import {
	createComment,
	getComments
} from "../../../store/reducers/comment/action"
import Pagination from "../../UI/pagination/Pagination"
import { useAppDispatch } from "./../../../hooks/redux"
import Loader from "./../../loader/Loader"
import Rating from "./../rating/Rating"
import st from "./Reviews.module.scss"
import ReviewsItem from "./ReviewsItem"

const Reviews = () => {
	const { route } = useAppSelector(state => state.deviceReducer)
	const { comments, currentPage, isLoading, count, limit } = useAppSelector(
		state => state.commentReducer
	)
	const dispatch = useAppDispatch()
	const { isAuth, currentUser } = useAppSelector(state => state.authReducer)
	const { id } = useParams()
	const [value, setValue] = useState(``)


	useEffect(() => {
		if (id !== undefined) {
			dispatch(getComments(Number(id), currentPage))
		}
	}, [currentPage, count])

	const sendComment = () => {
		if (value.length >= 3) {
			dispatch(createComment(value, Number(id), currentUser.id))
			setValue(``)
		}
	}

	return route === "reviews" ? (
		!isLoading ? (
			<div className={st.wrap}>
				<Rating />
				<textarea
					className={st.create_comment}
					placeholder="Ваш комментарий..."
					value={value}
					onChange={e => setValue(e.target.value)}
				/>
				{isAuth ? (
					<button onClick={sendComment} className={st.btn}>
						Оставить отзыв
					</button>
				) : (
					<p className={st.error}>Войдите что бы оставить отзыв.</p>
				)}
				{comments.length ? (
					comments.map(comment => (
						<ReviewsItem key={comment.id} comment={comment} />
					))
				) : (
					<h2 className={st.empty}>Для этого товара пока нет отзывов</h2>
				)}
				<Pagination
					currentPage={currentPage}
					setCurrentPage={setCurrentCommentsPage}
					limit={limit}
					count={count}
				/>
			</div>
		) : (
			<Loader />
		)
	) : (
		<></>
	)
}

export default Reviews
