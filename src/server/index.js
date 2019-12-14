const config = require('./config/config');
const mongo = require('./config/database');
const app = require('express')();

const port = process.env.PORT || 5000;
mongo().then(() => {

    require('./config/express')(app);
    require('./config/routes')(app);

    app.use(function (err, req, res, next) {
        console.error(err);
        res.status(500).send(err.message);
        console.log(err)
    });
    app.listen(port, console.log(`Listening on port ${port}!`))

}).catch(console.error);