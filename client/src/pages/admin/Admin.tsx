import BrandAdmin from "./../../components/admin/brand/BrandAdmin"
import CategoryAdmin from "./../../components/admin/category/CategoryAdmin"
import DeviceAdmin from "./../../components/admin/device/DeviceAdmin"
import AdminList from "./../../components/admin/list/AdminList"
import SettingsAdmin from "./../../components/admin/settings/SettingsAdmin"
import UserAdmin from "./../../components/admin/user/UserAdmin"
import Container from "./../../components/container/Container"
import st from "./Admin.module.scss"
import OrderAdmin from "./../../components/admin/order/OrderAdmin"

const Admin = () => {
	return (
		<Container>
			<div className={st.wrapper}>
				<AdminList />
				<div className={st.line}></div>
				<div>
					<CategoryAdmin />
					<DeviceAdmin />
					<UserAdmin />
					<BrandAdmin />
					<SettingsAdmin />
					<OrderAdmin />
				</div>
			</div>
		</Container>
	)
}

export default Admin
