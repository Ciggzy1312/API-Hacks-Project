const mongoose = require("mongoose")

const pinSchema = new mongoose.Schema(
    {
        username : {
            type : String,
            required : true,
        },

        title : {
            type : String,
            required : true,
        },

        desc : {
            type : String,
            required : true,
        },

        rating : {
            type : String,
            required : true,
            min : 0,
            max : 5
        },

        long: {
            type: Number,
            required: true,
        },

        lat: {
            type: Number,
            required: true,
        },
    },
    { timestamps : true }
)

module.exports = mongoose.model("pin", pinSchema)