import { IUser } from "./../models/IUser"

export const roleChecking = (arr: Array<string>, user: IUser): boolean => {
	let access = false
	user.roles.forEach(role => {
		if (arr.includes(role.role)) {
			access = true
		}
	})
	return access
}
