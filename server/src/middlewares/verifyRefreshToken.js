const jwt = require('jsonwebtoken');
require('dotenv').config();

function verifyRefreshToken(req, res, next) {
  try {
    const { refreshToken } = req.cookies;
    console.log("🚀 ~ verifyRefreshToken ~ req:", req.cookies)
    console.log("🚀 ~ verifyRefreshToken ~ refreshToken:", refreshToken)
    console.log(process.env.SECRET_REFRESH_TOKEN)
    const { user } = jwt.verify(refreshToken, process.env.SECRET_REFRESH_TOKEN);
    console.log("🚀 ~ verifyRefreshToken ~ user:", user)
    res.locals.user = user;
    next();
  } catch (error) {
    console.log('Invalid refresh token', error);
    res.status(401).clearCookie('refreshToken').json({ text: 'Invalid refresh token' });
  }
}

module.exports = verifyRefreshToken;