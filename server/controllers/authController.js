const { validationResult } = require("express-validator")

const ApiError = require("../errors/apiError")
const authService = require("../service/authService")

class AuthController {
	async registration(req, res, next) {
		try {
			const errors = validationResult(req)
			if (!errors.isEmpty()) {
				return next(ApiError.BadRequest("Validation error", errors.array()))
			}
			const { email, password, login } = req.body
			const userData = await authService.registration(email, password, login)
			res.cookie(`refreshToken`, userData.refreshToken, {
				maxAge: 1000 * 60 * 60 * 24,
				httpOnly: true,
			})
			res.json(userData)
		} catch (err) {
			next(ApiError.BadRequest(err.message))
		}
	}
	async login(req, res, next) {
		try {
			const errors = validationResult(req)
			if (!errors.isEmpty()) {
				return next(ApiError.BadRequest("Validation error", errors.array()))
			}
			const { email, password } = req.body
			const userData = await authService.login(email, password)
			res.cookie(`refreshToken`, userData.refreshToken, {
				maxAge: 1000 * 60 * 60 * 24,
				httpOnly: true,
			})
			res.json(userData)
		} catch (err) {
			next(ApiError.BadRequest(err.message))
		}
	}
	async logout(req, res, next) {
		try {
			const { refreshToken } = req.cookies
			await authService.logout(refreshToken)
			res.clearCookie(`refreshToken`)
			res.json({ message: `Logout implemented.` })
		} catch (err) {
			next(ApiError.BadRequest(err.message))
		}
	}
	async refresh(req, res, next) {
		try {
			const { refreshToken } = req.cookies
			const userData = await authService.refresh(refreshToken)
			res.cookie(`refreshToken`, userData.refreshToken, {
				maxAge: 1000 * 60 * 60 * 24,
				httpOnly: true,
			})
			res.json(userData)
		} catch (err) {
			next(ApiError.BadRequest(err.message))
		}
	}
}

module.exports = new AuthController()
