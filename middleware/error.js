const ErrorHandler = require('../utils/errorHandler')

module.exports = (error, request, response, next) => {
    error.statusCode = error.statusCode || 500
    error.message = error.message || 'Internal server error'

    if (error.name === 'CastError') {
        const message = 'Resource not found. Invalid ' + error.path
        error = new ErrorHandler(message, 400)
    }

    if (error.code === 11000) {
        const fieldName = error.message.split('index: ')[1].split('_')[0]
        const message = `Duplicate value entered in ${fieldName}`
        error = new ErrorHandler(message, 409)
    }

    response.status(error.statusCode).json({ success: false, message: error.message })
}