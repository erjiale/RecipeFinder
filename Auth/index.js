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
app.use('/dist', express.static(path.join(__dirname, 'dist'))); // for webpack
app.use(express.static(path.join(__dirname, '/static'))); // for the css

// Route Middlewares
app.use('/api/user', authRoute)
app.use('/api/posts', postRoute)

app.get('/', (req, res, next)=> {
    res.sendFile(path.join(__dirname, '/static/index.html'));
  });

app.listen(3000, () => console.log("Server is running"));

