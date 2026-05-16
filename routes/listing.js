const express = require("express");
const router = express.Router();

const wrapAsync = require("../utils/wrapAsync.js");
const listingSchema = require("../schema.js")
const {isLoggedIn ,isOwner, validateListing} = require("../middleware.js")

const ExpressError = require("../utils/ExpressError.js");
const Listing = require("../models/listing.js")
const listingController = require("../controllers/listing.js");




// INDEX ROUTE
router.get(
    "/", 
     wrapAsync(listingController.index)
);


// CREATE ROUTE 

// 1.new route
router.get("/new",
    isLoggedIn , 
    listingController.renderNewForm
);

// 2.create route
router.post("/" , 
    isLoggedIn ,
    validateListing ,
     wrapAsync(listingController.createListing)
);


// SHOW ROUTE
router.get("/:id" ,
     wrapAsync(listingController.showListing)
);


// UPDATE ROUTE

// 1.edit Route
router.get("/:id/edit",
    isLoggedIn ,
    isOwner , 
    wrapAsync(listingController.renderEditForm)
);

// 2.update route
router.put("/:id",
    isLoggedIn ,
    isOwner ,
    validateListing,
     wrapAsync(listingController.updateListing)
);


// DELETE ROUTE
router.delete("/:id",
    isLoggedIn,
    isOwner ,
    wrapAsync(listingController.destroyListing)
);


module.exports = router;