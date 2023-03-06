const ApiError = require("../errors/apiError")
const basketService = require("../service/basketService")

class BasketController {
	async addDevice(req, res, next) {
		try {
			const { deviceId } = req.body
			const data = await basketService.addDevice(req.user.basketId, deviceId)
			res.json(data)
		} catch (err) {
			next(ApiError.BadRequest(err.message))
		}
	}
	async getAll(req, res, next) {
		try {
			const data = await basketService.getAll(req.user.basketId)
			res.json(data)
		} catch (err) {
			next(ApiError.BadRequest(err.message))
		}
	}

	async deleteDevice(req, res, next) {
		try {
			const { id } = req.query
			await basketService.deleteDevice(id)
			res.json({ message: "Device deleted." })
		} catch (err) {
			next(ApiError.BadRequest(err.message))
		}
	}

	async clearBasket(req, res, next) {
		try {
			await basketService.clearBasket(req.user.basketId)
			res.json({message: `Basket clear.`})
		} catch (err) {
			next(ApiError.BadRequest(err.message))
		}
	}
}

module.exports = new BasketController()
