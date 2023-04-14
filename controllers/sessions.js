// Dependencies
const express = require('express')
const bcrypt = require('bcrypt')
const sessionsRouter = express.Router()
const User = require('../models/users.js')

// New (login page)
sessionsRouter.get('/new', (req, res) => {
	res.render('sessions/new.ejs', {
		currentUser: req.session.currentUser
	})
})

// Delete (logout route)
sessionsRouter.delete('/', (req, res) => {
     req.session.destroy((error) => {
         res.redirect('/water')
    })
 })

// Create (login route)
sessionsRouter.post('/', async (req, res) => {
    // Check for an existing user
    const foundUser = await User.findOne({
        email: req.body.email
    })
        // send error message if no user is found
        if (!foundUser) {
            res.send(`No user with that email address has been registered.`);
        } else {
            // If a user has been found 
            // compare the given password with the hashed password we have stored
            const passwordMatches = bcrypt.compareSync(req.body.password, foundUser.password);

            // if the passwords match
            if (passwordMatches) {
                // add the user to our session
                req.session.currentUser = foundUser;

                // redirect back to our home page
                res.redirect('/water');
            } else {
                // if the passwords don't match
                res.send('Incorrect Password');
            }
        }
    });
// Export Sessions Router
module.exports = sessionsRouter;