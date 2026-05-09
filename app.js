const express = require("express");
const app = express();
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const MONGO_URL =  "mongodb://127.0.0.1:27017/wanderlust";
const ejsMate = require("ejs-mate");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local")
const User = require("./models/user.js");

const ExpressError = require("./utils/ExpressError.js");

const path = require("path");
const ejs = require ("ejs");
main().then(()=>{
    console.log("DB Connected");
}).catch((err)=>{
    console.log(err);
})

async function main (){
    await mongoose.connect(MONGO_URL);
}


 const sessionOptions = {
    secret : "secretCode",
    resave : false,
    saveUninitialized : true,
    cookie :{
        expires:Date.now() + 7*24*60*60*1000,//Date.now() return in milisec
        maxAge:7*24*60*60*1000, // age of cookie
        httpOnly : true
    }

};
// express-session middleware
app.use(session(sessionOptions));

app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req,res,next)=>{
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    next();
})

// app.get("/demouser" , async(req , res) =>{
//     // creating fake user
//     let fakeUser = new User({
//         email:"aakanksha45@gmail.com",
//         username : "akku"
//     })
//     let registerdUser = await User.register(fakeUser , "4518");
//     res.send(registerdUser);
// })






// requiring routes file
const listingRouter = require("./routes/listing.js")
const reviewRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");









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
app.use("/listings" ,listingRouter);

// review routes
app.use("/listings/:id/reviews" , reviewRouter);

// user routes
app.use("/" , userRouter);










// for all other routes except above
// app.use((req,res,next)=>{
//     next(new ExpressError (404 ," Page not found!"))
// })

// error handling middleware
app.use((err,req,res,next)=>{
   let {statusCode = 500 , message = "something went wrong"} = err;
   console.log(err);
    res.status(statusCode).render("listings/error.ejs" , {message});
})