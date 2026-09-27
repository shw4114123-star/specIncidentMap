export const creatError = (message, status) => {
    const err = new Error(message)
    err.status = status
    return err
}

export const errorHandler = (err, _req, res, _next) => {
    const statusCode = err.status || 500;
    res.status(statusCode).json({
        success: false,
        message: err.message
    })
}