const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

// import routes
const authRoute = require('./routes/auth');
const postRoute = require('./routes/posts');

dotenv.config();

// Connect to DB
mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true },
    () => console.log('Connected to DB!')
);

// Middlewares
app.use(express.json()); // Now we can send post requests
app.use('/dist', express.static(path.join(__dirname, '../dist'))); // for webpack
app.use(express.static(path.join(__dirname, '../client/static'))); // for the css

// Route Middlewares
app.use('/api/user', authRoute)
app.use('/api/posts', postRoute)

app.use('/api/recipes', require('./routes/recipes'));
app.use('/api/user', require('./routes/favorites'));
app.use('/api/user', require('./routes/user'));

app.use('/api/user', require('./routes/orders'));
app.use('/api/user', require('./routes/store'));

app.get('/', (req, res, next)=> {
    res.sendFile(path.join(__dirname, '../client/static/index.html'));
}); 

const server = app.listen(4000)
