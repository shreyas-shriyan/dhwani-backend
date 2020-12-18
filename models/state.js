const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const stateSchema = new Schema({
    state_name: { type: String, required: true }
}, { versionKey: false });

module.exports = mongoose.model('states', stateSchema);