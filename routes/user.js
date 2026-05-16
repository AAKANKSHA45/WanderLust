const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const {saveRedirectUrl} = require("../middleware.js");
const userController = require("../controllers/user.js");


// SIGNUP
router.get(
    "/signup" ,
     userController.renderSignUpForm
);

router.post(
    "/signup" ,
    wrapAsync (userController.signUp)
);

// LOGIN
router.get(
    "/login" ,
    userController.renderLoginForm
);

router.post("/login",
    saveRedirectUrl,
    // middleware 
    passport.authenticate("local" ,{
        failureRedirect : "/login",
        failureFlash:true //give flash msg (implemented by passport)
    }),
    userController.login
    );

// LOGOUT
router.get(
    "/logout" , 
    userController.logOut
);




module.exports = router;