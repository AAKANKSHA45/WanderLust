const express = require("express");
const router = express.Router();

const wrapAsync = require("../utils/wrapAsync.js");
const listingSchema = require("../schema.js")
const {reviewSchema} = require("../schema.js")
const ExpressError = require("../utils/ExpressError.js");
const Listing = require("../models/listing.js")

// put validation in a function
const validateListing = (req,res,next)=>{
    let {error} = listingSchema.validate(req.body) //joi :- validating upcoming data 
    if (error){
        let errMsg = error.details.map((el) =>el.message).join(",") //finding  exact message of error
    throw new ExpressError(400 , errMsg);
    }else{
        next(); //go to the NEXT middleware or route.
    }
}


// INDEX ROUTE
router.get("/",  wrapAsync(async  (req,res)=>{
    let allListings = await Listing.find({});
    res.render("listings/index.ejs" , {allListings});

}))



// CREATE ROUTE 

// 1.new route
router.get("/new" ,  (req,res)=>{
    res.render("listings/new.ejs");
}) 

// 2.create route
router.post("/" , validateListing , wrapAsync(async (req,res,next)=>{
    
//    let result = listingSchema.validate(req.body) //joi :- validating upcoming data 
//    console.log(result);
//    if (result.error){
//     throw new ExpressError(400 , result.error)
//    }

   // accessing data frm body : data is in js object because we have made name variable as object's key in new.ejs
    let newlisting = req.body.listing;
    // inserting new data into db
      let data = await new Listing(newlisting)
    //   we can also write it direct : let data = await new Listing(req.body.listing)
      await data.save();
    // .then((res)=>{
    //     console.log(res)
    //  }).catch((err)=>{
    //     console.log(err)
    //  })

    res.redirect("/listings");

  

}))




// SHOW ROUTE
router.get("/:id" , wrapAsync(async (req,res)=>{
    let{id}=req.params;
    let listing = await Listing.findById(id).populate("reviews");
    res.render("listings/show.ejs", {listing});

}))



// UPDATE ROUTE

// 1.edit Route
router.get("/:id/edit",  wrapAsync(async (req,res)=>{
    let {id} = req.params;
     let listing = await Listing.findById(id);
    res.render("listings/edit.ejs" , {listing});
}))

// 2.update route
router.put("/:id",validateListing, wrapAsync(async (req,res)=>{
//      if(!req.body.listing){
//     throw new ExpressError(400 ,"send valid data for listing")
//    }

    let{id} = req.params; 
    let updateListing = {...req.body.listing} // body me jo data hai woh obj hai b/c we made that
    await Listing.findByIdAndUpdate(id ,updateListing);
    res.redirect(`/listings/${id}`)

}))


// DELETE ROUTE
router.delete("/:id" , wrapAsync(async (req,res)=>{
    let{id} = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    res.redirect("/listings");
    
}))


module.exports = router;