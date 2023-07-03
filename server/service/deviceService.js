const uuid = require("uuid")
const path = require("path")
const { Op } = require("sequelize")
const fs = require("fs")
const { Device, Img, DeviceInfo, Rating } = require("../models/models")
const ApiError = require("../errors/apiError")
const favoritesService = require("./favoritesService")
const orderService = require("../service/orderService")
const basketService = require("./basketService")
const commentService = require("./commentService")

class DeviceService {
	async create(name, description, price, rating, categoryId, img, brandId) {
		if (!fs.existsSync(path.resolve(__dirname, "..", "static"))) {
			fs.mkdirSync(path.resolve(__dirname, "..", "static"))
		}
		const fileName = uuid.v4() + ".jpg"
		img.mv(path.resolve(__dirname, "..", "static", fileName))
		const device = await Device.create({ name, description, price, rating, categoryId, img: fileName, brandId })
		return device
	}

	async update(device, name, description, price, rating, categoryId, brandId, id) {
		const data = await device.update({ name, description, price, rating, categoryId, brandId },{ where: { id } })
		data.save()
		return data
	}

	async getByCategory(categoryId, brandId, limit, offset, sort, max, min) {
		const [sortOption, sortOrder] = sort.split(`:`)
		let data
		if (brandId) {
			data = await Device.findAndCountAll({
				where: { categoryId, brandId, price: { [Op.and]: { [Op.gte]: min, [Op.lte]: max } } }, distinct: true,
				limit, offset, order: [[sortOption, sortOrder]]})
		} else {
			data = await Device.findAndCountAll({
				where: { categoryId, price: { [Op.and]: { [Op.gte]: min, [Op.lte]: max } } }, distinct: true,
				limit, offset, order: [[sortOption, sortOrder]]})
		}
		return data
	}

	async searchDevices(search, brandId, limit, offset, sort, max, min) {
		const [sortOption, sortOrder] = sort.split(`:`)
		let devices

		if (brandId) {
			devices = await Device.findAndCountAll({
				distinct: true,
				where: { name: { [Op.iLike]: "%" + search + "%" }, price: { [Op.and]: { [Op.gte]: min, [Op.lte]: max } }, brandId},
				limit, offset, order: [[sortOption, sortOrder]]
			})
		} else {
			devices = await Device.findAndCountAll({
				distinct: true,
				where: { name: { [Op.iLike]: "%" + search + "%" }, price: { [Op.and]: { [Op.gte]: min, [Op.lte]: max } }},

				limit,
				offset,
				order: [[sortOption, sortOrder]],
			})
		}
		return devices
	}

	async findById(id) {
		const data = await Device.findOne({
			include: [
				{
					model: Img,
					attributes: { exclude: ["createdAt", "updatedAt", "deviceId"] },
				},
				{
					model: DeviceInfo,
					attributes: { exclude: ["createdAt", "updatedAt", "deviceId"] },
				},
			],
			where: { id },
			order: [[DeviceInfo, "id", "DESC"], [Img, "id", "DESC"]],
		})
		return data
	}

	async createImg(img, deviceId) {
		const fileName = uuid.v4() + ".jpg"
		img.mv(path.resolve(__dirname, "..", "static", fileName))
		const data = await Img.create({ img: fileName, deviceId })
		return data
	}

	async deleteImg(id) {
		const image = await Img.findOne({ where: { id } })
		const file = await path.resolve(__dirname, "..", "static", image.img)
		await Img.destroy({ where: { id } })
		fs.unlink(file, err => {
			if (err !== null) {
				console.log(err)
			}
		})
	}

	async updateImg(id, img) {
		const device = await Device.findOne({ where: { id } })
		fs.unlink(path.resolve(__dirname, "..", "static", device.img), err => {
			if (err !== null) {
				console.log(err)
			}
		})
		const fileName = (await uuid.v4()) + ".jpg"
		const data = await device.update({ img: fileName }, { where: { id } })
		await data.save()
		img.mv(path.resolve(__dirname, "..", "static", fileName))
		return data
	}

	async createInfo(deviceId, key, value) {
		const data = await DeviceInfo.create({ deviceId, key, value })
		return data
	}

	async deleteInfo(id) {
		await DeviceInfo.destroy({ where: { id } })
	}

	async deleteMainImg(id) {
		const device = await Device.findOne({ where: { id } })
		const file = await path.resolve(__dirname, "..", "static", device.img)
		fs.unlink(file, err => {
			if (err !== null) {
				console.log(err)
			}
		})
	}

	async deleteDevice(id) {
		const images = Img.findAll({ where: { deviceId: id } })
		;(await images).forEach(img => this.deleteImg(img.id))
		this.deleteMainImg(id)

		await orderService.deleteByDeviceId(id)
		await favoritesService.deleteByDeviceId(id)
		await basketService.deleteByDeviceId(id)
		await commentService.deleteByDeviceId(id)
		await Rating.destroy({ where: { deviceId: id } })
		await DeviceInfo.destroy({ where: { deviceId: id } })
		await Device.destroy({ where: { id } })
	}

	async calculateRating(deviceId) {
		const ratings = await Rating.findAndCountAll({ where: { deviceId } })
		let rating = 0
		await ratings.rows.forEach(item => (rating += Number(item.rating)))
		rating = await Math.round(rating / ratings.count)
		await Device.update({ rating }, { where: { id: deviceId } })
		return rating
	}

	async addRating(deviceId, userId, rating) {
		const check = await Rating.findOne({
			where: { [Op.and]: [{ deviceId }, { userId }] },
		})
		if (!check) {
			await Rating.create({ deviceId, userId, rating })
			const data = await this.calculateRating(deviceId)
			return data
		} else {
			throw ApiError.BadRequest(`Rating has already been left.`)
		}
	}

	async getRating(deviceId) {
		const data = await Rating.findAndCountAll({
			attributes: { exclude: ["userId", "deviceId"] },
			where: { deviceId },
		})
		return data
	}

	async getPrice(categoryId, search) {
		let max
		let min
		if (search) {
			 max = await Device.max("price",  { where: { name: { [Op.iLike]: "%" + search + "%" }} })
			 min = await Device.min("price",  { where: { name: { [Op.iLike]: "%" + search + "%" }} })
		} else {
			max = await Device.max("price", { where: { categoryId } })
			min = await Device.min("price", { where: { categoryId } })
		}
		return { min, max }
	}

	async getRecommendedDevice() {
		return await Device.findAll({
			where: { recommended: true },
			order: [["createdAt", "DESC"]]
		})
	}

	async changeRecommended(id, recommended) {
		return await Device.update({ recommended }, { where: { id } })
	}

}

module.exports = new DeviceService()
