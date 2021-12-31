const mongoose = require("mongoose")

const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      lowercase: true,
      trim: true,
      unique: true,
      required: [true, "Please provide an email."],
    },
    password: {
      type: String,
      minlength: 6,
      trim: true,
      required: [true, "Please provide a password."],
      //select: false,
    },
    role: {
      type: Number,
      default: 0,
    },
    avatar: {
      type: String,
      default:
        "https://res.cloudinary.com/dgq8gsxqb/image/upload/v1640962936/avatar/shan_ccvpd1.png",
    },
  },
  { timestamps: true }
)

const User = mongoose.model("User", userSchema)

module.exports = User
