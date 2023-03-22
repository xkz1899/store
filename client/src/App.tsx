import { useEffect } from "react"
import AppRouter from "./components/AppRouter"
import Footer from "./components/footer/Footer"
import Navbar from "./components/header/navbar/Navbar"
import SubHeader from "./components/header/subHeader/SubHeader"
import { useAppDispatch } from "./hooks/redux"
import { refresh } from "./store/reducers/auth/action"

const App = () => {
	const dispatch = useAppDispatch()

	useEffect(() => {
		if (localStorage.getItem(`accessToken`)) {
			dispatch(refresh())
		}
	}, [])

	return (
		<div className="wrapper">
			<Navbar />
			<SubHeader />
			<div className="main">
				<AppRouter />
			</div>
			<Footer />
		</div>
	)
}

export default App
