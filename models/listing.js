const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const listingSchema = new Schema({
    title:{
        type:String,
        Required :true,
    },
    description :{
       type: String,
    },
    image: {
    type: String,
    default: "https://unsplash.com/photos/body-of-water-near-trees-and-mountain-cliff-during-daytime-TWoL-QCZubY",
    set: (v) => {
        return v === "" 
            ? "https://unsplash.com/photos/body-of-water-near-trees-and-mountain-cliff-during-daytime-TWoL-QCZubY"
            : v;
    }
},
    price:Number,
    location:String,
    country:String,
})

// creating collection
const Listing = mongoose.model("Listing", listingSchema);


// exporting this file 
module.exports = Listing;