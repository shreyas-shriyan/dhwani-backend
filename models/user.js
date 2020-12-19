const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    organization: { type: String, default: "Bal Vikas" },
    designation: { type: String, default: "Coordinator" },
    logged_in: { type: String, default: false },
    last_login: { type: String },
}, { versionKey: false });


module.exports = mongoose.model('user', userSchema);