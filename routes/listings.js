const express = require("express")
const router = express.Router()
const wrapAsync = require("../utils/wrapAsync.js")
const Listing = require("../models/listing.js")
const {isLoggedIn , validateListing} = require("../middelware.js")
const listingController = require("../controllers/listing.js");
const multer  = require('multer')
const {storage} = require("../cloudconfig.js")
const upload = multer({ storage })
 

// index route
router.get("/",wrapAsync(listingController.index));


// new route
router.get("/new",isLoggedIn, listingController.renderNewForm)


// show route
router.get("/:id" ,wrapAsync(listingController.showListing));

 // create route
router.post("/",upload.single("listing[image]"),validateListing, wrapAsync(listingController.createListing))

// edit route
router.get("/:id/edit" ,isLoggedIn,wrapAsync(listingController.renderEditForm))

// update route
router.put("/:id",upload.single("listing[image]"), wrapAsync(listingController.updateListing))

// delete route
router.delete("/:id",isLoggedIn, wrapAsync(listingController.deleteListing))

module.exports = router;