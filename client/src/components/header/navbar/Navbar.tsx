import { BiUserCircle } from "react-icons/bi"
import { RxHamburgerMenu } from "react-icons/rx"
import { Link } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../../hooks/redux"
import { RouteName } from "../../../routes"
import { logout } from "../../../store/reducers/auth/action"
import { setVisibleCategory } from "../../../store/reducers/category"
import Container from "../../container/Container"
import Search from "./../../UI/search/Search"
import st from "./Navbar.module.scss"

const Navbar = () => {
	const { isAuth, currentUser } = useAppSelector(state => state.authReducer)
	const dispatch = useAppDispatch()

	const logOut = () => {
		dispatch(logout())
	}
	return (
		<div>
			<Container>
				<div className={st.wrap}>
					<button
						onClick={() => dispatch(setVisibleCategory(true))}
						className={st.menu}
					>
						<RxHamburgerMenu />
					</button>
					<Link to={RouteName.MAIN} className={st.logo} title="Главная">
						Orange Shop
					</Link>
					<div className={st.search}>
						<Search redirect={true} />
					</div>
					<nav className={st.nav}>
						{isAuth ? (
							<div className={st.block}>
								<button className={st.user}>
									<p>{currentUser.login}</p>
									<BiUserCircle />
								</button>
								<button onClick={logOut} className={st.exit}>
									Выйти
								</button>
							</div>
						) : (
							<div className={st.auth_not}>
								<Link to={RouteName.LOGIN}>Войти</Link>
								<Link to={RouteName.REGISTRATION}>Регистрация</Link>
							</div>
						)}
					</nav>
				</div>
			</Container>
		</div>
	)
}

export default Navbar
