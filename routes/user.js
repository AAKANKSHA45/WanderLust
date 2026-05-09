const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");


// SIGNUP
router.get("/signup" ,(req,res)=>{
    res.render("users/signup.ejs");
})

router.post("/signup" ,wrapAsync (async(req,res,next)=>{ //async b/c we are dealing here with db
    try{
        let {username , email , password } = req.body;
        const newUser = new User({email , username});
        const registerdUser = await User.register(newUser , password);
        console.log(registerdUser);
        // automatic login after signup
        req.login(registerdUser,(err)=>{
            if(err){
                return next(err);
            }
             req.flash("success" , "Welcome to Wanderlust!");
             res.redirect("/listings");
        })
       
    }catch(e){
        req.flash("error" , e.message);
        res.redirect("/signup");

    }
   
}))

// LOGIN
router.get("/login" ,(req,res)=>{
    res.render("users/login.ejs");
})

router.post("/login",
    // middleware 
    passport.authenticate("local" ,{
        failureRedirect : "/login",
        failureFlash:true //give flash msg (implemented by passport)
    }),
    
    async(req,res)=>{
        req.flash("success" , "Welcome to Wanderlust , You are logged in")
        res.redirect("/listings");
})

// LOGOUT
router.get("/logout" , (req ,res , next)=>{
    req.logOut((err)=>{
        if(err){
            return next(err);
        }
         req.flash("success" , "You are logged out");
         res.redirect("/listings");
       
    })
})




module.exports = router;