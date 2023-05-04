const express = require('express');
const mongoose = require('mongoose');
const dbConfig = require('./config/db');

const app = express();

mongoose.connect(dbConfig);
const db = mongoose.connection;

const port = process.env.PORT || 5002;

db.on('error', (error) => console.log(`ERROR: ${error.message}`));
db.on('connected', () => console.log(`MondoDB Connected: ${dbConfig}`));
db.on('disconnected', () => console.log('MongoDB Disconnected'))

app.use(express.json());

app.listen(port, () => console.log(`listening on port ${port}`));


