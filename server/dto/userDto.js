module.exports = class UserDto {
	id
	email
	login
	roles
	ban
	banMessage
	constructor(model) {
		this.id = model.id
		this.email = model.email
		this.login = model.login
		this.roles = model.roles
		this.ban = model.ban
		this.banMessage = model.ban_message
	}
}
