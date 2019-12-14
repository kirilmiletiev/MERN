const itemsRouter = require('../routes/items');
const usersRouter = require('../routes/users');

module.exports = (app) => {
    app.use('/items', itemsRouter);
    app.use('/users', usersRouter);

    app.use('*', (req, res, next) => res.send('404 (NOT FOUND)'))
};