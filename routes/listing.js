const express = require("express");
const router = express.Router();

const wrapAsync = require("../utils/wrapAsync.js");
const listingSchema = require("../schema.js")
const {isLoggedIn ,isOwner, validateListing} = require("../middleware.js")

const ExpressError = require("../utils/ExpressError.js");
const Listing = require("../models/listing.js")
const listingController = require("../controllers/listing.js");

// INDEX ROUTE and 2.create route
router
.route("/")
.get(
     wrapAsync(listingController.index)
)
.post(
    isLoggedIn ,
    validateListing ,
     wrapAsync(listingController.createListing)
);


// CREATE ROUTE 

// 1.new route
router.get("/new",
    isLoggedIn , 
    listingController.renderNewForm
);


// SHOW ROUTE and 2.update route and DELETE ROUTE
router
.route("/:id")
.get(
     wrapAsync(listingController.showListing)
)
.put(
    isLoggedIn ,
    isOwner ,
    validateListing,
     wrapAsync(listingController.updateListing)
)
.delete(
    isLoggedIn,
    isOwner ,
    wrapAsync(listingController.destroyListing)
)



// UPDATE ROUTE

// 1.edit Route
router.get("/:id/edit",
    isLoggedIn ,
    isOwner , 
    wrapAsync(listingController.renderEditForm)
);




module.exports = router;