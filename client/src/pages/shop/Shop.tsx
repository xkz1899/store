import Container from "./../../components/container/Container"
import st from "./Shop.module.scss"
import DeviceShopList from "../../components/shop/deviceList/DeviceList"
import FilterShop from "../../components/shop/filter/Filter"
import OutputOptions from "./../../components/shop/outputOptions/OutputOptions"

const Shop = () => {
	return (
		<Container>
			<div className={st.wrapper}>
				<FilterShop />
				<div>
					<OutputOptions />
					<DeviceShopList />
				</div>
			</div>
		</Container>
	)
}

export default Shop
