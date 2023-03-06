const deviceService = require("../service/deviceService")
const ApiError = require("../errors/apiError")

class DeviceController {
	async createDevice(req, res, next) {
		try {
			const { name, description, price, rating, categoryId, brandId } = req.body
			const { img } = req.files
			const device = await deviceService.create(
				name,
				description,
				price,
				rating,
				categoryId,
				img,
				brandId
			)
			res.json(device)
		} catch (err) {
			next(ApiError.BadRequest(err.message))
		}
	}

	async updateDevice(req, res, next) {
		try {
			const { id } = req.body
			const device = await deviceService.findById(id)
			const {
				name = device.name,
				description = device.description,
				price = device.price,
				rating = device.rating,
				categoryId = device.categoryId,
				brandId = device.brandId,
			} = req.body
			const updateDevice = await deviceService.update(
				device,
				name,
				description,
				price,
				rating,
				categoryId,
				brandId,
				id
			)
			res.json(updateDevice)
		} catch (err) {
			next(ApiError.BadRequest(err.message))
		}
	}

	async getDeviceByCategory(req, res, next) {
		try {
			const {
				page = 1,
				limit = 9,
				categoryId,
				brandId,
				sort = `createdAt:DESC`,
				max,
				min,
			} = req.query
			let offset = page * limit - limit
			const devices = await deviceService.getByCategory(
				categoryId,
				brandId,
				limit,
				offset,
				sort,
				max,
				min
			)
			res.json(devices)
		} catch (err) {
			next(ApiError.BadRequest(err.message))
		}
	}

	async getDeviceSearch(req, res, next) {
		try {
			const {
				search,
				brandId,
				page = 1,
				limit = 9,
				sort = `createdAt:DESC`,
				max,
				min,
			} = req.query
			let offset = page * limit - limit
			const devices = await deviceService.searchDevices(
				search,
				brandId,
				limit,
				offset,
				sort,
				max,
				min
			)
			res.json(devices)
		} catch (err) {
			next(ApiError.BadRequest(err.message))
		}
	}

	async getDeviceById(req, res, next) {
		try {
			const { id } = req.params
			const data = await deviceService.findById(id)
			res.json(data)
		} catch (err) {
			next(ApiError.BadRequest(err.message))
		}
	}

	async deleteDevice(req, res, next) {
		try {
			const { id } = req.params
			await deviceService.deleteDevice(id)
			res.json({ message: `Device deleted.` })
		} catch (err) {
			next(ApiError.BadRequest(err.message))
		}
	}

	async deleteDeviceInfo(req, res, next) {
		try {
			const { id } = req.params
			await deviceService.deleteInfo(id)
			res.json({ message: "Info delete" })
		} catch (err) {
			next(ApiError.BadRequest(err.message))
		}
	}

	async createDeviceInfo(req, res, next) {
		try {
			const { deviceId, key, value } = req.body
			const data = await deviceService.createInfo(deviceId, key, value)
			res.json(data)
		} catch (err) {
			next(ApiError.BadRequest(err.message))
		}
	}

	async createImg(req, res, next) {
		try {
			const { deviceId } = req.body
			const { img } = req.files
			const data = await deviceService.createImg(img, deviceId)
			res.json(data)
		} catch (err) {
			next(ApiError.BadRequest(err.message))
		}
	}

	async deleteImg(req, res, next) {
		try {
			const { id } = req.params
			await deviceService.deleteImg(id)
			res.json({ message: "Img deleted." })
		} catch (err) {
			next(ApiError.BadRequest(err.message))
		}
	}
	async updateImg(req, res, next) {
		try {
			const { id } = req.body
			const { img } = req.files
			const device = await deviceService.updateImg(id, img)
			res.json(device)
		} catch (err) {
			next(ApiError.BadRequest(err.message))
		}
	}

	async addRating(req, res, next) {
		try {
			const { deviceId, rating } = req.body
			const data = await deviceService.addRating(deviceId, req.user.id, rating)
			res.json(data)
		} catch (err) {
			next(ApiError.BadRequest(err.message))
		}
	}

	async getRating(req, res, next) {
		try {
			const { deviceId } = req.params
			const rating = await deviceService.getRating(deviceId)
			res.json(rating)
		} catch (err) {
			next(ApiError.BadRequest(err.message))
		}
	}

	async getPrice(req, res, next) {
		try {
			const { categoryId, search } = req.query
			const data = await deviceService.getPrice(categoryId, search)
			res.json(data)
		} catch (err) {
			next(ApiError.BadRequest(err.message))
		}
	}

	async getRecommendedDevice(req, res, next) {
		try {
			const data = await deviceService.getRecommendedDevice()
			res.json(data)
		} catch (err) {
			next(ApiError.BadRequest(err.message))
		}
	}

	async changeRecommendedDevice(req, res, next) {
		try {
			const { id, recommended } = req.body
			const data = await deviceService.changeRecommended(id, recommended)
			res.json(data)
		} catch (err) {
			next(ApiError.BadRequest(err.message))
		}
	}
}

module.exports = new DeviceController()
