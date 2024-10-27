const jwt = require('jsonwebtoken');
require('dotenv').config();

function verifyAccessToken(req, res, next) {
  const accessToken = req.headers.authorization.split(' ')[1];
  console.log("🚀 ~ verifyAccessToken ~ accessToken............................:", accessToken)
  // const user = jwt.verify(accessToken, process.env.SECRET_ACCESS_TOKEN);
  console.log("🚀 ~ verifyAccessToken ~ user:", jwt.verify(accessToken, process.env.SECRET_ACCESS_TOKEN))
  // res.sendStatus(200)
  try { 
    // console.log('----------------------', req.headers.authorization)
    // res.locals.user = user;
    next();
  } catch (error) {
    console.log('Invalid Access token', error);
    res.status(403).send('Forbidden');
  }
}

module.exports = verifyAccessToken;