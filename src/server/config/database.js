const mongoose = require('mongoose');
require('dotenv').config();
//const config = require('./config');

module.exports = () => {

    return mongoose.connect(process.env._URI, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
}