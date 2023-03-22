import { useAppDispatch } from "../../../hooks/redux"
import { IImages } from "../../../models/IImages"
import { setCurrentImage } from "../../../store/reducers/image"
import st from "./Image.module.scss"

interface IImage {
	img: IImages
}

const Image = ({ img }: IImage) => {
	const dispatch = useAppDispatch()

	const selectImage = () => {
		dispatch(setCurrentImage(img))
	}

	return (
		<button key={img.id} className={st.btn} onClick={selectImage}>
			<img
				className={st.image_btn}
				src={process.env.REACT_APP_API_URL + img?.img}
				alt=""
			/>
		</button>
	)
}

export default Image
