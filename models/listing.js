const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");
const User = require("./user.js");


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

    reviews: [//array because many reviews and reviews = array of IDs, not array of objects. e.g
    // reviews: [
        //   ObjectId("review1"),
        //  ObjectId("review2")
        //   ]
        {
            type: Schema.Types.ObjectId,
            ref : "Review"
        },
    ],
    owner : {
        type:Schema.Types.ObjectId,
        ref : "User"
    }



})


// post mongoose middleware : it is wrtiten in this file b/c we want  Model logic stays with Model
// middleware belongs to the MODEL, not the server.
// Middleware describes:
// "What should happen when this model performs an action?"


listingSchema.post("findOneAndDelete" , async(listing)=>{
    if (listing){
        await Review.deleteMany({_id :{$in : listing.reviews}})

    }


})

// creating collection
const Listing = mongoose.model("Listing", listingSchema);


// exporting this file 
module.exports = Listing;