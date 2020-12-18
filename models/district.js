const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const districtSchema = new Schema({
    district_name: { type: String, required: true },
    state_id: { type: String, required: true },
}, { versionKey: false });

module.exports = mongoose.model('district', districtSchema);