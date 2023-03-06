const { Order, OrderDevice, User, Device } = require("../models/models")

class OrderService {
	async createOrder(city, street, phone, userId) {
		const data = await Order.create({ city, street, phone, userId })
		return data
	}

	async addDevice(orderId, deviceId) {
		const data = await OrderDevice.create({ orderId, deviceId })
		return data
	}

	async getByOrder(offset, limit) {
		return await Order.findAndCountAll({
			distinct: true,
			attributes: { exclude: ["userId"] },
			include: [
				{
					model: OrderDevice,
					attributes: ["id"],
					include: {
						model: Device,
						attributes: ["id", "name", "price", "img"],
					},
				},
				{ model: User, attributes: ["id", "email", "login"] },
			],
			order: [["createdAt", "DESC"]],
			offset,
			limit,
		})
	}

	async deleteOrder(id) {
		await Order.destroy({ where: { id } })
		await OrderDevice.destroy({ where: { orderId: id } })
	}

	async deleteByDeviceId(deviceId) {
		await OrderDevice.destroy({ where: { deviceId } })
	}
}

module.exports = new OrderService()
