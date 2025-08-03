const errorHandler = (err, req, res, next) => {
  console.error('Error:', err);

  // Default error
  let error = {
    message: err.message || 'Internal Server Error',
    status: err.status || 500
  };

  // Handle specific error types
  if (err.name === 'ValidationError') {
    error.status = 400;
    error.message = 'Validation Error';
    error.details = err.details;
  }

  if (err.name === 'UnauthorizedError') {
    error.status = 401;
    error.message = 'Unauthorized';
  }

  if (err.name === 'ForbiddenError') {
    error.status = 403;
    error.message = 'Forbidden';
  }

  if (err.name === 'NotFoundError') {
    error.status = 404;
    error.message = 'Resource not found';
  }

  // Prisma errors
  if (err.code === 'P2002') {
    error.status = 409;
    error.message = 'Duplicate entry';
  }

  if (err.code === 'P2025') {
    error.status = 404;
    error.message = 'Record not found';
  }

  res.status(error.status).json({
    error: error.message,
    details: error.details,
    timestamp: new Date().toISOString()
  });
};

module.exports = errorHandler; 