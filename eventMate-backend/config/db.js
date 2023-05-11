const dotenv = require('dotenv');
dotenv.config()



// Define the database for the development environment
const database = {
    development: 'mongodb://localhost:27017/eventMate-development',
    test: 'mongodb://localhost:27017/eventMate-test'
}

const localDB = process.env.NODE_ENV === 'test' ? database.test : database.development;

// Environment variable MONGODB_URI will be available in heroku production environment. 
// Otherwise use the development database.
const currentDB = process.env.MONGODB_URI || localDB

// Export the appropriate database based on the current environment 
module.exports = currentDB