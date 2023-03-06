import { useEffect, useState } from "react"
import { useAppSelector } from "../../../hooks/redux"
import { setCurrentPage } from "../../../store/reducers/device"
import Select from "../../UI/select/Select"
import VisibleButton from "../../UI/visibleButton/VisibleButton"
import { useAppDispatch } from "./../../../hooks/redux"
import { getDeviceByCategory, getDeviceById, searchDevices } from "./../../../store/reducers/device/action"
import { roleChecking } from "./../../../utils/roleChecking"
import Search from "./../../UI/search/Search"
import CreateDevice from "./createDevice/CreateDevice"
import st from "./DeviceAdmin.module.scss"
import EditDevice from "./editDevice/EditDevice"
import SelectDevice from "./selectDevice/SelectDevice"

const DeviceAdmin = () => {
	const { route } = useAppSelector(state => state.adminReducer)
	const { categories } = useAppSelector(state => state.categoryReducer)
	const { sort, currentPage, searchDevice, limit, currentDevice } =
		useAppSelector(state => state.deviceReducer)
	const dispatch = useAppDispatch()

	const [deviceId, setDeviceId] = useState(0)
	const [categoryId, setCategoryId] = useState(0)

	const [editVisible, setEditVisible] = useState(false)
	const [createVisible, setCreateVisible] = useState(false)
	const [selectVisible, setSelectVisible] = useState(false)

	const { currentUser } = useAppSelector(state => state.authReducer)
	const [access, setAccess] = useState(false)

	useEffect(() => {
		setAccess(roleChecking(["admin"], currentUser))
	}, [])

	useEffect(() => {
		if (searchDevice.length) {
			dispatch(searchDevices(searchDevice, null, currentPage, limit, sort))
		} else {
			if (categoryId !== undefined) {
				dispatch(
					getDeviceByCategory(categoryId, null, currentPage, limit, sort)
				)
			}
		}
	}, [categoryId, currentPage, searchDevice])

	useEffect(() => {
		if (deviceId !== undefined) {
			dispatch(getDeviceById(deviceId))
		}
	}, [deviceId])

	useEffect(() => {
		if (searchDevice.length > 0) {
			setSelectVisible(true)
		}
	}, [searchDevice])

	const changeCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setCategoryId(Number(e.target.value))
		setSelectVisible(true)
		dispatch(setCurrentPage(1))
	}

	return route === `device` ? (
		access ? (
			<div className={st.wrapper}>
				<h1 className={st.main_title}>Товары</h1>
				<div className={st.edit}>
					<p className={st.title}>Выбрать категорию</p>
					<Select func={changeCategory} data={categories} />
						<VisibleButton visible={createVisible} setVisible={setCreateVisible} text="Создать устройство" />
					{createVisible && <CreateDevice categoryId={categoryId} />}
					<div className={st.select}>
						<div className={st.visible}>
							<p className={st.title}>Выбрать устройство</p>
							<VisibleButton visible={selectVisible} setVisible={setSelectVisible} text="Список устройств" />
						</div>
						<Search redirect={false} />
					</div>
					{selectVisible && (<SelectDevice setDeviceId={setDeviceId} setEditVisible={setEditVisible} />)}
					{Object.keys(currentDevice).length ? (
						<VisibleButton visible={editVisible} setVisible={setEditVisible} text="Редактировать устройство" />
					) : (<></>)}
					{editVisible && <EditDevice setVisible={setEditVisible} />}
				</div>
			</div>
		) : (
			<h1 className={st.access}>Недостаточно прав для доступа</h1>
		)
	) : (
		<></>
	)
}

export default DeviceAdmin
