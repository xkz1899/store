import st from "./Loader.module.scss"

const Loader = () => {
	return (
		<div className={st.lds__background}>
			<div className={st.lds}>
				<div></div>
				<div></div>
				<div></div>
			</div>
		</div>
	)
}

export default Loader
