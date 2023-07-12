const express = require('express');
const { isLoggedIn, isAdmin } = require('../middlewares/route-guard.middleware');
const router = express.Router();

/* GET home page */
router.get("/", (req, res, next) => {
  console.log(req.session)
  
  
  res.render("index");
});

//GET profile page version with middleware (isLoggedIn) -j
router.get('/profile', isLoggedIn, isAdmin, (req, res, next) => {
  res.render('profile', {user: req.session.user}) //the next from the middleware will call this callback when hitting next() -j
})

/* - this is the version without middleware -j
// GET profile page 
router.get("/profile", (req, res, next) => {
  console.log(req.session)
  if (!req.session.user) {
    res.redirect('/auth/login') //if cookie expires, this will send you back to the login page -j
  }  
  res.render('profile', {user: req.session.user}) // this will render the profile page -j
});
*/

module.exports = router;


// handler is the last function that will do something and respond back to the user -j