require('dotenv').config();

module.exports = {
    development: {
        database: process.env.DB_NAME,
        username: process.env.DB_USER,
        password: process.env.DB_PASS,
        host: process.env.DB_HOST,
        dialect: 'postgres',
    },
    //test: {
    // 	database: secret_database.test.DB_NAME,
    // 	username: secret_database.test.DB_USERNAME,
    // 	password: secret_database.test.DB_PASSWORD,
    // 	host: secret_database.test.DB_HOST,
    // 	dialect: 'postgres',
    // },
    // production: {
    // 	database: process.env.DB_NAME,
    // 	username: process.env.DB_USER,
    // 	password: process.env.DB_PASS,
    // 	host: process.env.DB_HOST,
    // 	dialect: 'postgres',
    // },
};