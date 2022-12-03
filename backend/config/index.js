const dotenv = require("dotenv");

dotenv.config();

const configuration = {
    port: process.env.PORT,
    host: process.env.HOST,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    user: process.env.USER
};

module.exports = configuration;