const Router = require("express").Router
const slideController = require("../controllers/slideController")
const roleMiddleware = require("../middleware/roleMiddleware")

const router = new Router()

router.get(`/`, slideController.getAllSlide)
router.post(`/`, roleMiddleware([`admin`]), slideController.createSlide)
router.delete(`/:id`, roleMiddleware([`admin`]), slideController.deleteSlide)

module.exports = router
