var express = require('express');
var router = express.Router();

const api = require('../api');
const middlewares = require('../middlewares');
const utils = require('../utils');

router.post('/login', function (req, res, next) {
  try {
    utils.default.checkRequiredFields(['email', 'password'], req.body);

    const user = api.userApi.default.login(req);
    user.then((data) => {
      res.status(200).json(
        {
          message: 'User loggedin successfully',
          data: data
        }
      )
    }).catch((e) => {
      console.log('Failed to login', e);
      res.status(500).json(
        {
          message: 'Failed to login',
          error: e.message
        }
      )
    });
  } catch (e) {
    console.log('Failed to register', e);
    res.status(500).json(
      {
        message: 'Failed to login',
        error: e.message
      }
    )
  }
});

router.post('/register', function (req, res, next) {
  try {
    const user = api.userApi.default.register(req);
    user.then((data) => {
      res.status(200).json(
        {
          message: 'User registered successfully',
          data: data
        }
      )
    }).catch((e) => {
      console.log('Failed to register', e);
      res.status(500).json(
        {
          message: 'Failed to register',
          error: e.message
        }
      )
    });
  } catch (e) {
    console.log('Failed to register', e);
    res.status(500).send('Failed to register');
  }
});

router.get('/profile', function (req, res, next) {
  const userProfile = api.getProfile(req, res)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
});

module.exports = router;
