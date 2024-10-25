const express = require('express');
const bcrypt = require('bcrypt');
const authRouter = express.Router();
const { User } = require('../../db/models');
const generateTokens = require('../utils/generateTokens');
const cookieConfig = require('../configs/cookieConfig');

authRouter.post('/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log("🚀 ~ authRouter.post ~ name:", name)
    const hashpass = await bcrypt.hash(password, 10);
    const [newUser, created] = await User.findOrCreate({
      where: { email },
      defaults: { name, hashpass },
    });
    if (!created) {
      return res.status(400).json({ text: 'Такой профиль уже есть' });
    }
    const user = newUser.get();
    delete user.hashpass;
    const { refreshToken, accessToken } = generateTokens({ user });
    res
      .status(200)
      .cookie('refreshToken', refreshToken, cookieConfig)
      .json({ user, accessToken });
  } catch (error) {
    console.log(error);
    res.status(500).send('Ошибка регистрации:', error.message);
  }
});

authRouter.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const targetUser = await User.findOne({ where: { email } });
    if (!targetUser) {
      return res.status(400).json({ text: 'Неверный email' });
    }
    const isValid = await bcrypt.compare(password, targetUser.hashpass);
    if (!isValid) {
      return res.status(400).json({ text: 'Неверный пароль' });
    }

    const user = targetUser.get();
    delete user.hashpass;
    const { refreshToken, accessToken } = generateTokens({ user });
    res
      .status(200)
      .cookie('refreshToken', refreshToken, cookieConfig)
      .json({ user, accessToken });
  } catch (error) {
    res.status(500).send('Ошибка входа в профиль:', error.message);
  }
});

authRouter.get('/logout', (req, res) => {
  try {
    res.clearCookie('refreshToken').status(200).send('Logout successfull!');
  } catch (error) {
    res.status(500).send('Ошибка выхода из профиля:', error.message);
  }
});

module.exports = authRouter;
