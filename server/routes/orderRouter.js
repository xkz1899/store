const Router = require("express").Router
const orderController = require("../controllers/orderController")
const roleMiddleware = require("../middleware/roleMiddleware")

const router = new Router()

router.post(`/`, roleMiddleware([`user`]), orderController.createOrder)
router.post(`/device`, roleMiddleware([`user`]), orderController.addDevice)
router.get(`/`, roleMiddleware([`admin`]), orderController.getByOrder)
router.delete(`/:id`, roleMiddleware([`admin`]), orderController.deleteOrder)

module.exports = router
