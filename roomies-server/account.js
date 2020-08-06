const pg = require("pg");
const env = require("./env.json");
const Pool = pg.Pool;
const pool = new Pool(env);

/**
 * Connect to roomies database
 */
pool.connect().then(function () {
  console.log(`Connected to database ${env.database}`);
});

module.exports = createNewUserAccount = (req, res) => {
  // TODO: Validation: check body has username, password, etc
  // TODO: Check if username already exists
  // TODO: Insert into DB (status 500 if fail to insert)
  // TODO: Send empty response with status 200 if success
  console.log("createNewUserAccount function runs");

  // Just an example. You can safely delete this
  pool.query("SELECT * from users").then(function (response) {
    console.log(response);
  });

  return res.status(200).send();
};

module.exports = signin = (req, res) => {
  // TODO: Validation: check body has username, password, etc
  // TODO: Check if username exists
  // TODO: Get password hash and check if matches
  // TODO: Send empty response with status 200 if success
  console.log("signin function runs");
  return res.status(200).send();
};
