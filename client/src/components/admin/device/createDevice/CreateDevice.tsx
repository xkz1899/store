import { useState, useEffect } from "react"
import { MdOutlineCloudUpload } from "react-icons/md"
import { createDevice } from "../../../../store/reducers/device/action"
import { useAppDispatch, useAppSelector } from "./../../../../hooks/redux"
import st from "./CreateDevice.module.scss"
import Select from './../../../UI/select/Select';
import { getBrands } from './../../../../store/reducers/brand/action';

interface ICreateDevice {
	categoryId: number
}

const CreateDevice = ({ categoryId }: ICreateDevice) => {
	const dispatch = useAppDispatch()
	const { brands } = useAppSelector(state => state.brandReducer)

	const [name, setName] = useState(``)
	const [description, setDescription] = useState(``)
	const [price, setPrice] = useState(0)
	const [image, setImage] = useState<FileList | null>()
	const [brandId, setBrandId] = useState(0)

	const [error, setError] = useState(false)
	const [created, setCreated] = useState(false)

	useEffect(() => {
		dispatch(getBrands(categoryId))
	}, [categoryId])

	const createNewDevice = () => {
		console.log([name, description, price, image, categoryId])
		if (name && description && price && image && categoryId && brandId !== 0) {
			dispatch(createDevice(name, description, price, categoryId, image[0], brandId))
			setName(``)
			setDescription(``)
			setPrice(0)
			setImage(null)
			setError(false)
			setCreated(true)
		} else {
			setError(true)
			setCreated(false)
		}
	}

	return (
		<div className={st.wrap}>
			<p className={st.title}>Название</p>
			<input
				type="text"
				value={name}
				placeholder="Название..."
				onChange={e => setName(e.target.value)}
			/>
			<p className={st.title}>Описание</p>
			<textarea
				value={description}
				className={st.description}
				placeholder="Описание..."
				onChange={e => setDescription(e.target.value)}
			/>
			<p className={st.title}>Цена</p>
			<div>
				<input
					type="number"
					value={price}
					onChange={e => setPrice(Number(e.target.value))}
				/>
				<span>₽</span>
			</div>
			<p className={st.title}>Бренд</p>
			<Select data={brands} func={(e) => setBrandId(Number(e.target.value))} />
			<p className={st.title}>Изображение</p>
			<button className={st.upload}>
				<label htmlFor="create-upload" title="Загрузить изображение">
					<MdOutlineCloudUpload />
					<input
						type="file"
						id="create-upload"
						onChange={e => setImage(e.target.files)}
					/>
				</label>
				<span>{image && image[0]?.name}</span>
			</button>
			{created && <p className={st.green}>Устройство создано</p>}
			{error && <p className={st.red}>Заполните все поля</p>}
			<button className={st.create} onClick={createNewDevice}>
				Создать
			</button>
		</div>
	)
}

export default CreateDevice
