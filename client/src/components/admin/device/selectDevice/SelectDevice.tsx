import React, { useState, useEffect } from "react"
import { useAppSelector } from "../../../../hooks/redux"
import { setCurrentPage } from "../../../../store/reducers/device"
import Pagination from "./../../../UI/pagination/Pagination"
import st from "./SelectDevice.module.scss"

interface ISelectDevice {
	setDeviceId: React.Dispatch<React.SetStateAction<number>>
	setEditVisible: React.Dispatch<React.SetStateAction<boolean>>
}

const SelectDevice = ({ setDeviceId, setEditVisible }: ISelectDevice) => {
	const { devices, devicesCount, currentPage, limit, currentDevice } =
		useAppSelector(state => state.deviceReducer)

	const selectedDevice = (id: number) => {
		setDeviceId(id)
		setTimeout(() => setEditVisible(true), 100)
	}

	return (
		<div className={st.device}>
			{devices.length ? (
				devices.map(device => (
					<button
						key={device.id}
						onClick={() => selectedDevice(device.id)}
						className={`${st.device_btn} ${
							currentDevice.id === device.id ? st.active : ""
						}`}
					>
						{device.name}
					</button>
				))
			) : (
				<h1 className={st.empty}>Устройств не найдено</h1>
			)}
			<div className={st.pagination}>
				<Pagination
					count={devicesCount}
					currentPage={currentPage}
					limit={limit}
					setCurrentPage={setCurrentPage}
				/>
			</div>
			{/* <VisibleButton visible={editVisible} setVisible={setEditVisible} /> */}
		</div>
	)
}

export default SelectDevice
