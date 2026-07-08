import { ApiResponse } from "../utils/api-response.js";
import { asyncHandler } from "../utils/async-handler.js";

const healthCheck = asyncHandler(async (req, res) => {
  res.status(200).json(
    new ApiResponse(200, {
      status: "OK",
      message: "Health check passed. Server is running successfully.",
      timestamp: new Date().toISOString(),
    }),
  );
});

export { healthCheck };
