import { authRoute, publicRoute } from "./../routes/index"
import { Routes, Route } from "react-router-dom"
import { useAppSelector } from "../hooks/redux"
import Ban from "./../pages/ban/Ban"

const AppRouter = () => {
	const { isAuth, currentUser } = useAppSelector(state => state.authReducer)

	return (
		<>
			{isAuth ? (
				!currentUser.ban ? (
					<Routes>
						{authRoute.map(({ path, Element }) => (
							<Route key={path} path={path} element={<Element />} />
						))}
					</Routes>
				) : (
					<Routes>
						<Route path="*" element={<Ban />} />
					</Routes>
				)
			) : (
				<Routes>
					{publicRoute.map(({ path, Element }) => (
						<Route key={path} path={path} element={<Element />} />
					))}
				</Routes>
			)}
		</>
	)
}

export default AppRouter
