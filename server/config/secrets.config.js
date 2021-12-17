const SECRET = process.env.SECRET || "secret";
const REFRESH_TOKEN_SECRET =
  process.env.REFRESH_TOKEN_SECRET || "refreshTokenSecret";
const DATABASE_CONNECTION_STRING =
  process.env.DATABASE_CONNECTION_STRING ||
  "mongodb://localhost:27017/Alephtav";
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:8080";
const CLOUDINARY_CONFIG = {
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "dbwknshhd",
  api_key: process.env.CLOUDINARY_API_KEY || "541835129491576",
  api_secret:
    process.env.CLOUDINARY_API_SECRET || "hIn-gK09iBt-Y6FsnhQM2hzQNFs",
};
const PORT = process.env.PORT || 8000;
const BACKEND_URL = process.env.BACKEND_URL || `http://localhost:${PORT}`;

module.exports = {
  BACKEND_URL,
  CLIENT_URL,
  CLOUDINARY_CONFIG,
  DATABASE_CONNECTION_STRING,
  PORT,
  REFRESH_TOKEN_SECRET,
  SECRET,
};
