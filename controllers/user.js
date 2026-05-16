const User = require("../models/user.js");

module.exports.renderSignUpForm = (req,res)=>{
    res.render("users/signup.ejs");
}

module.exports.signUp = async(req,res,next)=>{ //async b/c we are dealing here with db
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
   
}

module.exports.renderLoginForm = (req,res)=>{
    res.render("users/login.ejs");
}

module.exports.login = async(req,res)=>{
        req.flash("success" , "Welcome to Wanderlust , You are logged in")
        let UrlRedirect = res.locals.redirectUrl || "/listings";
        res.redirect(UrlRedirect);
}

module.exports.logOut = (req ,res , next)=>{
    req.logOut((err)=>{
        if(err){
            return next(err);
        }
         req.flash("success" , "You are logged out");
         res.redirect("/listings");
       
    })
}