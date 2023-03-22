import { useState } from "react"
import { AiFillCloseCircle, AiOutlineCheck, AiOutlineClose } from "react-icons/ai"
import { useAppDispatch } from "../../../../../../hooks/redux"
import { IImages } from "../../../../../../models/IImages"
import { deleteImage } from "../../../../../../store/reducers/image/action"
import st from "./ImagesList.module.scss"

interface IImagesList {
	image: IImages
}

const ImagesList = ({ image }: IImagesList) => {
	const [confirmDeleteImage, setConfirmDeleteImage] = useState(0)

	const dispatch = useAppDispatch()

	return (
		<div className={st.wrap}>
			<img
				src={process.env.REACT_APP_API_URL + image.img}
				className={st.img}
				alt=""
			/>
			<button
				onClick={() => setConfirmDeleteImage(image.id)}
				className={st.delete}
			>
				<AiFillCloseCircle />
			</button>
			<div
				className={`${st.confirm_img} ${
					image.id === confirmDeleteImage ? st.active_img : ""
				}`}
			>
				<button
					onClick={() => dispatch(deleteImage(image.id))}
					className={st.confirm_yes}
				>
					<AiOutlineCheck />
				</button>
				<button
					onClick={() => setConfirmDeleteImage(0)}
					className={st.confirm_no}
				>
					<AiOutlineClose />
				</button>
			</div>
		</div>
	)
}

export default ImagesList
