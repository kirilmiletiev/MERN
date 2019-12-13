const models = require('../models');
const config = require('../config/config');
const utils = require('../utils');
const { User } = require('../models');
module.exports = {
    get: (req, res, next) => {
        models.user.find()
            .then((users) => res.send(users))
            .catch(next)
    },

    post: {
        register: (req, res, next) => {
            const { username, password } = req.body;

            models.user.create({ username, password })
                .then((createdUser) => {
                    // console.log('User added!')
                    const token = utils.jwt.createToken({ id: createdUser._id });
                    res.cookie(config.authCookieName, token).send(createdUser);
                    console.log('User added!');
                    console.log(token);
                    // res.redirect('/');
                })
                .catch(next)
        },

        login: (req, res, next) => {
            const { username, password } = req.body;
            models.user.findOne({ username })
                .then((user) => Promise.all([user, user.matchPassword(password)]))
                .then(([user, match]) => {
                    if (!match) {
                        res.status(401).send('Invalid password');
                        return;
                    }

                    const token = utils.jwt.createToken({ id: user._id });
                    res.cookie(config.authCookieName, token).send(user);
                })
                .catch(next);
        },

        logout: (req, res, next) => {
            const token = req.cookies[config.authCookieName];
            console.log(token);
            // models.TokenList.create({ token })
            //     .then(() => {
                    res.clearCookie(config.authCookieName).send('Logout successfully!');
                // })
                // .catch(next);
        }
    },

    put: (req, res, next) => {
        const id = req.params.id;
        const { username, password } = req.body;
        models.user.update({ _id: id }, { username, password })
            .then((updatedUser) => res.send(updatedUser))
            .catch(next)
    },

    delete: (req, res, next) => {
        const id = req.params.id;
        models.user.deleteOne({ _id: id })
            .then((removedUser) => res.send(removedUser))
            .catch(next)
    }
};