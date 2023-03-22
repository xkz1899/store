import { useEffect, useState } from "react"
import { BiChevronRight } from "react-icons/bi"
import { Link } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "./../../hooks/redux"
import { getAllSlide } from "./../../store/reducers/slider/action"
import st from "./Slider.module.scss"

const Slider = () => {
	const { slider, count } = useAppSelector(state => state.sliderReducer)
	const dispatch = useAppDispatch()

	const [currentSlide, setCurrentSlide] = useState(0)

	useEffect(() => {
		dispatch(getAllSlide())
	}, [])

	const next = () => {
		if (currentSlide < count - 1) {
			setCurrentSlide(currentSlide + 1)
		} else {
			setCurrentSlide(0)
		}
	}

	const prev = () => {
		if (currentSlide > 0) {
			setCurrentSlide(currentSlide - 1)
		} else {
			setCurrentSlide(count - 1)
		}
	}

	return slider ? (
		<div className={st.slider}>
			<div className={st.btns}>
				<button onClick={prev} className={st.prev}>
					<BiChevronRight />
				</button>
				<p className={st.counter}>
					{currentSlide + 1} / {count}
				</p>
				<button onClick={next} className={st.next}>
					<BiChevronRight />
				</button>
			</div>
			<div style={{ left: `-${currentSlide * 100}%` }} className={st.track}>
				{slider?.map(slide => (
					<Link key={slide.id} className={st.link} to={slide.url}>
						<img
							key={slide.id}
							src={process.env.REACT_APP_API_URL + "/" + slide.img}
							alt=""
						/>
					</Link>
				))}
			</div>
		</div>
	) : (
		<></>
	)
}

export default Slider
