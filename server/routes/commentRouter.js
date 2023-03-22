const Router = require("express").Router
const commentController = require("../controllers/commentController")
const roleMiddleware = require("../middleware/roleMiddleware")

const router = new Router()

router.post(`/`, roleMiddleware(["user"]), commentController.createComment)
router.get(`/`, commentController.getCommentByDevice)
router.delete(`/:id`, roleMiddleware(["admin"]), commentController.deleteComment)

module.exports = router
