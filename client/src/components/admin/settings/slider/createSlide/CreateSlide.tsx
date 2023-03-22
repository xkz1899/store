import { useState } from "react"
import { BiCloudUpload } from "react-icons/bi"
import { createSlide } from "../../../../../store/reducers/slider/action"
import { useAppDispatch } from "./../../../../../hooks/redux"
import Input from "./../../../../UI/input/Input"
import OrangeButton from "./../../../../UI/orangeButton/OrangeButton"
import st from "./CreateSlide.module.scss"

const CreateSlide = () => {
	const [url, setUrl] = useState(``)
	const [img, setImg] = useState<FileList | null>(null)
	const dispatch = useAppDispatch()

	const upload = () => {
		if (img && url) {
			dispatch(createSlide(img[0], url))
			setUrl(``)
			setImg(null)
		}
	}

	return (
		<div className={st.wrap}>
			<p className={st.title}>Добавить слайд</p>

			<div className={st.create}>
				<label
					htmlFor="upload-slide"
					className={st.upload_label}
					title="Загрузить слайд"
				>
					<BiCloudUpload />
					<span>{img && img[0].name}</span>
				</label>
				<input
					type="file"
					onChange={e => setImg(e.target.files)}
					className={st.upload_input}
					id="upload-slide"
				/>
				<Input value={url} setValue={setUrl} placeholder="Ссылка..." />
			</div>
			<OrangeButton click={upload}>Создать</OrangeButton>
		</div>
	)
}

export default CreateSlide
