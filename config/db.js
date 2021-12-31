const mongoose = require("mongoose")

const connectDB = () =>
  mongoose.connect(
    "mongodb+srv://admin:KwvAipAF573ixVHf@cluster0.1ibyb.mongodb.net/authtentication?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    (err) => {
      if (err) throw err
      console.log("MONGODB CONNECTED !")
    }
  )

module.exports = connectDB
