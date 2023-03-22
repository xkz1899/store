import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { RouteName } from "../../routes"
import { setErrorMessage } from "../../store/reducers/auth"
import { login } from "../../store/reducers/auth/action"
import AuthInput from "../UI/authInput/AuthInput"
import { useAppDispatch, useAppSelector } from "./../../hooks/redux"
import PasswordInput from "./../UI/passwordInput/PasswordInput"
import st from "./FormLogin.module.scss"

const FormLogin = () => {
	const { errorMessage } = useAppSelector(state => state.authReducer)
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const dispatch = useAppDispatch()
	const router = useNavigate()

	const enter = () => {
		if (email.length > 5 && password.length > 5) {
			dispatch(login(email, password))
			errorMessage && router(RouteName.MAIN)
		}
	}

	useEffect(() => {
		dispatch(setErrorMessage(null))
		// eslint-disable-next-line
	}, [])

	return (
		<div className={st.wrap}>
			<div className={st.content}>
				<h2 className={st.title}>Войти</h2>
				{errorMessage && <p className={st.error}>Неверный логин или пароль</p>}
				<AuthInput value={email} setValue={setEmail} placeholder="E-mail" />
				<PasswordInput password={password} setPassword={setPassword} />
				<div className={st.auth}>
					<button onClick={enter} className={st.enter}>
						Войти
					</button>
				</div>
				<p>
					Нет аккаунта?{" "}
					<Link to={RouteName.REGISTRATION} className={st.registration}>
						Зарегистрироваться
					</Link>
				</p>
			</div>
		</div>
	)
}

export default FormLogin
