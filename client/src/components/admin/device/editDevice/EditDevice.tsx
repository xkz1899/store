import { useEffect, useRef, useState } from "react"
import { useAppSelector } from "../../../../hooks/redux"
import { setDeviceRecommend } from "../../../../store/reducers/device"
import { deleteDevice, editDevice } from "../../../../store/reducers/device/action"
import { changeRecommendedDevice } from "../../../../store/reducers/recommended/action"
import Confirm from "../../../UI/confirm/Confirm"
import Select from "../../../UI/select/Select"
import { useAppDispatch } from "./../../../../hooks/redux"
import { getBrands } from "./../../../../store/reducers/brand/action"
import Input from './../../../UI/input/Input'
import OrangeButton from './../../../UI/orangeButton/OrangeButton'
import RedButton from './../../../UI/redButton/RedButton'
import VisibleButton from "./../../../UI/visibleButton/VisibleButton"
import st from "./EditDevice.module.scss"
import ImageDevice from "./image/imageDevice/ImageDevice"
import CreateInfo from "./info/createInfo/CreateInfo"
import InfoItem from "./info/infoItem/InfoItem"

interface IEditDevice {
	setVisible: React.Dispatch<React.SetStateAction<boolean>>
}

const EditDevice = ({ setVisible }: IEditDevice) => {
	const { currentDevice } = useAppSelector(state => state.deviceReducer)
	const { info } = useAppSelector(state => state.infoReducer)
	const { categories } = useAppSelector(state => state.categoryReducer)
	const { brands } = useAppSelector(state => state.brandReducer)
	const dispatch = useAppDispatch()

	const [name, setName] = useState(``)
	const [description, setDescription] = useState(``)
	const [price, setPrice] = useState(0)
	const [newCategoryId, setNewCategoryId] = useState(0)
	const [newBrandId, setNewBrandId] = useState(0)

	const [visibleImage, setVisibleImage] = useState(true)
	const [visibleInfo, setVisibleInfo] = useState(true)
	const [visibleDelete, setVisibleDelete] = useState(false)

	const [apply, setApply] = useState(false)

	const ref = useRef<HTMLFormElement>(null)

	useEffect(() => {
		setName(currentDevice.name)
		setDescription(currentDevice.description)
		setPrice(currentDevice.price)
		setNewCategoryId(currentDevice.categoryId)
		dispatch(getBrands(currentDevice.categoryId))
		setNewBrandId(currentDevice.brandId || 0)
		setApply(false)
	}, [currentDevice])

	const saveChangesDevice = () => {
		dispatch(editDevice(currentDevice.id, name, description, price, newCategoryId, newBrandId))
		setApply(true)
	}

	const reset = () => {
		dispatch(deleteDevice(currentDevice.id))
		setVisibleDelete(false)
		setVisible(false)
		setDescription(``)
		setName(``)
		setPrice(0)
	}

	const changeRecommend = () => {
		if (currentDevice.recommended) {
			dispatch(changeRecommendedDevice(currentDevice.id, false))
			dispatch(setDeviceRecommend())
		} else {
			dispatch(changeRecommendedDevice(currentDevice.id, true))
			dispatch(setDeviceRecommend())

		}
	}

	useEffect(() => {
		ref.current?.reset()
	}, [currentDevice])

	return (
		<form ref={ref} onSubmit={e => e.preventDefault()} className={st.update}>
			<p className={st.title}>????????????????</p>
			<Input value={name} setValue={setName} />
			<p className={st.title}>????????????????</p>
			<textarea value={description} className={st.description} onChange={e => setDescription(e.target.value)} />
			<p className={st.title}>????????</p>
			<div className={st.price}>
				<input type="number" value={price} onChange={e => setPrice(Number(e.target.value))} />
				<span>???</span>
			</div>
			<div>
				<p className={st.title}>?????????????????? ?????????? ??????????????????</p>
				<div>
					<Select setId={setNewCategoryId} data={categories} />
				</div>
			</div>
			<div>
				<p className={st.title}>?????????????????? ??????????</p>
				<div className={st.brand}>
					<Select setId={setNewBrandId} data={brands} />
					<p> {brands.find(f => f.id === currentDevice.brandId)?.name || "???? ??????????????????"}</p>
				</div>
			</div>
			<button onClick={changeRecommend} className={`${st.recommend} ${currentDevice.recommended ? st.remove : st.add}`}>
				{currentDevice.recommended ? "???????????? ???? ????????????????????????????" : "???????????????? ?? ??????????????????????????"}
			</button>
			<div className={st.flex}>
				{apply && <p className={st.apply}>?????????????????? ??????????????????.</p>}
				<RedButton click={() => setVisibleDelete(true)} >?????????????? ??????????</RedButton>
				<OrangeButton click={saveChangesDevice}>??????????????????</OrangeButton>
			</div>

			{visibleDelete && (
				<Confirm yes={reset} no={() => setVisibleDelete(false)} />
			)}
			<div className={st.info}>
				<VisibleButton visible={visibleInfo} setVisible={setVisibleInfo} text="????????????????????????????" />
				{visibleInfo && (
					<div>
						<CreateInfo />
						{info.length ? info?.map(item => <InfoItem key={item.id} info={item} />) 
							:
						<h2 className={st.empty}>???????????? ?????????????????????????? ????????</h2>}
					</div>
				)}
			</div>
			<VisibleButton visible={visibleImage} setVisible={setVisibleImage} text="??????????????????????" />
			{visibleImage && <ImageDevice />}
		</form>
	)
}

export default EditDevice
