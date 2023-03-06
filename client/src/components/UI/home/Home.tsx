import { RiHomeLine } from "react-icons/ri"
import { Link } from "react-router-dom"
import { RouteName } from "../../../routes"
import st from "./Home.module.scss"

const Home = () => {
	return (
		<Link to={RouteName.MAIN} className={st.home}>
			<RiHomeLine />
			<span>Главная</span>
		</Link>
	)
}

export default Home
