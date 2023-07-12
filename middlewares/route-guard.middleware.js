
// checks if the user is logged in when trying to access a specific page
const isLoggedIn = (req, res, next) => {
    if (!req.session.currentUser) {
      return res.redirect('/auth/login'); // update this to have the correct path -j
    }
    next(); //calls the next function in line/queue
  };
   
  // if an already logged in user tries to access the login page it
  // redirects the user to the home page
  const isLoggedOut = (req, res, next) => {
    if (req.session.currentUser) {
      return res.redirect('/');
    }
    next();
  };

  const isAdmin = (req, res, next) => {
    if (req.session.user.role !== 'admin') {
      return res.redirect('/');
    }
    next();
  };
   
  //this exports the two functions above by their name.  -j
  module.exports = {
    isLoggedIn,
    isLoggedOut,
    isAdmin,
  };