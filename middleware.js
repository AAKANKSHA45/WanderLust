 
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


 