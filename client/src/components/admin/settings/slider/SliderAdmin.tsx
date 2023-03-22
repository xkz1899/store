import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux"
import { getAllSlide } from "../../../../store/reducers/slider/action"
import CreateSlide from "./createSlide/CreateSlide"
import DeleteSlide from "./deleteSlide/DleteSlide"
import st from "./SliderAdmin.module.scss"

const SliderAdmin = () => {
	const { slider } = useAppSelector(state => state.sliderReducer)
	const dispatch = useAppDispatch()

	useEffect(() => {
		dispatch(getAllSlide())
	}, [])

	return (
		<div>
			<CreateSlide />
			<p className={st.title}>Все слайды</p>
			<div className={st.list}>
				{slider?.map(slide => (
					<div key={slide.id} className={st.slide}>
						<img src={process.env.REACT_APP_API_URL + "/" + slide.img} alt="" />
						<div className={st.change}>
							<p>{slide.url}</p>
							<DeleteSlide id={slide.id} />
						</div>
					</div>
				))}
			</div>
		</div>
	)
}

export default SliderAdmin
