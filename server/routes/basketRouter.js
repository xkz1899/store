const Router = require("express").Router
const basketController = require("../controllers/basketController")
const roleMiddleware = require("../middleware/roleMiddleware")

const router = new Router()

router.post(`/`, roleMiddleware(["user"]), basketController.addDevice)
router.get(`/`, roleMiddleware(["user"]), basketController.getAll)
router.delete(`/`, roleMiddleware(["user"]), basketController.deleteDevice)
router.delete(`/clear`, roleMiddleware(["user"]), basketController.clearBasket)

module.exports = router
