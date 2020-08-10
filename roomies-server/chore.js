const pg = require("pg");
const env = require("./env.json");

const Pool = pg.Pool;
const pool = new Pool(env);

/**
 * Connect to roomies database
 */
pool.connect();

module.exports = getAllTasks = (req, res) => {
  return res.status(200).send();
};

module.exports = getTask = (req, res, taskId) => {
  return res.status(200).send();
};

module.exports = addTask = (req, res) => {
  return res.status(200).send();
};

module.exports = editTask = (req, res, taskId) => {
  return res.status(200).send();
};

module.exports = deleteTask = (req, res, taskId) => {
  return res.status(200).send();
};