const Category = require('../models/categoryModel')
const ErrorHandler = require('../utils/errorHandler')
const asyncHandler = require('express-async-handler')

exports.addCategory = asyncHandler(async(request, response, next) => {
    const category = await Category.create(request.body)
    response.status(201).json({ success: true, category })
})

exports.getCategories = asyncHandler(async(request, response, next) => {
    const categories = await Category.find()
    response.status(200).json({ success: true, categories })
})

exports.getCategoryDetails = asyncHandler(async(request, response, next) => {
    const category = await Category.findById(request.params.id)
    if (!category) return next(new ErrorHandler('Category not found.', 404))
    response.status(200).json({ success: true, category })
})

exports.updateCategory = asyncHandler(async(request, response, next) => {
    let category = await Category.findById(request.params.id)
    if (!category) return next(new ErrorHandler('Category not found.', 404))
    category = await Category.findByIdAndUpdate(request.params.id, request.body, { new: true, runValidator: true, useFindAndModify: false })
    response.status(201).json({ success: true, category })
})

exports.deleteCategory = asyncHandler(async(request, response, next) => {
    let category = await Category.findById(request.params.id)
    if (!category) return next(new ErrorHandler('Category not found.', 404))
    await category.remove()
    response.status(200).json({ success: true })
})