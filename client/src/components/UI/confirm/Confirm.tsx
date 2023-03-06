import st from "./Confirm.module.scss"

interface IConfirmDeleteDevice {
	yes: () => void
	no: () => void
}

const Confirm = ({ yes, no }: IConfirmDeleteDevice) => {
	return (
		<div className={st.confirm_delete}>
			<h1>Вы уверены</h1>
			<div className={st.btns}>
				<button onClick={yes} className={st.yes}>
					Да
				</button>
				<button onClick={no} className={st.no}>
					Нет
				</button>
			</div>
		</div>
	)
}

export default Confirm
