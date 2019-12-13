const router = require('express').Router();
let User = require('../models/user');
//let { user } = require('../controllers/user')
const models = require('../models');
const config = require('../config/config');
const utils = require('../utils');

router.route('/').get((req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
});


router.route('/register').post((req, res, next) => {

    const { username, password } = req.body;

    User.create({ username, password })
        .then((createdUser) => {
            // console.log('User added!')
            const token = utils.jwt.createToken({ id: createdUser._id });
            res.cookie(config.authCookieName, token).send(createdUser);
            console.log('User added!');
            console.log(token);

            // res.redirect('/');
        })
        .catch(next);
    //  user.post.register(req, res, next);
    // res.redirect('/');
});

router.route('/login').post((req, res, next) => {

    user.post.login(req, res, next);
});

router.route('/logout').post((req, res, next) => {

    user.post.logout(req, res, next);
});



// router.route('/add').post((req, res) => {
//     const username = req.body.username;
//     const password = req.body.password;

//     const newUser = new User({ username, password });

//   //  serv.post.add(req, res, next);

//     newUser.save()
//         .then(() => res.json('User added!'))
//         .catch(err => res.status(400).json('Error: ' + err));
// });

module.exports = router;