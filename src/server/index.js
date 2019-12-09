const config = require('./config/config');
const dbConnection = require('./config/database');

const app = require('express')();
const port = process.env.PORT || 5000;
dbConnection().then(() => {

    require('./config/express')(app);

    require('./config/routes')(app);

    app.use(function (err, req, res, next) {
        console.error(err);
        res.status(500).send(err.message);
        console.log(err)
        //console.log('*'.repeat(90))
    });

    app.listen(port, console.log(`Listening on port ${port}!`))

}).catch(console.error);