const { Comment, User } = require("../models/models")

class CommentService {
	async create(deviceId, userId, message) {
		const data = await Comment.create({ deviceId, userId, message })
		return data
	}

	async findById(deviceId, limit, offset) {
		const data = await Comment.findAndCountAll({
			attributes: { exclude: ["userId", "deviceId"] },
			include: {
				model: User,
				attributes: ["id", "email", "login"],
			},
			where: { deviceId },
			limit,
			offset,
			order: [["createdAt", "DESC"]],
		})
		return data
	}

	async deleteComment(id) {
		await Comment.destroy({ where: { id } })
	}

	async deleteByDeviceId(deviceId) {
		await Comment.destroy({ where: { deviceId } })
	}
}

module.exports = new CommentService()
