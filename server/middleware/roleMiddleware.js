const ApiError = require("../errors/apiError")
const tokenService = require("../service/tokenService")

module.exports = function (roles) {
	return function (req, res, next) {
		if (req.method === "OPTIONS") {
			next()
		}
		try {
			const accessToken = req.headers.authorization.split(" ")[1]
			if (!accessToken) return next(ApiError.Unauthorized())

			const decoded = tokenService.verifyAccessToken(accessToken)
			let hasRole = false
			decoded.roles.forEach(role => {
				if (roles.includes(role.role)) hasRole = true
			})
			if (!hasRole)
				return next(ApiError.BadRequest("Insufficient access level."))

			req.user = decoded
			next()
		} catch (err) {
			return next(ApiError.Unauthorized())
		}
	}
}
