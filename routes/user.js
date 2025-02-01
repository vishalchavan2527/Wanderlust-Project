const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middelwear.js");

const usersControllers = require("../controllers/users.js");

router.route("/signup")
.get( usersControllers.renderSignupForm)
.post( wrapAsync(usersControllers.signup))



router.route("/login")
.get( usersControllers.rendernLoginForm)
.post(
  saveRedirectUrl,
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
  }),
  usersControllers.login
);



router.get("/logout" ,usersControllers.logout)

module.exports = router;
