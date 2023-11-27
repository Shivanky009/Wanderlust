const express = require("express");
const wrapAsync = require("../utils/wrapAsync");
const router = express.Router()
const User = require("../models/user.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middelware.js");

const userController = require("../controllers/user.js")

// signup form
router.get("/signup" , userController.renderSignup );

router.post("/signup" , userController.signup);

// login form
router.get("/login" , userController.renderLogin);

router.post("/login",
       saveRedirectUrl,
       passport.authenticate('local', 
       { failureRedirect: '/login', 
       failureFlash: true }), 
       userController.login
       )

// logout
router.get("/logout" , userController.logout)

module.exports = router;