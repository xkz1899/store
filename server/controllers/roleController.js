const roleService = require("../service/roleService")
const ApiError = require("../errors/apiError")

class RoleController {
	async createRole(req, res, next) {
		try {
			const role = await roleService.saveRole(req.body.role)
			return res.json(role)
		} catch (err) {
			next(ApiError.BadRequest(err.message))
		}
	}

	async appointRole(req, res, next) {
		try {
			const { userId, roleId } = req.body
			const role = await roleService.appointRole(userId, roleId)
			return res.json(role)
		} catch (err) {
			next(ApiError.BadRequest(err.message))
		}
	}

	async getAllRoles(req, res, next) {
		try {
			const roles = await roleService.getAll()
			return res.json(roles)
		} catch (err) {
			next(ApiError.BadRequest(err.message))
		}
	}
}

module.exports = new RoleController()
