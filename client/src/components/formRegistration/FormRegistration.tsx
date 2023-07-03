import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { RouteName } from "../../routes"
import { setErrorMessage } from "../../store/reducers/auth"
import { useAppDispatch, useAppSelector } from "./../../hooks/redux"
import { registration } from "./../../store/reducers/auth/action"
import AuthInput from "./../UI/authInput/AuthInput"
import PasswordInput from "./../UI/passwordInput/PasswordInput"
import st from "./FormRegistration.module.scss"

const FormRegistration = () => {
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [login, setLogin] = useState("")

	const { errorMessage, currentUser } = useAppSelector(
		state => state.authReducer
	)
	const dispatch = useAppDispatch()

	const router = useNavigate()

	const createUser = () => {
		if (email.length > 5 && password.length > 5 && login.length >= 3) {
			dispatch(registration(email, password, login))
			Object.values(currentUser).length && router(RouteName.MAIN)
		}
	}

	useEffect(() => {
		dispatch(setErrorMessage(null))
		// eslint-disable-next-line
	}, [])

	return (
		<div className={st.wrap}>
			<div className={st.content}>
				<h2 className={st.title}>Зарегистрироваться</h2>
				{errorMessage && <p className={st.error}>{errorMessage}</p>}
				<AuthInput value={email} setValue={setEmail} placeholder="E-mail" />
				<PasswordInput password={password} setPassword={setPassword} />
				<AuthInput value={login} setValue={setLogin} placeholder="Логин" />
				<button onClick={createUser} className={st.enter}>
					Зарегистрироваться
				</button>
				<p>
					Уже есть аккаунт?{" "}
					<Link to={RouteName.LOGIN} className={st.login}>
						Войти
					</Link>
				</p>
			</div>
		</div>
	)
}

export default FormRegistration
