const itemsRouter = require('../routes/items');
const usersRouter = require('../routes/users');

module.exports = (app) => {
    app.use('/items', itemsRouter);
    app.use('/users', usersRouter);

    app.use('*', (req, res, next) => res.send('<h1> Something went wrong. Try again. :thumbsup: </h1>'))
};