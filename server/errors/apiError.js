module.exports = class ApiError extends Error {
	constructor(status, message) {
		super()
		this.status = status
		this.message = message
	}

	static BadRequest(message) {
		return new ApiError(400, message)
	}
	static Unauthorized() {
		return new ApiError(401, "User unauthorized.")
	}
}
