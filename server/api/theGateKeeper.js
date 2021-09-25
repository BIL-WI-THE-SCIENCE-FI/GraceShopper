const isLoggedIn = (req, res, next) => {
  const authorizedHeader = req.headers.authorization;
  console.log('hello world', authorizedHeader);
  if (!authorizedHeader) {
    return res.status(403).json({
      status: 403,
      message: 'ACCESS DENIED',
    });
  } else {
    next();
  }
};

const isAdmin = (req, res, next) => {
  const authorizedHeader = req.headers.authorization;
  console.log('Hello World');
  if (!authorizedHeader) {
    return res.status(403).json({
      status: 403,
      message: 'ACCESS DENIED',
    });
  } else {
    next();
  }
};

module.exports = { router, isLoggedIn, isAdmin };
// this is to protect against backend unwanted actions
// function to check for admin and logged in

// if admin then next and permission denied response
// function check if save user and logged in
// if saved user then next else permission denied response
