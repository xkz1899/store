import { GiHamburgerMenu } from "react-icons/gi"
import { useAppDispatch } from "../../../hooks/redux"
import { setVisibleCategory } from "../../../store/reducers/category"
import Category from "../../category/Category"
import Container from "../../container/Container"
import Navigate from "../navigate/Navigate"
import Cart from "./../../UI/cart/Cart"
import FavoritesButton from "./../../UI/favorites/FavoritesButton"
import Search from "./../../UI/search/Search"
import st from "./SubHeader.module.scss"

const SubHeader = () => {
	const dispatch = useAppDispatch()

	return (
		<div>
			<Container>
				<div className={st.wrap}>
					<button
						className={st.catalog}
						onClick={e => dispatch(setVisibleCategory(true))}
					>
						<GiHamburgerMenu />
						<span>Каталог товаров</span>
					</button>
					<Search redirect={true} />
					<div className={st.btns}>
						<FavoritesButton />
						<Cart />
					</div>
				</div>
				<Category />
				<Navigate />
			</Container>
		</div>
	)
}

export default SubHeader
