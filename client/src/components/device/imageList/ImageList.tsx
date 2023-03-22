import { useEffect, useState } from "react"
import {
	BsFillArrowLeftCircleFill,
	BsFillArrowRightCircleFill,
} from "react-icons/bs"
import { useAppSelector } from "../../../hooks/redux"
import Image from "./Image"
import st from "./ImageList.module.scss"

const ImageList = () => {
	const { currentDevice } = useAppSelector(state => state.deviceReducer)
	const { currentImage, images } = useAppSelector(state => state.imageReducer)

	const [outside, setOutside] = useState(`5rem`)
	const [imgNumber, setImgNumber] = useState(1)

	useEffect(() => {
		setOutside(`${(-imgNumber + 1) * 5}rem`)
	}, [imgNumber])

	const next = () => {
		setImgNumber(imgNumber + 1)
		if (imgNumber === images.length) {
			setImgNumber(1)
			setOutside(`5rem`)
		}
	}

	const prev = () => {
		setImgNumber(imgNumber - 1)
		if (imgNumber <= 1) {
			setImgNumber(images.length)
		}
	}

	return (
		<div>
			{(currentImage?.img || currentDevice?.img) && (
				<img
					className={st.image__current}
					src={
						process.env.REACT_APP_API_URL +
						(currentImage?.img || currentDevice?.img)
					}
					alt=""
				/>
			)}
			{images.length ? (
				<div className={st.slider}>
					<button onClick={next} className={st.next}>
						<BsFillArrowRightCircleFill />
					</button>
					<button onClick={prev} className={st.prev}>
						<BsFillArrowLeftCircleFill />
					</button>
					<div className={st.track} style={{ left: outside }}>
						{images?.map(img => (
							<Image key={img.id} img={img} />
						))}
					</div>
				</div>
			) : (
				<></>
			)}
		</div>
	)
}

export default ImageList
