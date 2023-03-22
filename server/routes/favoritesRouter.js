const Router = require("express").Router
const favoritesController = require("../controllers/favoritesController")
const roleMiddleware = require("../middleware/roleMiddleware")

const router = new Router()

router.post(`/`, roleMiddleware(["user"]), favoritesController.addDevice)
router.get(`/`, roleMiddleware(["user"]), favoritesController.getAll)
router.delete(`/:id`, roleMiddleware(["user"]), favoritesController.deleteDevice)

module.exports = router
