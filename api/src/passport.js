function isAuthenticated(req, res, next) {
  if(req.isAuthenticated())
    return next();
  else
    return res.status(401).send();
}
  
function isNotAuthenticated(req, res, next) {
  if(!req.isAuthenticated())
    return next();
  else
    return res.status(401).send();
}

function isAdmin(req, res, next) {
  if((req.body.adminKey && req.body.adminKey === process.env.ADMIN_KEY) || (req.user && req.user.rol === "admin")) {
    return next();
  } else {
    return res.status(401).send();
  }
}

function isNotAdmin(req, res, next) {
  if(!!req.user === false || req.user.rol !== "admin") {
    return next;
  } else {
    return res.status(401).send();
  }
}

module.exports = {
    isAuthenticated,
    isNotAuthenticated,
    isAdmin,
    isNotAdmin
}