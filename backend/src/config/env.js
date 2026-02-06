require("dotenv").config();

module.exports = {
  PORT: process.env.PORT || 3000,
  API_SECRET: process.env.API_SECRET,
  DATABASE_URL: process.env.DATABASE_URL
};
