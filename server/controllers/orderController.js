const ApiError = require("../errors/apiError")
const orderService = require("../service/orderService")

class OrderController {
	async createOrder(req, res, next) {
		try {
			const { city, street, phone } = req.body
			const data = await orderService.createOrder(city, street, phone, req.user.id)
			res.json(data)
		} catch (err) {
			next(ApiError.BadRequest(err.message))
		}
	}

	async addDevice(req, res, next) {
		try {
			const { orderId, deviceId } = req.body
			const data = await orderService.addDevice(orderId, deviceId)
			res.json(data)
		} catch (err) {
			next(ApiError.BadRequest(err.message))
		}
	}

	async getByOrder(req, res, next) {
		try {
			const { limit = 9, page = 1 } = req.query
			let offset = limit * page - limit
			const data = await orderService.getByOrder(offset, limit)
			res.json(data)
		} catch (err) {
			next(ApiError.BadRequest(err.message))
		}
	}
	
	async deleteOrder(req, res, next) {
		try {
			await orderService.deleteOrder(req.params.id)
			res.json({ message: `Order deleted.` })
		}
		catch (err) {
			next(ApiError.BadRequest(err.message))
		}
	}

}

module.exports = new OrderController()
