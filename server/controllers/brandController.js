const Brand = require('../models/brandModel')
const ErrorHandler = require('../utils/errorHandler')
const asyncHandler = require('express-async-handler')

exports.addBrand = asyncHandler(async(request, response, next) => {
    const brand = await Brand.create(request.body)
    response.status(201).json({ success: true, brand })
})

exports.getBrands = asyncHandler(async(request, response, next) => {
    const brands = await Brand.find()
    response.status(200).json({ success: true, brands })
})

exports.getBrandDetails = asyncHandler(async(request, response, next) => {
    const brand = await Brand.findById(request.params.id)
    if (!brand) return next(new ErrorHandler('Brand not found.', 404))
    response.status(200).json({ success: true, brand })
})

exports.updateBrand = asyncHandler(async(request, response, next) => {
    let brand = await Brand.findById(request.params.id)
    if (!brand) return next(new ErrorHandler('Brand not found.', 404))
    brand = await Brand.findByIdAndUpdate(request.params.id, request.body, { new: true, runValidator: true, useFindAndModify: false })
    response.status(201).json({ success: true, brand })
})

exports.deleteBrand = asyncHandler(async(request, response, next) => {
    let brand = await Brand.findById(request.params.id)
    if (!brand) return next(new ErrorHandler('Brand not found.', 404))
    await brand.remove()
    response.status(200).json({ success: true })
})