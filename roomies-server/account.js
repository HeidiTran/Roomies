const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const pg = require("pg");
const env = require("./env.json");

const Pool = pg.Pool;
const pool = new Pool(env);

function isValidEmail(email) {
  return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
}
function isValidUsername(username) {
  return /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/.test(
    username
  );
}

async function usernameAlreadyExists(username) {
  try {
    const { rows } = await pool.query(
      "SELECT * FROM Users WHERE username = $1",
      [username]
    );

    if (rows.length != 0) return true;
    else return false;
  } catch (error) {
    throw Error(error);
  }
}

async function emailAlreadyExists(email) {
  try {
    const { rows } = await pool.query(
      "SELECT * FROM Users WHERE email_addr = $1",
      [email]
    );

    if (rows.length != 0) return true;
    else return false;
  } catch (error) {
    throw Error(error);
  }
}

async function hashPassword(pwd) {
  const hash = await bcrypt.hash(pwd, 10);
  if (hash) return hash;

  throw Error(err);
}

async function comparePassword(pwd, hash) {
  return await bcrypt.compare(pwd, hash);
}

function isValidNewUserAccountForm(body) {
  if (
    !body.hasOwnProperty("username") ||
    !body.hasOwnProperty("password") ||
    !body.hasOwnProperty("email") ||
    typeof body.username != "string" ||
    typeof body.password != "string" ||
    !body.password.length > 8 ||
    !isValidEmail(body.email) ||
	!isValidUsername(body.username)
  ) {
    return false;
  } else {
    return true;
  }
}

function validateSignInInput(body) {
  if (
    !body.hasOwnProperty("username") ||
    !body.hasOwnProperty("password") ||
    typeof body.username != "string" ||
    typeof body.password != "string"
  ) {
    return false;
  } else {
    return true;
  }
}

module.exports = createNewUserAccount = async (req, res) => {
  let body = req.body;
  //Check body has username, password, etc
  if (!isValidNewUserAccountForm(body)) {
    return res.status(400).send({});
  }

  //Check if username already exists
  if (usernameAlreadyExists(body.username) || emailAlreadyExists(body.email)) {	
    return res.status(400).send({});
  }

  try {
    let hashedPWD = await hashPassword(body.password);
    //Insert into DB
    let result = await pool.query(
      "INSERT INTO Users (username, password, email_addr) VALUES ($1, $2, $3)",
      [body.username, hashedPWD, body.email]
    );
    return res.status(200).send({});
  } catch (error) {
    console.log(error);
    return res.status(500).send({});
  }
};

module.exports = signin = async (req, res) => {
  let body = req.body;

  //Check body has username, password
  if (!validateSignInInput(body)) {
    return res.status(400).send({});
  }

  try {
    const { rows } = await pool.query(
      "SELECT * FROM Users WHERE username = $1",
      [body.username]
    );
    const user = rows[0];
    const isPasswordCorrect = await comparePassword(
      body.password,
      user.password
    );

    if (!isPasswordCorrect) return res.status(403).send({});

    const accessToken = jwt.sign(
      { username: user.username, email: user.email },
      env.accessTokenSecret
    );

    return res.status(200).json({
      accessToken,
    });
    
  } catch (error) {
    console.log(error);
    return res.status(500).send({});
  }
};

module.exports = authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, env.accessTokenSecret, (err, user) => {
      if (err) {
        return res.status(403).send({});
      }

      req.user = user;
      next();
    });
  } else {
    res.status(401).send({});
  }
};

/*
Furthermore,
To have access to a user for a route , add authenticateJWT middleware to the route
See example below
// app.get('/test', authenticateJWT, (req, res) => {
//   console.log(req.user); //(req.user should provide you with the users details)
// });
*/
