const { CustomAPIError } = require("../errors");
const { StatusCodes } = require("http-status-codes");

const errorHandlerMiddleware = (err, req, res, next) => {
  let customError = {
    //set default
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || "Somethingg went wrong try again later",
  };

  const errorHandlerMiddleware = (err, req, res, next) => {
    if (err instanceof CustomAPIError) {
      return res.status(err.statusCode).json({ msg: err.message });
    }
    // return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err });
    return req.status(customError.statusCode).json({ msg: customError, msg });
  };
};

module.exports = errorHandlerMiddleware;
