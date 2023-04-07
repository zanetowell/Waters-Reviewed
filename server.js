const express = require('express');
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const app = express();

require('dotenv').config();

// Database Configuration
mongoose.connect(process.env.DATABASE_URL);

// Database Connection Error / Success
const db = mongoose.connection;
db.on('error', (err) => console.log(err.message + ' is mongod not running?'));
db.on('connected', () => console.log('mongo connected'));
db.on('disconnected', () => console.log('mongo disconnected'));

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'))

// Controllers
const waterController = require('./controllers/water')
app.use('/', waterController)


// const articlesController = require('./controllers/articles.js');
// app.use('/articles', articlesController);

// INDUCES

// // Index
// app.get('/', (req, res) => {
//     res.render('index.ejs')
// })

// Listener
const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`listening on ${PORT}`);
});