import { useEffect, useState } from "react"
import { AiOutlineClose } from "react-icons/ai"
import { useAppDispatch, useAppSelector } from "./../../../hooks/redux"
import { IComment } from "./../../../models/IComment"
import { removeComment } from "./../../../store/reducers/comment/action"
import { roleChecking } from "./../../../utils/roleChecking"
import Confirm from "../../UI/confirm/Confirm"
import st from "./ReviewsItem.module.scss"

interface IReviewsItem {
	comment: IComment
}

const ReviewsItem = ({ comment }: IReviewsItem) => {
	const [visibleConfirm, setVisibleConfirm] = useState(false)
	const [access, setAccess] = useState(false)

	const { isAuth, currentUser } = useAppSelector(state => state.authReducer)

	const dispatch = useAppDispatch()

	useEffect(() => {
		isAuth && setAccess(roleChecking(["admin"], currentUser))
	}, [currentUser])

	return (
		<div className={st.comment}>
			<div className={st.header}>
				<div>
					<h3>{comment.user.login}</h3>
					<p className={st.create}>
						{(comment.createdAt + "").slice(0, 16).replace(/T/, " ")}
					</p>
				</div>
				{isAuth && access && (
					<div className={st.remove}>
						{visibleConfirm && (
							<Confirm
								yes={() => dispatch(removeComment(comment.id))}
								no={() => setVisibleConfirm(false)}
							/>
						)}
						<button
							className={st.delete}
							onClick={() => setVisibleConfirm(true)}
						>
							<AiOutlineClose />
						</button>
					</div>
				)}
			</div>

			<p className={st.title}>Комментарий:</p>
			<p>{comment.message}</p>
		</div>
	)
}

export default ReviewsItem
