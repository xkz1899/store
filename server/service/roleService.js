const { Role, UserRole } = require("../models/models")
const ApiError = require("../errors/apiError")

class RoleService {
	async saveRole(role) {
		const exist = await Role.findOne({ where: { role } })
		console.log(exist)
		if (exist) {
			throw ApiError.BadRequest(`Role exist.`)
		}
		return await Role.create({ role })
	}

	async appointRole(userId, roleId) {
		let role = await UserRole.findOne({ where: { userId, roleId } })
		if (role) {
			throw ApiError.BadRequest(`Role existRole already assigned to user.`)
		}
		return await UserRole.create({ userId, roleId })
	}

	async getAll() {
		return await Role.findAll()
	}

	async getOne(role) {
		return await Role.findOne({ where: { role } })
	}

	async getRoleUserOrCreate() {
		let role = await this.getOne("user")
		if (!role) {
			role = await Role.create({ role: "user" })
		}
		return role
	}

	async createUserRole(userId, roleId) {
		return await UserRole.create({ userId, roleId })
	}

}

module.exports = new RoleService()
