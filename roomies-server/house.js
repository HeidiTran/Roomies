const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const pg = require("pg");
const env = require("./env.json");

const Pool = pg.Pool;
const pool = new Pool(env);

async function hashPassword(pwd) {
  const hash = await bcrypt.hash(pwd, 10);
  if (hash) return hash;

  throw Error(err);
}

async function comparePassword(pwd, hash) {
  return await bcrypt.compare(pwd, hash);
}

async function getUserData(username) {
  let result = await pool.query(
    "SELECT * FROM Users WHERE username=$1",
    [username]
  );
  return result.rows[0];
}

async function getHouseData(name) {
  let result = await pool.query(
    "SELECT * FROM Houses WHERE name=$1",
    [name]
  );
  if (result.rows.length > 0) return result.rows[0];
  return null;
}

function isValidNewHouseInputs(body) {
  if (
    !body.hasOwnProperty("name") ||
    !body.hasOwnProperty("password")
  ) {
    return false;
  }

  if (
    typeof body.name != "string" ||
    typeof body.password != "string" ||
    body.password.length < 8) {
    return false
  }

  return true;
}

async function isAlreadyInHouse(username) {
  try {
    let user = await getUserData(username)
    if (user.house_id) {
      return true;
    }
    return false;
  } catch (error) {
    console.log(error);
    return true;
  }
}


module.exports = createNewHouse = async (req, res) => {
  let body = req.body;
  let user = req.user;
  //Check body has name, password, etc
  if (!isValidNewHouseInputs(body)) {
    return res.status(400).send({});
  }

  //Check if house exists
  let houseExists = getHouseData(body.name);
  if (houseExists != null) {
    return res.status(405).send({});
  }

  //Insert into DB
  try {
    let hashedPWD = await hashPassword(body.password);
    let result = await pool.query(
      "INSERT INTO Houses (name, password) VALUES ($1, $2)",
      [body.name, hashedPWD]
    );
    return res.status(200).send({});
  } catch (error) {
    console.log(error);
    return res.status(500).send({});
  }
};

module.exports = joinHouse = async (req, res) => {
  let body = req.body;
  let user = req.user;

  //Check body has name, password, etc
  if (!isValidNewHouseInputs(body)) {
    return res.status(400).send({});
  }

  //Check user already not part of a house
  let isInHouse = await isAlreadyInHouse(user.username);
  if (isInHouse) {
    return res.status(405).send({});
  }

  try {
    let house = await getHouseData(body.name)
    let isPasswordCorrect = await comparePassword(
      body.password,
      house.password
    );
    if (!isPasswordCorrect) {
      throw Error("Incorrect Password")
    }
    let result = await pool.query(
      "UPDATE Users SET house_id=$1 WHERE username=$2;",
      [house.house_id, user.username]
    );
    return res.status(200).send();
  } catch (error) {
    console.log(error);
    return res.status(500).send({});
  }
};