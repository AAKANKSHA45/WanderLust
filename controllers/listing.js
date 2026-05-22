const Listing = require("../models/listing.js");

module.exports.index = async  (req,res)=>{
    let allListings = await Listing.find({});
    res.render("listings/index.ejs" , {allListings});

};



module.exports.renderNewForm = (req,res)=>{
    res.render("listings/new.ejs");
}



module.exports.showListing = async (req,res)=>{
    let{id}=req.params;
    let listing = await Listing.findById(id)
    .populate({ //nested populate
        path:"reviews",
        populate:{
            path:"author"
        }
    })
    .populate("owner");
    if (!listing){
         req.flash("error" , "Listing does not exist!");
          return res.redirect("/listings")
    }
    console.log(listing);
    res.render("listings/show.ejs", {listing});

};



module.exports.createListing = async (req,res,next)=>{
    console.log (req.file);
    
//    let result = listingSchema.validate(req.body) //joi :- validating upcoming data 
//    console.log(result);
//    if (result.error){
//     throw new ExpressError(400 , result.error)
//    }
if(!req.file){
   req.flash("error", "Please upload an image");
   return res.redirect("/listings/new");
}
     let url = req.file.path;
     let filename = req.file.filename;
    //  console.log(url ,"and" ,filename)


   // accessing data frm body : data is in js object because we have made name variable as object's key in new.ejs
      let data = req.body.listing;
    // inserting new data into db
      let newListing =  new Listing(data);
    //   we can also write it direct : let data = await new Listing(req.body.listing)
      newListing.owner = req.user._id;
      newListing.image = {url, filename} ;// adding into image field 
      await newListing.save();
    // .then((res)=>{
    //     console.log(res)
    //  }).catch((err)=>{
    //     console.log(err)
    //  })
    

    req.flash("success" , "New Listing Created!")

    res.redirect("/listings");

}



module.exports.renderEditForm = async (req,res)=>{
    let {id} = req.params;
     let listing = await Listing.findById(id);
      if (!listing){
         req.flash("error" , "Listing does not exist!");
        return res.redirect("/listings")
    }
     let originalImageUrl = listing.image.url;
    //some changes in url for the transformtion of image (not the whole url changed) : by cloudinary
      let transformImageUrl = originalImageUrl.replace("/upload" , "/upload/w_250")

    res.render("listings/edit.ejs" , {listing , transformImageUrl});
};



module.exports.updateListing = async (req,res)=>{
//      if(!req.body.listing){
//     throw new ExpressError(400 ,"send valid data for listing")
//    }

    let{id} = req.params; 
    let updateData = {...req.body.listing} // body me jo data hai woh obj hai b/c we made that
    let listing = await Listing.findByIdAndUpdate(id ,updateData);
    // for image(file) updation
    if(typeof req.file !== "undefined"){
        let url = req.file.path;
        let filename = req.file.filename;
        listing.image = {url , filename};
        await listing.save();
    }
    

    req.flash("success" , "Listing Updated!")
    res.redirect(`/listings/${id}`)

}



module.exports.destroyListing = async (req,res)=>{
    let{id} = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    req.flash("success" , " Listing Deleted!")
    res.redirect("/listings");
    
}