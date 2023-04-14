const express = require('express')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const app = express()
const session = require('express-session')

require('dotenv').config();


// Database Configuration
mongoose.connect(process.env.DATABASE_URL);

// Database Connection Error / Success
const db = mongoose.connection;
db.on('error', (err) => console.log(err.message + ' is mongod not running?'));
db.on('connected', () => console.log('mongo connected'));
db.on('disconnected', () => console.log('mongo disconnected'));

// Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'))
app.use(
    session({
        secret: process.env.SECRET,
        resave: false,
        saveUninitialized: false
    }))

app.use("/public", express.static('public'))

// Controllers
const waterController = require('./controllers/water')
app.use('/water', waterController)

const userController = require('./controllers/users')
app.use('/users', userController)

const sessionsController = require('./controllers/sessions')
app.use('/sessions', sessionsController)

// Landing Page
app.get('/',   (req, res) => {
	res.render('dashboard.ejs')
})

// Listener
const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`listening on ${PORT}`);
});