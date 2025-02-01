const express = require("express")
const router = express.Router({mergeParams : true});
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const { validateReview, isLoggedIn, isReviewAuthor, isDeleteIn } = require("../middelwear.js")

const reviewControllers = require("../controllers/reviews.js")

// Post Review Route
router.post(
    "/",
    isLoggedIn,
    validateReview,
    wrapAsync(reviewControllers.createReview)
  );

  
  // Delete Review Route
  router.delete(
    "/:reviewId",
    isDeleteIn,
    isReviewAuthor,
    wrapAsync(reviewControllers.destroyReview)
  );


  module.exports = router;