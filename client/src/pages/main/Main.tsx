import Slider from "../../components/slider/Slider";
import Container from "./../../components/container/Container";
import Recommended from './../../components/recommended/Recommended';
import st from "./Main.module.scss";

const Main = () => {
	return (
		<div className={st.wrapper}>
			<Container>
				<Slider />
				<Recommended />
			</Container>
		</div>
	)
}

export default Main
