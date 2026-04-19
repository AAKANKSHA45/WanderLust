const express = require("express");
const app = express();
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const MONGO_URL =  "mongodb://127.0.0.1:27017/wanderlust";


const Listing = require("./models/listing.js")
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

app.set("view engine" , "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));

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

// INDEX ROUTE
app.get("/listings", async  (req,res)=>{
    let allListings = await Listing.find({});
    res.render("listings/index.ejs" , {allListings});

})



// CREATE ROUTE 

// 1.new route
app.get("/listings/new" ,  (req,res)=>{
    res.render("listings/new.ejs");
}) 

// 2.create route
app.post("/listings" ,async (req,res)=>{
    // accessing data frm body : data is in js object because we have made name variable as object's key in new.ejs
    let newlisting = req.body.listing;
    // inserting new data into db
      let data = await new Listing(newlisting)
    //   we can also write it direct : let data = await new Listing(req.body.listing)
     data.save().then((res)=>{
        console.log(res)
     }).catch((err)=>{
        console.log(err)
     })

    res.redirect("/listings");


   


})




// SHOW ROUTE
app.get("/listings/:id" ,async (req,res)=>{
    let{id}=req.params;
    let listing = await Listing.findById(id);
    res.render("listings/show.ejs", {listing});

})



// UPDATE ROUTE

// 1.edit Route
app.get("/listings/:id/edit",async (req,res)=>{
    let {id} = req.params;
     let listing = await Listing.findById(id);
    res.render("listings/edit.ejs" , {listing});
})

// 2.update route
app.put("/listings/:id",async (req,res)=>{
    let{id} = req.params;
    let updateListing = {...req.body.listing} // body me jo data hai woh obj hai b/c we made that
    await Listing.findByIdAndUpdate(id ,updateListing);
    res.redirect(`/listings/${id}`)

})


// DELETE ROUTE
app.delete("/listings/:id" ,async (req,res)=>{
    let{id} = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    res.redirect("/listings");
    
})

