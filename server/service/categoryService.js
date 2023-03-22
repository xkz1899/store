const { Category, CategoryFilter, Filter } = require("../models/models")

class CategoryService {
	async create(name) {
		const category = await Category.create({ name })
		return category
	}

	async getAll() {
		return await Category.findAll({
			order: [["id", "ASC"]],
		})
	}

	async connectFilterToCategory(filterId, categoryId) {
		return await CategoryFilter.create({ filterId, categoryId })
	}

	async update(id, name) {
		const data = await Category.update({ name }, { where: { id } })
		return data
	}

	async getAllFiltersInCategory(id) {
		return await Category.findOne({
			include: {
				model: Filter,
				attributes: { exclude: ["createdAt", "updatedAt"] },
				through: {
					attributes: [],
				},
			},

			where: { id },
		})
	}

	async deleteCategory(id) {
		await Category.destroy({ where: { id } })
	}
}

module.exports = new CategoryService()
