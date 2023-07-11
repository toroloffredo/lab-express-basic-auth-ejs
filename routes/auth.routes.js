const express = require('express');
const router = express.Router();

//----------

// this is a GET to the SIGNUP page form
router.get("/signup", (req, res, next) => {
  res.render('auth/signup');
});
// this is a POST to catch the data of the SIGNUP form
router.post("/signup", (req, res, next) => {
    res.render("index");
  });

//----------

// this is a GET to the LOGIN page form
router.get("/login", (req, res, next) => {
    res.render("index");
  });
  
  // this is a POST to check if our user is registered
  router.post("/login", (req, res, next) => {
      res.render("index");
    });

module.exports = router;