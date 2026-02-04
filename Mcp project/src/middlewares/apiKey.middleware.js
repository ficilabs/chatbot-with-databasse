const { API_SECRET } = require("../config/env");

module.exports = (req, res, next) => {
  const apiKey = req.headers["x-api-key"];

  if (!apiKey || apiKey !== API_SECRET) {
    return res.status(403).json({
      error: "Forbidden: invalid API key"
    });
  }

  next();
};