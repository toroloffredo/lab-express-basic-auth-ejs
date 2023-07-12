// require session
const session = require('express-session');
// ADDED: require mongostore
const MongoStore = require('connect-mongo');

// ADDED: require mongoose
const mongoose = require('mongoose');
 
// since we are going to USE this middleware in the app.js,
// let's export it and have it receive a parameter
module.exports = app => {
  // <== app is just a placeholder here
  // but will become a real "app" in the app.js
  // when this file gets imported/required there
 
  // required for the app when deployed to Heroku (in production)
  app.set('trust proxy', 1);
 
  // use session
  app.use(
    session({
      secret: process.env.SESS_SECRET, // copy sess-secret to .env and assign a keyword or there will be an error that it needs the session secret -j
      resave: true,
      saveUninitialized: false,
      cookie: {
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',  // dictates if a cookie can be accesses from a different domain our only the original
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true, // when set to true, JS can't access it from the frontend
        maxAge: 60000 // 60 * 1000 ms === 1 min - dictates the lifecycle of the cookie
      },
        store: MongoStore.create ({  // this store will create a new collection in our database -j
        mongoUrl: process.env.MONGODB_URI || "mongodb://127.0.0.1/lab-express-basic-auth" //this should have the same path as in the db/index.js line 8 -j

        // ttl => time to live - this usually has the same life as the cookie -j
        // ttl: 60 * 60 * 24 // 60sec * 60min * 24h => 1 day
        })
    })
  )
};