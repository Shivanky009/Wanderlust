const User = require("../models/user.js");

module.exports.renderSignup = (req,res) => {
    res.render("user/signup.ejs")
}

module.exports.signup = async(req,res) => {
    let {username , email , password} = req.body;
    const newUser = new User({email , username })
   const RegisteredUser = await User.register(newUser , password)
   console.log(RegisteredUser)
   req.login(RegisteredUser, (err) => {
    if(err) {
        return next (err)
    }
    req.flash("success" , "Welcome to Wanderlust")
    res.redirect("/listings")
   })
  }

  module.exports.renderLogin =  (req,res) => {
    res.render("user/login.ejs")
}

module.exports.login = async(req,res) => {
    req.flash("success" , "Welcome to Wanderlust , you're logged in")
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl)

}

module.exports.logout = (req,res,next) => {
    req.logout((err) => {
        if(err) {
            next(err)
        }
        req.flash("success" , "you're logged out!")
        res.redirect("/listings")
    })
}