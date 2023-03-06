const { Op } = require("sequelize")
const { User, Role } = require("../models/models")

class UserService {
	async getAll(limit, offset) {
		return await User.findAndCountAll({
			attributes: { exclude: ["password"] },
			distinct: true,
			include: {
				model: Role,
				attributes: ["id", "role"],
				through: {
					attributes: [],
				},
			},
			limit,
			offset,
			order: [["createdAt", "DESC"]],
		})
	}

	async search(search, limit, offset) {
		return await User.findAndCountAll({
			attributes: { exclude: ["password"] },
			distinct: true,
			include: {
				model: Role,
				attributes: ["id", "role"],
				through: {
					attributes: [],
				},
			},
			where: {
				[Op.or]: [
					{
						email: {
							[Op.iLike]: "%" + search + "%",
						},
						login: {
							[Op.iLike]: "%" + search + "%",
						},
					},
				],
			},
			limit,
			offset,
			order: [["createdAt", "DESC"]],
		})
	}

	async banUser(id, ban, message) {
		await User.update({ ban, ban_message: message }, { where: { id } })
	}
}

module.exports = new UserService()
