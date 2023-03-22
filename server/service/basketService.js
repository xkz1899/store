const { Basket, BasketDevice, Device } = require("../models/models")

class BasketService {
	async createBasket(userId) {
		const basket = await Basket.create({ userId })
		return basket
	}

	async addDevice(basketId, deviceId) {
		const basketDevice = await BasketDevice.create({ basketId, deviceId })
		const data = await BasketDevice.findOne({
			distinct: true,
			attributes: { exclude: ["deviceId", "basketId"] },
			include: {
				model: Device,
			},
			where: { id: basketDevice.id },
			order: [["createdAt", "DESC"]],
		})
		return data
	}

	async deleteDevice(id) {
		const data = await BasketDevice.destroy({ where: { id } })
		return data
	}

	async getAll(basketId) {
		const data = await BasketDevice.findAndCountAll({
			distinct: true,
			attributes: { exclude: ["deviceId", "basketId"] },
			include: {
				model: Device,
			},
			where: { basketId },
			order: [["createdAt", "DESC"]],
		})
		return data
	}

	async getBasket(userId) {
		return await Basket.findOne({ where: { userId } })
	}

	async clearBasket(basketId) {
		await BasketDevice.destroy({ where: { basketId } })
	}

	async deleteByDeviceId(deviceId) {
		await BasketDevice.destroy({ where: { deviceId } })

	}

}

module.exports = new BasketService()
