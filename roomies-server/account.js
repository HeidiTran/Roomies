const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const pg = require("pg");
const bcrypt = require("bcrypt");
const env = require("./env.json");

const users = [
  {
    username: 'hussain',
    password: 'test123',
    role: 'admin'
  }, {
    username: 'mustafa',
    password: 'test123',
    role: 'memebr'
  }
];

const { response } = require("express");
const Pool = pg.Pool;
const pool = new Pool(env);

function ValidateEmail(email) {
  return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
}
function ValidateUsername(username) {
  return /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/.test(email)
}

function check_signin(body) {
  if (
    !body.hasOwnProperty("username") ||
    !body.hasOwnProperty("password") ||
    !body.hasOwnProperty("email") ||
    typeof body.username != 'string' ||
    typeof body.password != 'string' ||
    !body.password.length > 8 ||
    !ValidateEmail(body.email)
  ) {
    console.log(!body.hasOwnProperty("username"))
    console.log(!body.hasOwnProperty("password"))
    console.log(!body.hasOwnProperty("email"))
    console.log(typeof body.username != 'string')
    console.log(typeof body.password != 'string')
    console.log(body.password.length > 8)
    console.log(!ValidateEmail(body.email))
    console.log("IT FAILED")
    return 1
  }
  else {
    console.log("WORKED")
    pool.query(
      "SELECT username FROM Users where username = $1)",
      [body.username]
    )
      .then(function (response) {
        console.log(response.rows.length)
        return response.rows.length
      })
      .catch(function (error) {
        console.log(error);
        return 500// server error
      });
  }

  function hashPassword(pwd) {
    bcrypt.hash(pwd, 10, (err, hash) => {
      if (err) {
        throw Error(err)
      }
      return hash
    });
  }

  module.exports = createNewUserAccount = (req, res) => {
    // TODO: Validation: check body has username, password, etc
    // TODO: Check if username already exists
    // TODO: Insert into DB (status 500 if fail to insert)
    // TODO: Send empty response with status 200 if success
    let body = req.body
    let check = check_signin(body);
    if (check_signin(body)) {

      res.status(401);
      res.header("Content-Type", "text/plain");
      res.send();
    }
    else if (check_signin(body) === 500) {
      res.sendstatus(500)
    }
    else {
      bcrypt
        .hash(body.password, saltRounds)
        .then(function (hashedPassword) {
          pool.query(
            "INSERT INTO Users (username, password, email_addr) VALUES ($1, $2, $3)",
            [body.username, hashedPassword, body.email]
          )
            .then(function (response) {
              // account successfully created
              res.status(200).send();
            })
            .catch(function (error) {
              res.status(500).send(); // server error
            });
        })
        .catch(function (error) {
          console.log(error);
          res.status(500).send(); // server error
        });
    }

    console.log("createNewUserAccount function runs");
    return res.status(200).send();
  };

  module.exports = signin = (req, res) => {
    //Check body has username, password, etc
    console.log(req.body)
    if (!('username' in req.body) || !('password' in req.body)) {
      return res.status(401).send({})
    }
    const { username, password } = req.body;
    //Retrieve user
    const user = users.find(u => { return u.username === username && u.password === password });
    // TODO: Get password hash and check if matches
    // TODO: Send empty response with status 200 if success
    if (user) {
      //Generate an access token
      const accessToken = jwt.sign({ username: user.username, role: user.role }, env.accessTokenSecret);
      return res.status(200).json({
        accessToken
      });
    } else {
      return res.status(400).json({
        "error": "Username or password incorrect"
      });
    }
  };

  module.exports = authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
      const token = authHeader.split(' ')[1];

      jwt.verify(token, env.accessTokenSecret, (err, user) => {
        if (err) {
          return res.sendStatus(403);
        }

        req.user = user;
        next();
      });
    } else {
      res.sendStatus(401);
    }
  }
};
