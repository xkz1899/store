import React from "react"
import st from "./Footer.module.scss"
import Container from "./../container/Container"

const Footer = () => {
	return (
		<div className={st.wrap}>
			<Container>
				<div className={st.footer}>
				  <p>&copy; Все права защищены</p>
				</div>
			</Container>
		</div>
	)
}

export default Footer
