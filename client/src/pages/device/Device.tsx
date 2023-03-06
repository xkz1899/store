import Container from "./../../components/container/Container"
import About from "./../../components/device/about/About"
import Characteristic from "./../../components/device/characteristic/Characteristic"
import CurrentDevice from "./../../components/device/currentDevice/CurrentDevice"
import Navigate from "./../../components/device/navigate/Navigate"
import Reviews from "./../../components/device/reviews/Reviews"

const Device = () => {
	return (
		<Container>
			<CurrentDevice />
			<Navigate />
			<About />
			<Characteristic />
			<Reviews />
		</Container>
	)
}

export default Device
