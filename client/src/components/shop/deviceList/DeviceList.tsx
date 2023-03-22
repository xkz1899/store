import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../../hooks/redux"
import { setCurrentPage } from "../../../store/reducers/device"
import { getDeviceByCategory, searchDevices } from "../../../store/reducers/device/action"
import Pagination from "../../UI/pagination/Pagination"
import DeviceShopItem from "../deviceItem/DeviceItem"
import Loader from "./../../loader/Loader"
import st from "./DeviceList.module.scss"

const DeviceShopList = () => {
	const { devices, sort, currentPage, devicesCount, searchDevice, isLoading, limit } = useAppSelector(state => state.deviceReducer)
	const { currentCategory } = useAppSelector(state => state.categoryReducer)
	const { currentBrand } = useAppSelector(state => state.brandReducer)
	const { minPrice, maxPrice } = useAppSelector(state => state.filterReducer)
	const dispatch = useAppDispatch()
	const { id } = useParams()

	useEffect(() => {
		if (searchDevice.length === 0) {
			if (id !== undefined) {
				dispatch(getDeviceByCategory(Number(id), currentBrand?.id || null, currentPage,  limit, sort, maxPrice, minPrice))
			}
		} else {
			dispatch(searchDevices(searchDevice, currentBrand?.id || null, currentPage, limit, sort, maxPrice, minPrice))
		}
	}, [currentCategory, currentBrand, currentPage, currentBrand, searchDevice, sort, minPrice, maxPrice])

	useEffect(() => {
		dispatch(setCurrentPage(1))
	}, [sort])

	return isLoading ? (
		<Loader />
	) : (
		<div className={st.wrap}>
			{devices.length ? (
				<>
					<div className={st.grid}>
						{devices?.map(device => <DeviceShopItem key={device.id} device={device} /> )}
					</div>
					<Pagination count={devicesCount} setCurrentPage={setCurrentPage} currentPage={currentPage} limit={limit} />
				</>
			) : (
				<h1 className={st.empty}>Список товаров пуст</h1>
			)}
		</div>
	)
}

export default DeviceShopList
