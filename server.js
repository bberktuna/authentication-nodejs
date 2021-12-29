require("dotenv").config({ path: "./config.env" })
const express = require("express")
const connectDB = require("./config/db")

//! connect db
connectDB()

const app = express()
app.use(express.json()) //! allows us to get data from body

app.use("/api/auth", require("./routes/auth"))

const PORT = process.env.PORT || 5000
const server = app.listen(PORT, () => console.log(`running on port ${PORT}`))

process.on("unhandledRejection", (err, promise) => {
  console.log(`Logged error: ${err}`)
  server.close(() => process.exit(1))
})
