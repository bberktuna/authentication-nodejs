require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const cookieParser = require("cookie-parser")
const fileUpload = require("express-fileupload")
const connectDB = require("./config/db")

connectDB()

const app = express()

app.use(express.json()) //! allows us to get data from body
app.use(cors())
app.use(cookieParser())
app.use(
  fileUpload({
    useTempFiles: true,
  })
)
//! ROUTES
app.use("/user", require("./routes/userRouter"))

app.use("/", (req, res, next) => {
  res.json({ msg: "hello " })
})

//app.use(errorHandler) //! error handler (should be last piece of middleware)

const PORT = process.env.PORT || 5000
const server = app.listen(PORT, () => console.log(`running on port ${PORT}`))
