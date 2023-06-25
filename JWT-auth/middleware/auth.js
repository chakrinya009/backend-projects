const jwt = require("jsonwebtoken");
const costumAPIError = require("../errors/custom-error");

const authenticationMiddleware = async (req, res, next) => {
  //   console.log(req.headers.authorization);
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new CustomAPIError("No token", 401);
  }

  const token = authHeader.split(" ")[1];
  console.log(token);
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const { id, username } = decoded;

    req.user = { id, username };
  } catch {
    throw new CustomAPIError("not authorised to access this route", 401);
  }
  next();
};

module.exports = authenticationMiddleware;
