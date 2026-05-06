const express = require("express");
const app = express();
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const MONGO_URL =  "mongodb://127.0.0.1:27017/wanderlust";
const ejsMate = require("ejs-mate");

const ExpressError = require("./utils/ExpressError.js");


const listingSchema = require("./schema.js")
const {reviewSchema} = require("./schema.js")
// or 
// const {listingSchema,reviewSchema} = require("./schema.js")


const Listing = require("./models/listing.js")
const Review = require("./models/review.js")

const path = require("path");
const ejs = require ("ejs");
const wrapAsync = require("./utils/wrapAsync.js");

const listings = require("./routes/listing.js")


main().then(()=>{
    console.log("DB Connected");
}).catch((err)=>{
    console.log(err);
})



async function main (){
    await mongoose.connect(MONGO_URL);
}

app.set("view engine" , "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine("ejs" , ejsMate);
app.use(express.static(path.join(__dirname , "/public")));

app.listen(8080 ,()=>{
    console.log("server is listening");
})

app.get("/" ,(req,res)=>{
    res.send("Root is working");

})

// app.get("/testing" , async (req,res)=>{
//     let sampleListing = new Listing ({
//         title:"My new Home",
//         description : "By the City",
//         price:2000000,
//         location : "Mumbai",
//         country:"India"
//     })
//      await sampleListing.save();
//     console.log ("sample is saved");
//     res.send("success ")

// })




const validateReview = (req,res,next)=>{
    let {error} = reviewSchema.validate(req.body) //joi :- validating upcoming data 
    if (error){
        let errMsg = error.details.map((el) =>el.message).join(",") //finding  exact message of error
    throw new ExpressError(400 , errMsg);
    }else{
        next(); //go to the NEXT middleware or route.
    }
}

// listings routes
app.use("/listings" ,listings);









// REVIEW
// post route
// since listing and review have one to many relation se we have to store review(obj id) in listing too!!!
app.post("/listings/:id/reviews",validateReview,wrapAsync(async(req , res)=>{
    let listing = await Listing.findById(req.params.id);

    // creating new review
    let newReview = new Review (req.body.review);

    // putting review into listing
    listing.reviews.push(newReview);

    await newReview.save();
    await listing.save();
    res.redirect(`/listings/${req.params.id}`);//redirecting to show page
    // or
    //  res.redirect(`/listings/${listing._id}`);


}));


// delete review route
app.delete("/listings/:id/reviews/:reviewId", async(req,res)=>{
    let {id , reviewId} = req.params;

    // update not delete because we are not deleting the listing we are updating it by deleting its review
    await Listing.findByIdAndUpdate(id,  {$pull : {reviews : reviewId}})
    await Review.findByIdAndDelete(reviewId);
    res.redirect(`/listings/${id}`);


})








// for all other routes except above
app.use((req,res,next)=>{
    next(new ExpressError (404 ," Page not found!"))
})

// error handling middleware
app.use((err,req,res,next)=>{
   let {statusCode = 500 , message = "something went wrong"} = err;
   console.log(err);
    res.status(statusCode).render("listings/error.ejs" , {message});
})