import { useEffect, useState } from "react"
import { useAppSelector } from "../../../hooks/redux"
import { roleChecking } from "../../../utils/roleChecking"
import VisibleButton from "./../../UI/visibleButton/VisibleButton"
import RecommendedAdmin from "./recommended/RecommendedAdmin"
import st from "./SettingsAdmin.module.scss"
import SliderAdmin from "./slider/SliderAdmin"

const SettingsAdmin = () => {
	const { currentUser } = useAppSelector(state => state.authReducer)
	const { route } = useAppSelector(state => state.adminReducer)

	const [visibleSlider, setVisibleSlider] = useState(false)
	const [visibleRecommended, setVisibleRecommended] = useState(false)
	const [access, setAccess] = useState(false)

	useEffect(() => {
		setAccess(roleChecking(["admin"], currentUser))
	}, [])

	return route === `settings` ? (
		access ? (
			<div>
				<h1 className={st.main_title}>Настройки</h1>
				<VisibleButton visible={visibleSlider} setVisible={setVisibleSlider} text="Слайдер" />
				{visibleSlider && <SliderAdmin />}
				<VisibleButton visible={visibleRecommended} setVisible={setVisibleRecommended} text="Рекомендуемое" />
				{visibleRecommended && <RecommendedAdmin />}
			</div>
		) : (
			<h1 className={st.access}>Недостаточно прав для доступа</h1>
		)
	) : (
		<></>
	)
}

export default SettingsAdmin
