class ApiError extends Error {
  constructor(
    statusCode,
    message = "Something went wrong",
    errors = [],
    stack,
  ) {
    super(message);

    if (
      typeof statusCode !== "number" ||
      statusCode < 100 ||
      statusCode > 599
    ) {
      throw new TypeError(`Invalid HTTP status code: ${statusCode}`);
    }

    this.statusCode = statusCode;
    this.errors = errors;
    this.success = false;
    this.name = this.constructor.name;

    if (stack) {
      this.stack = stack;
    } else if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export { ApiError };
