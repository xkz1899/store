import { AiOutlineUser } from "react-icons/ai"
import { useNavigate } from "react-router-dom"
import { useAppSelector } from "../../../hooks/redux"
import { RouteName } from "../../../routes"
import { useAppDispatch } from "./../../../hooks/redux"
import { logout } from "./../../../store/reducers/auth/action"
import st from "./LoginButton.module.scss"

const LoginButton = () => {
	const { isAuth } = useAppSelector(state => state.authReducer)
	const router = useNavigate()
	const dispatch = useAppDispatch()

	const loginOrLogout = () => {
		if (isAuth) {
			dispatch(logout())
		} else {
			router(RouteName.LOGIN)
		}
	}

	return (
		<button onClick={loginOrLogout} className={st.login}>
			<AiOutlineUser />
			<span>{isAuth ? "Выйти" : "Войти"}</span>
		</button>
	)
}

export default LoginButton
