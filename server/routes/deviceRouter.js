const Router = require("express").Router
const deviceController = require("../controllers/deviceController")
const roleMiddleware = require("../middleware/roleMiddleware")

const router = new Router()

router.post(`/`, roleMiddleware(["admin"]), deviceController.createDevice)
router.get(`/`, deviceController.getDeviceByCategory)
router.patch(`/`, roleMiddleware(["admin"]), deviceController.updateDevice)
router.get(`/recommended`, deviceController.getRecommendedDevice)
router.patch(`/recommended`, roleMiddleware(["admin"]), deviceController.changeRecommendedDevice)
router.get(`/price`, deviceController.getPrice)
router.delete(`/:id`, roleMiddleware(["admin"]), deviceController.deleteDevice)
router.post(`/rating`, roleMiddleware(["user"]), deviceController.addRating)
router.get(`/rating/:deviceId`, deviceController.getRating)
router.get(`/search`, deviceController.getDeviceSearch)
router.get(`/:id`, deviceController.getDeviceById)
router.post(`/img`, roleMiddleware(["admin"]), deviceController.createImg)
router.patch(`/img`, roleMiddleware(["admin"]), deviceController.updateImg)
router.delete(`/img/:id`, roleMiddleware(["admin"]), deviceController.deleteImg)
router.post(`/info`, roleMiddleware(["admin"]), deviceController.createDeviceInfo)
router.delete(`/info/:id`, roleMiddleware(["admin"]), deviceController.deleteDeviceInfo)

module.exports = router
