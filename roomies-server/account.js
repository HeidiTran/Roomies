const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
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
};
