const ErrorResponse = require('../utils/errorResponse');


const errorHandler = (err, req, res, next) => {
    let error = { ...err };
    error.message = err.message;

    console.log(err.name);

    if (err.name === 'CastError') {
        const message = `Resource not found ${err.value}`;
        error = new ErrorResponse(message, 404);
    }

    res.status(error.statusCode || 500).json;
}

module.exports = errorHandler;