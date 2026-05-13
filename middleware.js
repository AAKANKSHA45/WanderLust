 const Listing = require("./models/listing.js");
 const ExpressError = require("./utils/ExpressError.js");
 const listingSchema = require("./schema.js");
 const {reviewSchema} = require("./schema.js");
 const Review = require("./models/review.js")



//  we have created a fn isLoggedIn
 module.exports.isLoggedIn = (req ,res,next)=>{
    // console.log(req.user);
    if(!req.isAuthenticated()){
        req.session.redirectUrl = req.originalUrl;
        req.flash("error" , "You must logged in!")
        return res.redirect("/login")
    }
    next();
 }


 module.exports.saveRedirectUrl = (req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl
    }
    next();
 }

// authorization
 module.exports.isOwner = async (req , res , next) =>{
    let {id} = req.params;
    let listing = await Listing.findById(id);
    if(!listing.owner._id.equals(res.locals.currUser._id)){
        req.flash("error" , " You are not Owner of this listing");
        return res.redirect(`/listings/${id}`);
    }
    next()

 }

 module.exports.validateListing = (req,res,next)=>{
     let {error} = listingSchema.validate(req.body) //joi :- validating upcoming data 
     if (error){
         let errMsg = error.details.map((el) =>el.message).join(",") //finding  exact message of error
     throw new ExpressError(400 , errMsg);
     }else{
         next(); //go to the NEXT middleware or route.
     }
 }

 module.exports.validateReview = (req,res,next)=>{
     let {error} = reviewSchema.validate(req.body) //joi :- validating upcoming data 
     if (error){
         let errMsg = error.details.map((el) =>el.message).join(",") //finding  exact message of error
     throw new ExpressError(400 , errMsg);
     }else{
         next(); //go to the NEXT middleware or route.
     }
 }
// authorization
 module.exports.isReviewAuthor = async (req , res , next) =>{
    let {id , reviewId} = req.params;
    let review = await Review.findById(reviewId);
    if(!review.author._id.equals(res.locals.currUser._id)){
        req.flash("error" , " You are not Author of this review");
        return res.redirect(`/listings/${id}`);
    }
    next()

 }
 