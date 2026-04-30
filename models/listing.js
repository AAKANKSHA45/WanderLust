const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const listingSchema = new Schema({
    title:{
        type:String,
        required :true,
    },
    description :{
       type: String,
    },
    image: {
    filename: String,
    url:{ 
        type : String,
        default:"https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
        set: (v) => {
        return v === "" 
            ? "https://images.unsplash.com/photo-1507525428034-b723cf961d3e"
            : v;
    }
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