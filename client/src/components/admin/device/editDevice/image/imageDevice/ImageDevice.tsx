import React from "react"
import { BiCloudUpload } from "react-icons/bi"
import { useAppDispatch, useAppSelector } from "../../../../../../hooks/redux"
import { updateDeviceImage } from "../../../../../../store/reducers/device/action"
import { createImage } from "../../../../../../store/reducers/image/action"
import ImagesList from "../imagesList/ImagesList"
import st from "./ImageDevice.module.scss"

const ImageDevice = () => {
	const { currentDevice } = useAppSelector(state => state.deviceReducer)
	const { images } = useAppSelector(state => state.imageReducer)
	const dispatch = useAppDispatch()

	const uploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
		const files = e.target.files
		if (files && currentDevice.id) {
			for (let i = 0; i < files.length; i++) {
				dispatch(createImage(files[i], currentDevice.id))
			}
		}
	}

	const uploadMainImg = (e: React.ChangeEvent<HTMLInputElement>) => {
		const files = e.target.files
		if (files) {
			dispatch(updateDeviceImage(files[0], currentDevice.id))
		}
	}

	return (
		<>
			<p className={st.title}>Главное изображения</p>
			<div className={st.main_img}>
				<img
					src={process.env.REACT_APP_API_URL + currentDevice.img}
					className={st.img}
					alt=""
				/>
				<button>
					<label title="Загрузить главное изображение" htmlFor="main-upload">
						<input onChange={uploadMainImg} type="file" id="main-upload" />
					</label>
					<BiCloudUpload />
				</button>
			</div>
			<div className={st.create_list}>
				<p className={st.title}>Список изображений</p>
				<label title="Загрузить изображения" className={st.upload_img} htmlFor="upload_img">
					<BiCloudUpload />
					<input multiple={true} type="file" onChange={uploadImage} id="upload_img" />
				</label>
			</div>
			<div className={st.list}>
				{images.map(image => <ImagesList key={image.id} image={image} />)}
			</div>
		</>
	)
}

export default ImageDevice
