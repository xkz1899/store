const categoryService = require("../service/categoryService")
const ApiError = require("../errors/apiError")

class CategoryController {
	async createCategory(req, res, next) {
		try {
			const { name } = req.body
			const category = await categoryService.create(name)
			res.json(category)
		} catch (err) {
			next(ApiError.BadRequest(err.message))
		}
	}

	async updateCategory(req, res, next) {
		try {
			const { id, name } = req.body
			const data = await categoryService.update(id, name)
			res.json(data)
		} catch (err) {
			next(ApiError.BadRequest(err.message))
		}
	}

	async getAllCategory(req, res, next) {
		try {
			const category = await categoryService.getAll()
			res.json(category)
		} catch (err) {
			next(ApiError.BadRequest(err.message))
		}
	}

	async deleteCategory(req, res, next) {
		try {
			const { id } = req.params
			await categoryService.deleteCategory(id)
			res.json({ message: `Category deleted.` })
		} catch (err) {
			next(ApiError.BadRequest(err.message))
		}
	}
}

module.exports = new CategoryController()
