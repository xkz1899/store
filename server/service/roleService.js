const { Role, UserRole } = require("../models/models")
const ApiError = require("../errors/apiError")

class RoleService {
	async saveRole(role) {
		const exist = await Role.findOne({ where: { role } })
		if (exist) {
			return exist
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
		const role = await this.saveRole("user")
		await this.saveRole("admin")
		return role
	}

	async createUserRole(userId, roleId) {
		let role = await UserRole.findOne({ where: { userId, roleId } })
		if (userId == 1 && !role) {
			await UserRole.create({ userId, roleId: 2 })
		}
		return await UserRole.create({ userId, roleId })
	}
}

module.exports = new RoleService()
