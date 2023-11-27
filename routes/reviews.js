const express = require("express")
const router = express.Router({mergeParams: true})
const Listing = require("../models/listing.js")
const wrapAsync = require("../utils/wrapAsync.js")
const ExpressError = require("../utils/expresserror.js")
const Review = require("../models/review.js")
const {isLoggedIn, isReviewAuthor} = require("../middelware.js")
const {validateReview} = require("../middelware.js")

const reviewController = require("../controllers/review.js");

//post review route
router.post("/" ,validateReview,isLoggedIn, wrapAsync(reviewController.postReview))


// delete review
router.delete("/:reviewId" ,isLoggedIn ,isReviewAuthor, wrapAsync(reviewController.deleteReview))

module.exports = router;
 

