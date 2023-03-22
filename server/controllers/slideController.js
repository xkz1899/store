const ApiError = require("../errors/apiError")
const slideService = require("../service/slideService")

class SlideController {
	async getAllSlide(req, res, next) {
		try {
			const data = await slideService.getAll()
			res.json(data)
		} catch (err) {
			next(ApiError.BadRequest(err.message))
		}
	}

	async createSlide(req, res, next) {
		try {
			const { url } = req.body
			const { img } = req.files
			const data = await slideService.create(img, url)
			res.json(data)
		} catch (err) {
			next(ApiError.BadRequest(err.message))
		}
	}

	async deleteSlide(req, res, next) {
		try {
			const { id } = req.params
			await slideService.deleteSlide(id)
			res.json({ message: `Slide deleted.` })
		} catch (err) {
			next(ApiError.BadRequest(err.message))
		}
	}
}

module.exports = new SlideController()
