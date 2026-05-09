 
//  we have created a fn isLoggedIn
 module.exports.isLoggedIn = (req ,res,next)=>{

    // console.log(req.user);
    if(!req.isAuthenticated()){
        req.flash("error" , "You must logged in!")
        return res.redirect("/login")
    }
    next();
 }
 