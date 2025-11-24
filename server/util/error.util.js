class ApiError extends Error {
    constructor(statusCode, message) {
        super(message);
        this.statusCode = statusCode;
    }
}

const handleServerError = (error) => {
    if(error instanceof ApiError) {
        throw error
    } else {
        throw new ApiError(500, 'Internal Server Error');
    }
}

export { ApiError, handleServerError };