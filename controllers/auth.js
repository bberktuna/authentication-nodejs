const User = require("../models/User")
const bcrypt = require("bcryptjs")

exports.register = async (req, res, next) => {
  const { email, password } = req.body
  try {
    //! check if email exists
    let emailExists = await User.findOne({ email })
    if (emailExists) {
      return res
        .status(400)
        .json({ errors: [{ msg: "Emailll already exists" }] })
    }
    //! create and save new user and hash the password
    const hashedPassword = await bcrypt.hash(password, 10)
    user = new User({
      email,
      password: hashedPassword,
    })
    await user.save()
    res.send(user)
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    })
  }
}

exports.login = async (req, res, next) => {
  const { email, password } = req.body

  try {
    const user = await User.findOne({ email })
    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch || !user || !email || !password) {
      res.status(404).json({ error: "Invalid credentials" })
    }

    res.status(200).json({ user, token: "21321" })
  } catch (error) {}
}

exports.forgotPassword = (req, res, next) => {
  res.send("forgotPassword")
}

exports.resetPassword = (req, res, next) => {
  res.send("resetPassword route")
}
