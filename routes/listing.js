const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const { isLoggedIn, isOwner, validateListing } = require("../middelwear.js");
const listingControllers = require("../controllers/listings.js")
const multer  = require('multer')
const {storage} = require("../cloudConfig.js");
const upload = multer({storage })


router.route("/")
  .get(
  wrapAsync(listingControllers.index))
  .post(
    isLoggedIn,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingControllers.createListing));

 // New Rount

   router.get("/new", isLoggedIn, listingControllers.renderNewFrom);


router.route("/:id")
.get(wrapAsync(listingControllers.showListing))
.put(
  isLoggedIn,
  isOwner,
  upload.single("listing[image]"),
  validateListing,
  wrapAsync(listingControllers.upadateListing))
  .delete(
    isLoggedIn,
    isOwner,
    wrapAsync(listingControllers.destroyListing))



// Edit Route

router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(listingControllers.renderEditFrom));


module.exports = router;
