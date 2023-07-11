const express = require('express');
const User = require('../models/User.model');
const router = express.Router();

// you need to install bcryptjs to use the passwordHash option.
const bcrypt = require('bcryptjs');
const saltRounds = 10;

//----------

// this is a GET to the SIGNUP page form
router.get("/signup", (req, res, next) => {
  res.render('auth/signup');
});
// this is a POST to register a new user / catch the data of the SIGNUP form
router.post('/signup', async (req, res, next) => {
    console.log(req.body)

    //Lines 19 and 20: makes a shallow copy of req.body and sends it to passwordHash and delete the payload afterwards.
    const payload = { ...req.body }
   
    delete payload.password //removes the password file to avoid pushing it to the database.
    const salt = bcrypt.genSaltSync(13) //generate salt 
    payload.passwordHash = bcrypt.hashSync(req.body.password, salt) //password hashing 

    try {
        const newUser = await User.create(payload)
        res.send(newUser)
      } catch (error) {
        console.log(error)
      }

  });

//----------

// this is a GET to the LOGIN page form
router.get("/login", (req, res, next) => {
    res.render("auth/login");
  });
  
  // this is a POST to check if our user is registered
  router.post("/login", async (req, res, next) => {
    console.log(req.body) //check if the information is being received correctly when submitted.

    try {
        const checkedUser = await User.findOne({ email: req.body.email  })
        console.log('checkedUser: ', checkedUser)
    } catch (error) {
        console.log('error in login POST', error)
    }


    });

module.exports = router;