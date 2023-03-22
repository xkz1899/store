import { useAppDispatch } from "../../../hooks/redux"
import st from "./Pagination.module.scss"

interface IPagination {
	currentPage: number
	setCurrentPage: (payload: number) => any
	limit: number
	count: number
}

const Pagination = ({
	currentPage,
	setCurrentPage,
	limit,
	count,
}: IPagination) => {
	const dispatch = useAppDispatch()
	const page: Array<number> = []

	for (let i = 0; i < Math.ceil(count / limit); i++) {
		page.push(i + 1)
	}

	return count > 0 ? (
		<div className={st.wrap}>
			{currentPage >= 4 && (
				<>
					<button
						className={st.btn}
						onClick={() => dispatch(setCurrentPage(1))}
					>
						1
					</button>
					<p className={st.dot}>...</p>
				</>
			)}
			{page.map(i =>
				i === currentPage - 1 ||
				i === currentPage - 2 ||
				i === currentPage ||
				i === currentPage + 1 ||
				i === currentPage + 2 ? (
					<button
						key={i}
						onClick={() => dispatch(setCurrentPage(i))}
						className={`${st.btn} ${i === currentPage ? st.active : ""}`}
					>
						{i}
					</button>
				) : (
					<></>
				)
			)}
			{currentPage <= page[page.length - 1] - 3 && (
				<>
					<p className={st.dot}>...</p>
					<button
						onClick={() => dispatch(setCurrentPage(page[page.length - 1]))}
						className={st.btn}
					>
						{page[page.length - 1]}
					</button>
				</>
			)}
		</div>
	) : (
		<></>
	)
}

export default Pagination
