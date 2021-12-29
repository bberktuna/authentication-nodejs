const express = require("express")
const router = express.Router()

const {
  register,
  login,
  forgotPassword,
  resetPassword,
} = require("../controllers/auth")

//router.route("/register").post()
router.post("/register", register)

router.post("/login", login)

router.post("/forgotPassword", forgotPassword)

//router.route("/resetPassword/:resetToken").post(resetPassword)
router.put("/resetPassword/:resetToken", resetPassword)

module.exports = router
