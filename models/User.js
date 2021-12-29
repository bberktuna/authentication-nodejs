const mongoose = require("mongoose")
const validator = require("mongoose-validator")

const UserSchema = mongoose.Schema({
  email: {
    type: String,
    lowercase: true,
    trim: true,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    minlength: 6,
    trim: true,
    required: [true, "please provide a password"],
    //select: false,
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
})

const User = mongoose.model("User", UserSchema)

module.exports = User
