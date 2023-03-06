import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { useAppSelector } from "../../../hooks/redux"
import { setRatingError } from "../../../store/reducers/rating"
import { useAppDispatch } from "./../../../hooks/redux"
import { getDeviceById } from "./../../../store/reducers/device/action"
import Controller from "./../controller/Controller"
import ImageList from "./../imageList/ImageList"
import Preview from "./../preview/Preview"
import st from "./CurrentDevice.module.scss"

const CurrentDevice = () => {
	const { id } = useParams()
	const { currentDevice } = useAppSelector(state => state.deviceReducer)
	const dispatch = useAppDispatch()

	useEffect(() => {
		if (id !== undefined) {
			dispatch(getDeviceById(Number(id)))
			dispatch(setRatingError(null))
		}
	}, [])

	return (
		<div className={st.wrap}>
			<h1 className={st.name}>{currentDevice.name}</h1>
			<div className={st.content}>
				<ImageList />
				<Preview />
				<Controller />
			</div>
		</div>
	)
}

export default CurrentDevice
