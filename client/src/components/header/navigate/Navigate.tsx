import Container from "../../container/Container"
import Cart from "../../UI/cart/Cart"
import FavoritesButton from "../../UI/favorites/FavoritesButton"
import LoginButton from "../../UI/login/LoginButton"
import CatalogButton from "./../../UI/catalog/CatalogButton"
import Home from "./../../UI/home/Home"
import st from "./Navigate.module.scss"

const Navigate = () => {
	return (
		<Container>
			<div className={st.wrap}>
				<Home />
				<CatalogButton />
				<Cart />
				<FavoritesButton />
				<LoginButton />
			</div>
		</Container>
	)
}

export default Navigate
