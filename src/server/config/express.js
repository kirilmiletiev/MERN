const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const secret = 'alabala';

module.exports = (app) => {
    app.use(bodyParser.urlencoded({
        extended: true
    }));

    app.use(bodyParser.json());

    app.use(cookieParser(secret));
    app.use(cors({
        origin: 'http://localhost:3000',
        credentials: true
    }));
};