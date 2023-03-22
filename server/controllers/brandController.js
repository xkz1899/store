const brandService = require("../service/brandService")
const ApiError = require("../errors/apiError")

class BrandController {
	async createBrand(req, res, next) {
		try {
			const { name, categoryId } = req.body
			const brand = await brandService.create(name, categoryId)
			res.json(brand)
		} catch (err) {
			next(ApiError.BadRequest(err.message))
		}
	}
	async getByCategory(req, res, next) {
		try {
			const { categoryId } = req.query
			const brands = await brandService.getAll(categoryId)
			res.json(brands)
		} catch (err) {
			next(ApiError.BadRequest(err.message))
		}
	}
	async updateBrand(req, res, next) {
		try {
			const { id, name } = req.body
			const brand = await brandService.update(id, name)
			res.json(brand)
		} catch (err) {
			next(ApiError.BadRequest(err.message))
		}
	}
	
	async deleteBrand(req, res, next) {
		try {
			const { id } = req.params
			await brandService.deleteBrand(id)
			res.json({message: "Brand deleted."})
		}
		catch (err) {
		next(ApiError.BadRequest(err.message))
		}
	}

}

module.exports = new BrandController()
 