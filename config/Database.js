const mongoose = require('mongoose')
require('dotenv').config();
const clc = require("cli-color");

class Database {
    constructor() {
        this.connection = null;
    }

    connect () {
        console.clear()
        console.log(clc.yellow.bold('Connecting to database...'))

        mongoose.connect(process.env.MONGO_URL,{
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).then(() => {
            console.log(clc.greenBright.bold('Connected to database!'));
            this.connection = mongoose.connection;
        }).catch(err => {
            console.error(err);
        });
    }
}

module.exports = Database;