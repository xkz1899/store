const userService = require("../service/userService")
const ApiError = require("../errors/apiError")

class UserController {
	async getAllUser(req, res, next) {
		try {
			const { page = 1, limit = 9 } = req.query
			let offset = page * limit - limit
			const users = await userService.getAll(limit, offset)
			res.json(users)
		} catch (err) {
			next(ApiError.BadRequest(err.message))
		}
	}

	async searchUser(req, res, next) {
		try {
			const { search, page = 1, limit = 9 } = req.query
			let offset = page * limit - limit
			const users = await userService.search(search, limit, offset)
			res.json(users)
		} catch (err) {
			next(ApiError.BadRequest(err.message))
		}
	}

	async bannedUser(req, res, next) {
		try {
			const { id, ban, message } = req.body
			await userService.banUser(id, ban, message)
			res.json({ message: `User banned.` })
		} catch (err) {
			next(ApiError.BadRequest(err.message))
		}
	}
}

module.exports = new UserController()
