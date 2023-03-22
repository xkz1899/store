const ApiError = require("../errors/apiError")
const favoritesService = require("../service/favoritesService")

class FavoritesController {
	async addDevice(req, res, next) {
		try {
			const { deviceId } = req.body
			const data = await favoritesService.addDevice(req.user.id, deviceId)
			res.json(data)
		} catch (err) {
			next(ApiError.BadRequest(err.message))
		}
	}

	async getAll(req, res, next) {
		try {
			const data = await favoritesService.getAll(req.user.id)
			res.json(data)
		} catch (err) {
			next(ApiError.BadRequest(err.message))
		}
	}

	async deleteDevice(req, res, next) {
		try {
			const { id } = req.params
			await favoritesService.deleteDevice(id)
			res.json({ message: "Device deleted." })
		} catch (err) {
			next(ApiError.BadRequest(err.message))
		}
	}
}

module.exports = new FavoritesController()
