const ApiError = require("../errors/apiError")
const { Brand } = require("../models/models")

class BrandService {
	async create(name, categoryId) {
		return await Brand.create({ name, categoryId })
	}

	async getAll(categoryId) {
		return await Brand.findAll({ where: { categoryId } })
	}

	async update(id, name) {
		const brand = await Brand.findOne({ where: { id } })
		brand.update({ name })
		brand.save()
		return brand
	}

	async deleteBrand(id) {
		await Brand.destroy({ where: { id } })
	}
}

module.exports = new BrandService()
