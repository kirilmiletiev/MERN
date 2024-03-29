const userModel = require('../models/user');
const config = require('../config/config');
const utils = require('../utils');


module.exports = {
    get: {
        getAllUsers: (req, res, next) => {
            userModel.find()
                .then((users) => res.send(users))
                .catch(next)
        },
        getUser: (req, res, next) => {
            const userId = req.params.id;
            userModel.findById(userId)
                .then(user => {
                    res.send(user);
                })
                .catch(next);
        },
    },
    post: {
        register: (req, res, next) => {
            const { username, password, firstName, lastName, email, age, gender } = req.body;

            userModel.create({ username, password, firstName, lastName, email, age, gender })
                .then((u) => {
                    res.send(u)
                })
                .catch(next)
        },

        login: (req, res, next) => {
            const { username, password } = req.body;
            userModel.findOne({ username })
                .then((user) => Promise.all([user, user.matchPassword(password)]))
                .then(([user, match]) => {
                    if (!match) {
                        res.status(401).send('Invalid username or password');
                        return;
                    }

                    const token = utils.jwt.createToken({ id: user._id, username: user.username });
                    res.cookie(config.authCookieName, token).send(token);
                })
                .catch(next);
        },

        logout: (req, res, next) => {
            res.clearCookie(config.authCookieName).send('Logout successfully!');
        }
    },

    put: (req, res, next) => {
        const id = req.params.id;
        const { username, password } = req.body;
        userModel.update({ _id: id }, { username, password })
            .then((updatedUser) => res.send(updatedUser))
            .catch(next)
    },

    delete: (req, res, next) => {
        const { username } = req.body;
        userModel.findOne({ username: username })
            .then(user => {
                userModel.deleteOne({ _id: user.id })
                    .then((removeUser) => {
                        res.send(removeUser);
                    })
                    .catch(next);
            });
    }
};