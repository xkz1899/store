import { useState } from "react"
import { useAppDispatch, useAppSelector } from "../../../../../../hooks/redux"
import { createCharacteristic } from "../../../../../../store/reducers/info/action"
import Input from "./../../../../../UI/input/Input"
import OrangeButton from "./../../../../../UI/orangeButton/OrangeButton"
import st from "./CreateInfo.module.scss"

const CreateInfo = () => {
	const [keyInfo, setKeyInfo] = useState(``)
	const [valueInfo, setValueInfo] = useState(``)
	const { currentDevice } = useAppSelector(state => state.deviceReducer)

	const dispatch = useAppDispatch()

	const createNewInfo = () => {
		if (currentDevice.id && currentDevice.id !== 0 && keyInfo.length >= 3 && valueInfo.length >= 2 ) {
			dispatch(createCharacteristic(keyInfo, valueInfo, currentDevice.id))
			setKeyInfo(``)
			setValueInfo(``)
		}
	}

	return (
		<div className={st.create_info}>
			<div className={st.info_inputs}>
				<Input
					placeholder="Параметр..."
					value={keyInfo}
					setValue={setKeyInfo}
				/>
				<Input
					placeholder="Значение..."
					value={valueInfo}
					setValue={setValueInfo}
				/>
			</div>
			<OrangeButton click={createNewInfo}>Добавить</OrangeButton>
		</div>
	)
}

export default CreateInfo
