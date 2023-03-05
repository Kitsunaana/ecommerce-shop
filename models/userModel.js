const mongoose = require('mongoose')
const validator = require('validator')

const userSchema = new mongoose.Schema({
    name:         { type: String, required: [true, 'Please enter name.'], trim: true, unique: true },
    email:        { type: String, required: [true, 'Please enter email.'], unique: true, validate: [validator.isEmail, 'Please enter a valid email.'] },
    password:     { type: String, required: [true, 'Please enter password.'], minLength: [8, 'Password should be more than 8 characters'], select: false },
    phone:        { type: String, required: [true, 'Please enter phone.'], unique: true },
    avatar:       { id: { type: String }, url: { type: String } },
    roles:        { type: [String], default: 'user', required: true, enum: ['admin', 'seler', 'user'] },
    store:        { type: mongoose.Schema.ObjectId, ref: "Store", required: true },
    updatedBy:    { user: { type: mongoose.Schema.ObjectId, ref: "User", required: true } },
    refreshToken: { type: String }, // [String],
    blocked:      { type: Boolean, default: false }
}, { timestamps: true }) 

module.exports = mongoose.model("User", userSchema)