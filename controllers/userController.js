const User = require("../models/User")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const sendMail = require("./sendMail")

const userController = {
  register: async (req, res) => {
    try {
      const { email, password } = req.body
      const emailExists = await User.findOne({ email })
      if (!email || !password) {
        return res.status(400).json({ msg: "Please fill the empty fields." })
      }
      if (!validateEmail(email)) {
        return res.status(400).json({ msg: "Please provide a valid email." })
      }
      if (emailExists) {
        return res.status(400).json({ msg: "Email already exists." })
      }
      if (password.length < 6) {
        return res
          .status(400)
          .json({ msg: "Password must be at least 6 characters." })
      }
      const hashedPassword = await bcrypt.hash(password, 12)
      const newUser = {
        email,
        password: hashedPassword,
      }
      const activation_token = createActivationToken(newUser)
      const url = `${process.env.CLIENT_URL}/user/activate/${activation_token}`

      sendMail(email, url)

      res.json({
        msg: "Registered successfully. Please activate your email to begin.",
      })
    } catch (err) {
      return res.status(500).json({ msg: err.message })
    }
  },
}

const validateEmail = (email) => {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  )
}

const createActivationToken = (payload) => {
  return jwt.sign(payload, process.env.ACTIVATION_TOKEN_SECRET, {
    expiresIn: "5m",
  })
}

const createAccesToken = (payload) => {
  return jwt.sign(payload, process.env.ACCES_TOKEN_SECRET, {
    expiresIn: "15m",
  })
}
const createRefreshToken = (payload) => {
  return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  })
}

module.exports = userController
