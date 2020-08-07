const pg = require("pg");
const env = require("./env.json");

const Pool = pg.Pool;
const pool = new Pool(env);

/**
 * Connect to roomies database
 */
pool.connect();

module.exports = getAllItems = (req, res) => {
  return res.status(200).send();
};

module.exports = getItem = (req, res, itemId) => {
  return res.status(200).send();
};

module.exports = addItem = (req, res) => {
  return res.status(200).send();
};

module.exports = editItem = (req, res, itemId) => {
  return res.status(200).send();
};

module.exports = deleteItem = (req, res, itemId) => {
  return res.status(200).send();
};
