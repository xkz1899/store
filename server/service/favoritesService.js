const { Favorites, Device } = require("../models/models")

class FavoritesService {
	async addDevice(userId, deviceId) {
		const favorites = await Favorites.create({ userId, deviceId })
		const data = await Favorites.findOne({
			attributes: { exclude: ["deviceId", "userId"] },
			include: {
				model: Device,
			},
			where: { id: favorites.id },
			order: [["createdAt", "DESC"]],
		})
		return data
	}

	async deleteDevice(id) {
		await Favorites.destroy({ where: { id } })
	}

	async deleteByDeviceId(deviceId) {
		await Favorites.destroy({ where: { deviceId } })
	}

	async getAll(userId) {
		const data = await Favorites.findAndCountAll({
			distinct: true,
			attributes: { exclude: ["deviceId", "userId"] },
			include: {
				model: Device,
			},
			where: { userId },
			order: [["createdAt", "DESC"]],
		})
		return data
	}
}

module.exports = new FavoritesService()
