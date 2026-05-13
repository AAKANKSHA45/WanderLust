const express = require("express");
const router = express.Router({mergeParams: true});

const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const Review = require("../models/review.js")
const Listing = require("../models/listing.js")
const {reviewSchema} = require("../schema.js");
const {validateReview , isLoggedIn , isReviewAuthor} = require("../middleware.js")






// post route
// since listing and review have one to many relation se we have to store review(obj id) in listing too!!!
router.post("/",validateReview ,isLoggedIn, wrapAsync(async(req , res)=>{
    let listing = await Listing.findById(req.params.id);

    // creating new review
    let newReview = new Review (req.body.review);
    newReview.author = req.user._id;

    // putting review into listing
    listing.reviews.push(newReview);

    await newReview.save();
    await listing.save();
    req.flash("success" , "New Review Created!")
    res.redirect(`/listings/${req.params.id}`);//redirecting to show page
    // or
    //  res.redirect(`/listings/${listing._id}`);


}));


// delete review route
router.delete("/:reviewId", isLoggedIn, isReviewAuthor, async(req,res)=>{
    let {id , reviewId} = req.params;

    // update not delete(for listing) because we are not deleting the listing we are updating it by deleting its review
    await Listing.findByIdAndUpdate(id,  {$pull : {reviews : reviewId}})
    await Review.findByIdAndDelete(reviewId);
    req.flash("success" , "Review Deleted!")
    res.redirect(`/listings/${id}`);


})

module.exports = router;