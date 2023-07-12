const express = require('express');
const User = require('../models/User.model');
const router = express.Router();

// you need to install bcryptjs to use the passwordHash option. -j
const bcrypt = require('bcryptjs');
const { isLoggedOut } = require('../middlewares/route-guard.middleware');
const saltRounds = 10;

//----------

// this is a GET to the SIGNUP page form. -j
router.get("/signup", isLoggedOut, (req, res, next) => {
  res.render('auth/signup');
});
// this is a POST to register a new user / catch the data of the SIGNUP form -j
router.post('/signup', async (req, res, next) => {
    console.log(req.body)

    //Lines 19 and 20: makes a shallow copy of req.body and sends it to passwordHash and delete the payload afterwards. -j
    const payload = { ...req.body }
   
    delete payload.password //removes the password file to avoid pushing it to the database. -j
    const salt = bcrypt.genSaltSync(13) //generate salt  -j
    payload.passwordHash = bcrypt.hashSync(req.body.password, salt) //password hashing 

    try {
        const newUser = await User.create(payload)
        res.send(newUser)
      } catch (error) {
        console.log(error)
      }

  });

//----------

// this is a GET to the LOGIN page form -j
router.get("/login", (req, res, next) => {
    res.render("auth/login");
  });
  
  // this is a POST to check if our user is registered and 
  //basic security we can implement. -j
  router.post("/login", async (req, res, next) => {
    console.log(req.body) //check if the information is being received correctly when submitted. -j

    try {// code below looks for a user -j
        const currentUser = req.body
        const checkedUser = await User.findOne({ email: currentUser.email.toLowerCase() })
        if (checkedUser) {
            //user exists. Checks if password(provided client side) and passwordHash(stored in server) match. -j
            if (bcrypt.compareSync(currentUser.password,checkedUser.passwordHash)) {
            //if correct:
            const loggedUser = { ...checkedUser._doc } //_doc is comming from mongoose. Use it like this if you want to make a copy of something coming from mongoose. -j
            delete loggedUser.passwordHash
            console.log(loggedUser)
            req.session.user = loggedUser //once logged in we assign a loggedUser to the user on the session -j
            res.redirect('/profile')
            }   else {
                // if not correct:
                // send the error message to the login
                console.log('wrong credentials')
                res.render('auth/login', {errorMessage: 'Bad credentials, try again',
            payload: { email: currentUser.email}
            }) 
            }
        } 
    } catch (error) { // this part is to notify if there's a crash on the frontend -j
        console.log('error in login POST', error)
        res.render('auth/login', {
            errorMessage: 'Error on the server',
            payload: { email: currentUser.email },
        })
    }
});

module.exports = router;