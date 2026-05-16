const express = require("express");
const router = express.Router({mergeParams: true});

const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const Review = require("../models/review.js")
const Listing = require("../models/listing.js")
const {reviewSchema} = require("../schema.js");
const {validateReview , isLoggedIn , isReviewAuthor} = require("../middleware.js")
const reviewController = require("../controllers/review.js");






// post route
router.post(
    "/",
    validateReview ,
    isLoggedIn,
     wrapAsync(reviewController.createReview)
);


// delete review route
router.delete(
    "/:reviewId", 
    isLoggedIn,
     isReviewAuthor,
      reviewController.destroyReview
);

module.exports = router;