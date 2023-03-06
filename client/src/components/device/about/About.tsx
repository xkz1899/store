import { useAppSelector } from "../../../hooks/redux"
import st from "./About.module.scss"

const About = () => {
	const { route, currentDevice } = useAppSelector(state => state.deviceReducer)

	return route === `about` ? (
		<div className={st.wrap}>
			<h3 className={st.description}>{currentDevice.description}</h3>
		</div>
	) : (
		<></>
	)
}

export default About
