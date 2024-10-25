const jwt = require('jsonwebtoken');
const jwtConfig = require('../configs/jwtConfig');
require('dotenv').config();

function generateTokens(payload) {
  return {
    accessToken: jwt.sign(payload, process.env.SECRET_ACCESS_TOKEN, jwtConfig.access),
    refreshToken: jwt.sign(payload, process.env.SECRET_REFRESH_TOKEN, jwtConfig.refresh),
  };
}

module.exports = generateTokens;