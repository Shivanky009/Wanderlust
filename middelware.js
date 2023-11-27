const Review = require("./models/review.js")
const Listing = require("./models/listing.js")
const ExpressError = require("./utils/expresserror.js")
const {listingSchema , reviewSchema} = require("./schema.js")

module.exports.isLoggedIn = (req,res,next) => {
    if(!req.isAuthenticated()) {
      req.session.redirectUrl = req.originalUrl
        req.flash("error" , "you must be Logged in")
        return res.redirect("/login")
     }
     next()
}

module.exports.saveRedirectUrl = (req,res,next) => {
   if(req.session.redirectUrl) {
      res.locals.redirectUrl = req.session.redirectUrl;
   }
   next()
}

module.exports.validateListing = (req,res,next) => {
  
    let {error} = listingSchema.validate(req.body);
     if(error) {
        throw new ExpressError(400 ,error)
    } else {
        next();
    }
 }



 module.exports.validateReview = (req,res,next) => {
   let {error} = reviewSchema.validate(req.body);
    if(error) {
       throw new ExpressError(400 ,error)
   } else {
       next();
   }
}

module.exports.isReviewAuthor =  async(req,res,next) => {
   let {id , reviewId} = req.params;
    let review = await Review.findById(reviewId)
    if(!review.author.equals(res.locals.currUser._id)) {
     req.flash("error" , "you cannot delete this review")
    return res.redirect(`/listings/${id}`)
    }
    next()
 }