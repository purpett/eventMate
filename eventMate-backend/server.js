const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dbConfig = require('./config/db');
const eventRouter = require('./routes/eventRoutes')
const userRouter = require('./routes/userRoutes')
const commentRouter = require('./routes/commentRoutes')

const app = express();

mongoose.connect(dbConfig);
const db = mongoose.connection;

const port = process.env.PORT || 5002;

db.on('error', (error) => console.log(`ERROR: ${error.message}`));
db.on('connected', () => console.log(`MondoDB Connected: ${dbConfig}`));
db.on('disconnected', () => console.log('MongoDB Disconnected'))

app.use(express.json());

// Set CORS headers on response from this API using 'cors' npm package
app.use(cors({
  origin: 'http://localhost:3000'
}))

// Mount the imported Routes
app.use(eventRouter)
app.use(userRouter)
app.use(commentRouter)

app.listen(port, () => console.log(`listening on port ${port}`));


