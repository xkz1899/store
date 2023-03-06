require("dotenv").config()
const express = require("express")
const cors = require("cors")
const fileUpload = require("express-fileupload")
const cookieParser = require("cookie-parser")
const path = require("path")

require("./models/models")
const sequelize = require("./db")
const router = require("./routes")
const errorMiddleware = require("./middleware/errorMiddleware")

const PORT = process.env.PORT || 5000
const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(
	cors({
		credentials: true,
		origin: process.env.CLIENT_URL,
	})
)
app.use(express.static(path.resolve(__dirname, "static")))
app.use(fileUpload({}))
app.use(`/api`, router)
app.use(errorMiddleware)

const start = () => {
	try {
		sequelize.authenticate()
		sequelize.sync({ alter: true })
		app.listen(PORT, () =>
			console.log(`Server started and work at ${PORT} port...`)
		)
	} catch (err) {
		console.log(err)
	}
}

start()
