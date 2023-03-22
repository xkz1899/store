const Router = require("express").Router
const userController = require("../controllers/userController")
const roleMiddleware = require("../middleware/roleMiddleware")

const router = new Router()

router.get(`/`, roleMiddleware([`admin`]), userController.getAllUser)
router.patch(`/`, roleMiddleware([`admin`]), userController.bannedUser)
router.get(`/search`, roleMiddleware([`admin`]), userController.searchUser)

module.exports = router
