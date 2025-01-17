const errorCustomizer = (statusCode, errorMessage) => {
    const error = new Error();
    error.statusCode = statusCode || 500;
    error.message = errorMessage;
    return error;
}

export default errorCustomizer;