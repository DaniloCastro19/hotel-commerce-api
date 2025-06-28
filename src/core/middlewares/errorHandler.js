const httpErrorHandler = (error, req, res, next) => {
    const errorStatusCode = error.statusCode || 500;
    const payload = {
        success: false,
        timestamp: new Date().toISOString(),
        statusCode: errorStatusCode,
        errorMessage: error.message || 'Internal Server Error'
    }
    res.status(errorStatusCode).json(payload);

}
export default httpErrorHandler;
