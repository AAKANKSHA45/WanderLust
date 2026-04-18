const express = require("express");
const app = express();
const mongoose = require("mongoose");
const MONGO_URL =  "mongodb://127.0.0.1:27017/wanderlust";

const Listing = require("./models/listing.js")

main().then(()=>{
    console.log("DB Connected");
}).catch((err)=>{
    console.log(err);
})



async function main (){
    await mongoose.connect(MONGO_URL);
}

app.listen(8080 ,()=>{
    console.log("server is listening");
})

app.get("/" ,(req,res)=>{
    res.send("Root is working");

})

app.get("/testing" , async (req,res)=>{
    let sampleListing = new Listing ({
        title:"My new Home",
        description : "By the City",
        price:2000000,
        location : "Mumbai",
        country:"India"
    })
     await sampleListing.save();
    console.log ("sample is saved");
    res.send("success ")

})