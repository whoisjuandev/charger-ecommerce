const passport = require("passport");
const server = require("express").Router();
const { User, InfoUser } = require("../db.js");
const { isAuthenticated, isNotAuthenticated, isAdmin } = require("../passport");

// All users
server.get("/", isAdmin, (req, res, next) => {
  User.findAll({ include: [InfoUser] })
    .then((users) => {
      res.status(200).send(users);
    })
    .catch(next);
});

// Logout
server.get("/logout", isAuthenticated, (req, res) => {
  req.logOut();
  res.send({ message: "logout" });
});

// Login
server.post(
  "/login",
  isNotAuthenticated,
  passport.authenticate("local"),
  (req, res) => {
    res.send({ user: req.user, logged: true });
  }
);

// Check if is logged
server.get("/getuser", isAuthenticated, (req, res) => {
  res.send({ user: req.user, logged: true });
});

// Create Users
server.post("/", (req, res, next) => {
  const { email, password, name, lastName, address } = req.body;

  if (!email || !password || !name || !lastName || !address) {
    return res.status(400).send({ text: "Invalid data" });
  }

  User.create({
    email,
    password,
    rol: "client",
  })
    .then((createdUser) => {
      return createdUser.createInfoUser({
        name,
        lastName,
        address,
      });
    })
    .then((createdUser) => {
      res.status(200).send({
        text: "User created succesfully!",
        createdUser: createdUser.dataValues,
      });
    })
    .catch((err) => {
      res.status(500).send({ text: err });
    });
});

server.post('/modify', isAuthenticated, (req, res) => {
  let id = null;
  if(req.user.rol === 'admin' && req.body.id) {
    id = req.body.id;
  } else {
    id = req.user.id;
  }
  const { email, password, apassword, repassword, name, lastName, address } = req.body;

  if (!email && !(password && repassword && apassword) && !name && !lastName && !address) {
    return res.status(400).send({ text: "Invalid data" });
  }

  let user = null;

  User.findOne({
    where: {
      id: id,
    },
    include: InfoUser,
  })
    .then((userFinded) => {
      user = userFinded;
      if(email) {
        user.email = email;
        req.user.email = email;
      }

      if(password) {
        console.log(`${apassword} === ${user.password} && ${password} === ${repassword}`)
        if(!(apassword === user.password && password === repassword)) {
          return res.status(400).send({message: 'Invalid data'});
        }
        user.password = password;
      } 
      
      if(name) {
        user.infoUser.name = name;
        req.user.name = name;
      }

      if(lastName) {
        user.infoUser.lastName = lastName;
        req.user.lastName = lastName;
      }

      if(address) {
        user.infoUser.address = address;
        req.user.address = address;
      }

      return user.save();
    })
    .then((user) => {
      return user.infoUser.save();
    })
    .then((userUpdated) => {
      res.send({ text: "User updated", user: req.user });
    })
    .catch((err) => {
      res.status(500).send({ text: "Internal error" });
      console.error(err);
    });
});

// Modify Users
server.put("/:id", isAdmin, (req, res, next) => {
  const { email, password, name, lastName, address } = req.body;
  const { id } = req.params;

  if(parseInt(id) === NaN) {
    return next();
  }

  if (!id || (!email && !password && !name && !lastName && !address)) {
    return res.status(400).send({ text: "Invalid data" });
  }

  let user = null;

  User.findOne({
    where: {
      id: id,
    },
    include: InfoUser,
  })
    .then((userFinded) => {
      console.log(user);
      user = userFinded;
      if(email)
        user.email = email;
      if(password)
        user.password = password;
      if(name)
        user.infoUser.name = name;
      if(lastName)
        user.infoUser.lastName = lastName;
      if(address)
        user.infoUser.address = address;

      return user.save();
    })
    .then((user) => {
      return user.infoUser.save();
    })
    .then((userUpdated) => {
      res.send({ text: "User updated", userUpdated: userUpdated.dataValues });
    })
    .catch((err) => {
      res.status(500).send({ text: "Internal error" });
      console.error(err);
    });
});

//Remove Users

server.delete("/:id", isAdmin,(req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).send({ text: "Invalid id" });
  }

  User.destroy({
    where: {
      id: parseInt(id),
    },
  })
    .then(() => {
      res.send({ text: "User deleted" });
    })
    .catch(() => {
      res.status(500).send({ text: "Internal error" });
    });
});

// Set user rol to admin
server.put("/usertoadmin/:id", isAdmin, (req, res) => {
  const { id } = req.params;

  User.findByPk(id)
    .then((user) => {
      return user.update({ rol: "admin" })
    })
    .then((newAdmin) => {
      res.send({
        text: newAdmin.email + " is an admin now!",
      });
    });
});
//Change password
server.put("/password/:email", (req, res) => {
  const userEmail = req.params.email;
  const newPass = req.body.password;
  User.findOne({
    where: {
      email: userEmail,
    },
  }).then((forgotUser) => {
    forgotUser
      .update({
        password: newPass,
      })
      .then((updatedUser) => {
        res.send(updatedUser);
      });
  });
});


module.exports = server;
