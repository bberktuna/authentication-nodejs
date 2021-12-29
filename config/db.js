const mongoose = require("mongoose")

const connectDB = async () => {
  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    // userCreateIndex: true,
    useUnifiedTopology: true,
    // useFindAndModify: true,
  })
  console.log("MONGODB CONNECTED !")
}

module.exports = connectDB
