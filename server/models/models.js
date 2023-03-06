const sequelize = require("../db")
const { DataTypes } = require("sequelize")

const User = sequelize.define(`user`, {
	id: { type: DataTypes.INTEGER, autoIncrement: true, unique: true, primaryKey: true },
	email: { type: DataTypes.STRING, unique: true, allowNull: false },
	password: { type: DataTypes.STRING, allowNull: false },
	login: { type: DataTypes.STRING, unique: true },
	ban: { type: DataTypes.BOOLEAN, defaultValue: false },
	ban_message: { type: DataTypes.TEXT },
})

const Token = sequelize.define(`token`, {
	id: { type: DataTypes.INTEGER, autoIncrement: true, unique: true, primaryKey: true },
	refresh_token: { type: DataTypes.TEXT, allowNull: false },
})

const Role = sequelize.define(`role`, {
	id: { type: DataTypes.INTEGER, autoIncrement: true, unique: true, primaryKey: true },
	role: { type: DataTypes.STRING },
})

const UserRole = sequelize.define(`user_role`, {
	id: { type: DataTypes.INTEGER, autoIncrement: true, unique: true, primaryKey: true },
})

const Category = sequelize.define(`category`, {
		id: { type: DataTypes.INTEGER, autoIncrement: true, unique: true, primaryKey: true },
		name: { type: DataTypes.STRING },
	}, { createdAt: false, timestamps: false	}
)

const Brand = sequelize.define(`brand`, {
		id: { type: DataTypes.INTEGER, autoIncrement: true, unique: true, primaryKey: true},
		name: { type: DataTypes.STRING},
	}, { createdAt: false, timestamps: false }
)

const Device = sequelize.define(`device`, {
	id: { type: DataTypes.INTEGER, autoIncrement: true, unique: true, primaryKey: true },
	name: { type: DataTypes.STRING },
	description: { type: DataTypes.TEXT },
	price: { type: DataTypes.INTEGER },
	rating: { type: DataTypes.INTEGER },
	img: { type: DataTypes.STRING },
	recommended: { type: DataTypes.BOOLEAN, defaultValue: false }
})

const DeviceInfo = sequelize.define(`device_info`, {
	id: { type: DataTypes.INTEGER, autoIncrement: true, unique: true, primaryKey: true },
	key: { type: DataTypes.STRING },
	value: { type: DataTypes.STRING },
})

const Rating = sequelize.define(`rating`, {
	id: { type: DataTypes.INTEGER, autoIncrement: true, unique: true, primaryKey: true },
	rating: { type: DataTypes.FLOAT },
})

const Comment = sequelize.define(`comment`, {
	id: { type: DataTypes.INTEGER, autoIncrement: true, unique: true, primaryKey: true },
	message: { type: DataTypes.TEXT },
})

const Img = sequelize.define(`img`, {
	id: { type: DataTypes.INTEGER, autoIncrement: true, unique: true, primaryKey: true },
	img: { type: DataTypes.TEXT },
})

const Basket = sequelize.define(`basket`, {
	id: { type: DataTypes.INTEGER, autoIncrement: true, unique: true, primaryKey: true },
})

const BasketDevice = sequelize.define(`basket_device`, {
	id: { type: DataTypes.INTEGER, autoIncrement: true, unique: true, primaryKey: true },
})

const Favorites = sequelize.define(`favorites`, {
	id: { type: DataTypes.INTEGER, autoIncrement: true, unique: true, primaryKey: true },
})

const Slider = sequelize.define(`slider` , {
	id: { type: DataTypes.INTEGER, autoIncrement: true, unique: true, primaryKey: true },
	url: { type: DataTypes.STRING, defaultValue: process.env.CLIENT_URL },
	img: { type: DataTypes.STRING }
})

const Order = sequelize.define(`order`, {
	id: { type: DataTypes.INTEGER, autoIncrement: true, unique: true, primaryKey: true },
	city: { type: DataTypes.STRING },
	street: { type: DataTypes.STRING },
	phone: { type: DataTypes.STRING }
})

const OrderDevice = sequelize.define(`order_device`, {
	id: { type: DataTypes.INTEGER, autoIncrement: true, unique: true, primaryKey: true },
}, { createdAt: false, timestamps: false })

//one => Device => many => OrderDevice
Device.hasMany(OrderDevice)
OrderDevice.belongsTo(Device)

//one => Order => many => OrderDevice
Order.hasMany(OrderDevice)
OrderDevice.belongsTo(Order)

//one => User => one => Order
User.hasOne(Order)
Order.belongsTo(User)

//one => User => one => Order
User.hasOne(Order)
Order.belongsTo(User)


//one => User => one => Favorites
User.hasOne(Favorites)
Favorites.belongsTo(User)

//one => FavoritesDevice => many => Device
Device.hasMany(Favorites)
Favorites.belongsTo(Device)

//one => Rating => many => User
User.hasMany(Rating)
Rating.belongsTo(User)

//one => Rating => many => Device
Device.hasMany(Rating)
Rating.belongsTo(Device)

//one => User => one => Basket
User.hasOne(Basket)
Basket.belongsTo(User)

//one => BasketDevice => many => Device
Device.hasMany(BasketDevice)
BasketDevice.belongsTo(Device)

//one => Basket => many => BasketDevice
Basket.hasMany(BasketDevice)
BasketDevice.belongsTo(Basket)

//one => User => many => Token
User.hasOne(Token)
Token.belongsTo(User)

//UserRole
User.belongsToMany(Role, { through: UserRole })
Role.belongsToMany(User, { through: UserRole })

//one => Brand => many => Device
Brand.hasMany(Device)
Device.belongsTo(Brand)

//one => Category => many => Brand
Category.hasMany(Brand)
Brand.belongsTo(Category)

//one => Device => many => DeviceInfo
Device.hasMany(DeviceInfo)
DeviceInfo.belongsTo(Device)

//one => Category => many => Device
Category.hasMany(Device)
Device.belongsTo(Category)

//one => Device => many => Comment
Device.hasMany(Comment)
Comment.belongsTo(Device)

//one => User => many => Comment
User.hasMany(Comment)
Comment.belongsTo(User)

//one => Device => many => Img
Device.hasMany(Img)
Img.belongsTo(Device)

//one => Device => many => Rating
Device.hasMany(Rating)
Rating.belongsTo(Device)

module.exports = {
	User,
	Role,
	Token,
	UserRole,
	Category,
	Brand,
	Device,
	DeviceInfo,
	Rating,
	Comment,
	Img,
	Basket,
	BasketDevice,
	Favorites,
	Slider,
	Order,
	OrderDevice,
}
