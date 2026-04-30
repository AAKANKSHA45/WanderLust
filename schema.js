const joi = require("joi");

const listingSchema = joi.object({
    listing : joi.object({ //means listing ek object honi chahiye aur wo required honi chahiye
        title : joi.string().required(),
        description : joi.string().required(),
       country: joi.string().required(),
        location: joi.string().required().min(0), //means location ek string , required and min.value 0(i.e -ve number nhi hona chaiye) honi chahiye
        price : joi.number().required(),
        image : joi.object({
            url : joi.string().allow("")
        }).optional()
    }).required()
})

module.exports = listingSchema;