const Router = require("express").Router

const authRouter = require("./authRouter")
const roleRouter = require("./roleRouter")
const deviceRouter = require("./deviceRouter")
const categoryRouter = require("./categoryRouter")
const brandRouter = require("./brandRouter")
const commentRouter = require("./commentRouter")
const basketRouter = require("./basketRouter")
const favoritesRouter = require("./favoritesRouter")
const userRouter = require("./userRouter")
const slideRouter = require("./slideRouter")
const orderRouter = require("./orderRouter")

const router = new Router()

router.use(`/auth`, authRouter)
router.use(`/role`, roleRouter)
router.use(`/device`, deviceRouter)
router.use(`/category`, categoryRouter)
router.use(`/brand`, brandRouter)
router.use(`/comment`, commentRouter)
router.use(`/basket`, basketRouter)
router.use(`/favorites`, favoritesRouter)
router.use(`/user`, userRouter)
router.use(`/slide`, slideRouter)
router.use(`/order`, orderRouter)

module.exports = router
