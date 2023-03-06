const ApiError = require("../errors/apiError")
const commentService = require("../service/commentService")

class CommentController {
	async createComment(req, res, next) {
		try {
			const { deviceId, userId, message } = req.body
			const data = await commentService.create(deviceId, userId, message)
			res.json(data)
		} catch (err) {
			next(ApiError.BadRequest(err.message))
		}
	}

	async getCommentByDevice(req, res, next) {
		try {
			const { id, page = 1, limit = 5 } = req.query
			let offset = page * limit - limit
			const data = await commentService.findById(id, limit, offset)
			res.json(data)
		} catch (err) {
			next(ApiError.BadRequest(err.message))
		}
	}

	async deleteComment(req, res, next) {
		try {
			const { id } = req.params
			await commentService.deleteComment(id)
			res.json({ message: `Comment deleted.` })
		} catch (err) {
			next(ApiError.BadRequest(err.message))
		}
	}
}

module.exports = new CommentController()
