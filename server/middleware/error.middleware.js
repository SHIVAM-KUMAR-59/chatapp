const errorHandlerMiddleware = async (err, req, res, next) => {
  console.log(err)
  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    success: false,
    message: err.message || 'Internal Server Error',
    // Include details only in development
  });
};

export default errorHandlerMiddleware;