const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description : {
        type: String,
        required: false
    },
    year : {
        type: Number,
        required: true
    },
    month : {
        type: Number,
        required: true
    },
    day : {
        type: Number,
        required: true
    }
})

const eventModel = mongoose.model("Event", eventSchema);

module.exports = eventModel;