const jwt = require('./jwt');
const config = require('../config/config');
const models = require('../models');


module.exports = function () {
  return function (req, res, next) {
    const token = req.cookies[config.authCookieName];

    console.log(token);
    
    jwt.verify(token)
      .then(({ id }) => models.User.findById(id))
      .then(user => {
        req.user = user; next();
      })
      .catch(() => {
        res.status(401).send('[UNAUTHORIZED]');
      });
  }
}