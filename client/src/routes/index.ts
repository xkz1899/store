import Login from "../pages/login/Login"
import PrepareOrder from "../pages/prepareOrder/PrepareOrder"
import Admin from "./../pages/admin/Admin"
import Basket from "./../pages/basket/Basket"
import Device from "./../pages/device/Device"
import Favorites from "./../pages/favorites/Favorites"
import Main from "./../pages/main/Main"
import Registration from "./../pages/registration/Registration"
import Shop from "./../pages/shop/Shop"

interface IRoute {
	path: string
	Element: React.ElementType
}

export enum RouteName {
	LOGIN = `/login`,
	REGISTRATION = `/registration`,
	MAIN = `/`,
	BASKET = `/basket`,
	DEVICE = `/device`,
	CATEGORY = `/category`,
	FAVORITES = `/favorites`,
	ADMIN = `/admin`,
	PREPARE = `/prepare`,
}

export const publicRoute: IRoute[] = [
	{ path: RouteName.MAIN, Element: Main },
	{ path: RouteName.CATEGORY + "/:id", Element: Shop },
	{ path: RouteName.DEVICE + "/:id", Element: Device },
	{ path: RouteName.LOGIN, Element: Login },
	{ path: RouteName.REGISTRATION, Element: Registration },
	{ path: RouteName.BASKET, Element: Basket },
	{ path: `*`, Element: Main },
]

export const authRoute: IRoute[] = [
	{ path: RouteName.MAIN, Element: Main },
	{ path: RouteName.ADMIN, Element: Admin },
	{ path: RouteName.CATEGORY + "/:id", Element: Shop },
	{ path: RouteName.DEVICE + "/:id", Element: Device },
	{ path: RouteName.BASKET, Element: Basket },
	{ path: RouteName.FAVORITES, Element: Favorites },
	{ path: RouteName.PREPARE, Element: PrepareOrder },
	{ path: `*`, Element: Main },
]
