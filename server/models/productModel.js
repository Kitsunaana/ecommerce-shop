const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    title:        { type: String, required: [true, 'Please enter product name.'], trim: true },
    description:  { type: String, required: [true, 'Please enter product description.'] },
    price:        { type: Number, required: [true, 'Please enter product price.'] },
    discount:     { type: Number, default: 0 },
    stock:        { type: Number, default: 1, required: [true, 'Please enter product stock.'] },
    images:       [ { id: { type: String }, url: { type: String } } ],
    category:     { type: mongoose.Schema.ObjectId, ref: "Category", required: [true, 'Please select a category.'] },
    brand:        { type: mongoose.Schema.ObjectId, ref: "Brand", required: [true, 'Please select a brand.'] },
    store:        { type: mongoose.Schema.ObjectId, ref: "Store", required: [true, 'Please select a store.'] },
    localShipmentPolicy: 
        { type: String, required: [true, 'Please select a local shipment policy.'], default: 'standart', enum: ['free', 'standart', 'custom'] },
    customLocalShipmentPolicy: { type: Number },
    internationalShipmentPolicy: 
        { type: String, required: [true, 'Please select a local international policy.'], default: 'standart', enum: ['free', 'standart', 'custom'] },
    customInternationalShipmentPolicy: { type: Number },
    weight:       { type: Number, default: 1 },
    ratings:      { type: Number, default: 0 },
    numOfReviews: { type: Number, default: 0 },
    reviews:      [ { user: { type: mongoose.Schema.ObjectId, ref: "User", required: true } } ],
    addedBy:      { user: { type: mongoose.Schema.ObjectId, ref: "User", required: true } },
    updatedBy:    { user: { type: mongoose.Schema.ObjectId, ref: "User", required: true } },
}, { timestamps: true }) 

module.exports = mongoose.model("Product", productSchema)