const { Slider } = require("../models/models")
const uuid = require("uuid")
const path = require("path")
const fs = require("fs")

class SlideService {
	async getAll() {
		const data = await Slider.findAndCountAll()
		return data
	}

	async create(img, url) {
		const fileName = uuid.v4() + ".jpg"
		img.mv(path.resolve(__dirname, "..", "static", fileName))
		const device = await Slider.create({ img: fileName, url })
		return device
	}

	async deleteSlide(id) {
		const slide = await Slider.findOne({ where: { id } })
		const img = await path.resolve(__dirname, "..", "static", slide.img)
		fs.unlink(img, err => {
			if (err !== null) {
				console.log(err)
			}
		})
		await Slider.destroy({ where: { id } })
	}
}

module.exports = new SlideService()
