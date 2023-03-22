
const errorHandler = (err,req, res, next) => {
    const statusCode = err.status || 500;
    const message = err.message || "Something went wrong, Try again later";
    res.status(statusCode).json({
        statusCode,         //statusCode: statusCode
        message            //message: message
    })
}

export default errorHandler;