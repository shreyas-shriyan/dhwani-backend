const { number } = require('assert-plus');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const childSchema = new Schema({
    name: { type: String, required: true },
    sex: { type: String },
    dob: { type: String },
    father_name: { type: String },
    mother_name: { type: String },
    district_id: { type: String, required: true },
    photo: { type: String }
}, { versionKey: false });


module.exports = mongoose.model('child', childSchema);