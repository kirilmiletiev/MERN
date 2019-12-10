const router = require('express').Router();
let User = require('../models/user');
const serv = require('../controllers')

router.route('/').get((req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
});



router.route('/register').post((req, res, next) => {

 serv.user.post.register(req, res, next);
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