const router = require('express').Router();
const userController = require('../controllers/user');

router.get('/', userController.get.getAllUsers);
router.post('/register', userController.post.register);
router.post('/login', userController.post.login);
router.post('/logout', userController.post.logout);
router.delete('/delete-user', userController.delete);
router.get('/get-user/:id', userController.get.getUser);

module.exports = router;