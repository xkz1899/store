const Router = require("express").Router
const categoryController = require("../controllers/categoryController")
const roleMiddleware = require("../middleware/roleMiddleware")

const router = new Router()

router.post(`/`, roleMiddleware(["admin"]), categoryController.createCategory)
router.put(`/`, roleMiddleware(["admin"]), categoryController.updateCategory)
router.get(`/`, categoryController.getAllCategory)
router.delete(`/:id`, roleMiddleware(["admin"]), categoryController.deleteCategory)

module.exports = router
