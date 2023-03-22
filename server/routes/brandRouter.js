const Router = require("express").Router
const brandController = require("../controllers/brandController")
const roleMiddleware = require("../middleware/roleMiddleware")

const router = new Router()

router.post(`/`, roleMiddleware(["admin"]), brandController.createBrand)
router.get(`/`, brandController.getByCategory)
router.patch(`/`, roleMiddleware(["admin"]), brandController.updateBrand)
router.delete(`/:id`, roleMiddleware(["admin"]), brandController.deleteBrand)

module.exports = router
