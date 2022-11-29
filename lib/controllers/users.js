const { Router } = require('express');
const UserService = require('../services/UserService');
// const authenticate = require('../middleware/authenticate');
const ONE_DAY_IN_MS = 1000 * 60 * 60 * 24;
module.exports = Router()
  .post('/sessions', async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const sessionToken = await UserService.signIn({ email, password });
      res.cookie(process.env.COOKIE_NAME, sessionToken, {
        httpOnly: true,
        maxAge: ONE_DAY_IN_MS,
      })
        .json({ message: 'You have signed in' });
    } catch (e) {
      next(e);
    }
  })
  .post('/', async (req, res, next) => {
    try {
      const user = await UserService.create(req.body);
      const { email, password } = req.body;
      const sessionToken = await UserService.signIn({ email, password });
      res.cookie(process.env.COOKIE_NAME, sessionToken, {
        httpOnly: true,
        maxAge: ONE_DAY_IN_MS
      })
        .json(req.body);
      res.json(user);
    } catch (e) {
      next(e);
    }
  })

  .delete('/sessions', (req, res) => {
    res.clearCookie(process.env.COOKIE_NAME, {
      httpOnly: true,
      maxAge: ONE_DAY_IN_MS
    }).status(204).send();
  })


;
