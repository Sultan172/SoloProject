require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const authRouter = require('./routes/authRouter');
const tokensRouter = require('./routes/tokensRouter');
const messagesRouter = require('./routes/messagesRouter');
const app = express();
const path = require('path')
// const { PORT } = process.env;

const corsConfig = {
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
  credentials: true,
};
app.use(cors(corsConfig));
app.use(express.static(path.join(__dirname, '../public')));
// console.log("🚀 ~ __dirname:", __dirname)
// console.log('Serving images from:', path.join(__dirname, 'images'));
// app.use(express.static(staticPath));
app.use(cookieParser());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api/tokens', tokensRouter);
app.use('/api/auth', authRouter);
app.use('/api/messages', messagesRouter);
// слушатель
module.exports = app;