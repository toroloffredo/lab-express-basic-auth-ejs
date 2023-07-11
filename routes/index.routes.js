const express = require('express');
const router = express.Router();

/* GET home page */
router.get("/", (req, res, next) => {
  console.log(req.session)
  
  
  res.render("index");
});

/* GET profile page */
router.get("/profile", (req, res, next) => {
  console.log(req.session)
  if (!req.session.user) {
    res.redirect('/auth/login') //if cookie expires, this will send you back to the login page
  }  
  res.render('profile', {user: req.session.user}) // this will render the profile page
});

module.exports = router;