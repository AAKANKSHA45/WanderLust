const express = require("express");
const app = express();
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const MONGO_URL =  "mongodb://127.0.0.1:27017/wanderlust";
const ejsMate = require("ejs-mate");

const ExpressError = require("./utils/ExpressError.js");




const path = require("path");
const ejs = require ("ejs");


// requiring routes file
const listings = require("./routes/listing.js")
const reviews = require("./routes/review.js")





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






// listings routes
app.use("/listings" ,listings);

// review routes
app.use("/listings/:id/reviews" , reviews);









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