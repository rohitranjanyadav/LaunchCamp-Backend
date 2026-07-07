class ApiResponse {
  constructor(statusCode, data, message = "Success") {
    if (
      typeof statusCode !== "number" ||
      statusCode < 100 ||
      statusCode > 599
    ) {
      throw new TypeError(`Invalid HTTP status code: ${statusCode}`);
    }

    this.statusCode = statusCode;
    this.data = data;
    this.message = message;
    this.success = statusCode >= 200 && statusCode < 400;
  }
}

export { ApiResponse };
