const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
    
    type: {
        type: String,
    },
    descibe: {
        type: String,

    },
    income: {
        type: String,
        required: true
    },
    expend: {
        type: String,
        required: true
    },
    cash: {
        type: String,
        required: true
    },
    remark: {
        type: String,
    },
    date: {
        type: String,
        default: Date.now
    }
})

module.exports = Profile = mongoose.model("profile", ProfileSchema
);