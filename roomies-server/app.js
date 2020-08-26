const pg = require("pg");
const express = require("express");
const app = express();
const accountModule = require("./account");
const houseModule = require("./house");
const choreModule = require("./chore");

const port = 3000;
const hostname = "localhost";

const env = require("./env.json");
const { response } = require("express");
const Pool = pg.Pool;
const pool = new Pool(env);

/**
 * Connect to roomies database
 */
pool.connect().then(function () {
  console.log(`Connected to database ${env.database}`);
});

app.use(express.json());

/********************************************************
 * PLEASE DO NOT EDIT OR DELETE ANY COMMENTS IN THIS FILE!
 * ******************************************************
 */

/**
 * Ticket: https://trello.com/c/C88wyI3w
 * This API endpoint creates a new user account
 * Returns status code 200 and and empty body if success
 */
app.post("/createNewUserAccount", (req, res) => {
  return createNewUserAccount(req, res);
});

/**
 * Ticket: https://trello.com/c/C88wyI3w
 * This API endpoint authenticates user for signing into personal account
 * Returns status code 200 and and empty body if sucess
 */
app.post("/signin", (req, res) => {
  return signin(req, res);
});

/**
 * Ticket: https://trello.com/c/r9tFQ3mI
 * This API endpoint creates a new house
 * Returns status code 200 and and empty body if success
 */
app.post("/createNewHouse", (req, res) => {
  return createNewHouse(req, res);
});

/**
 * Ticket: https://trello.com/c/r9tFQ3mI
 * This API endpoint authenticates before joining an existing house
 * Returns status code 200 and and empty body if sucess
 */
app.post("/joinHouse", (req, res) => {
  return joinHouse(req, res);
});

/**
 * Ticket: https://trello.com/c/YX1t6cb9
 * This API return all tasks in the chore list
 */
app.get("/getAllTasks", (req, res) => {
  return getAllTasks(req, res);
});

/**
 * Ticket: https://trello.com/c/YX1t6cb9
 * This API return an task in the chore list based on id
 */
app.get("/getTask/:taskId", (req, res) => {
  // TODO: Check if taskId is in the query string

  const taskId = parseInt(req.params.taskId);
  return getTask(req, res, taskId);
});

/**
 * Ticket: https://trello.com/c/YX1t6cb9
 * This API endpoint create a new task in the chore list
 */
app.post("/addTask", (req, res) => {
  return addTask(req, res);
});

/**
 * Ticket: https://trello.com/c/YX1t6cb9
 * This API endpoint edit an existing task in the chore list
 */
app.put("/editTask/:taskId", (req, res) => {
  // TODO: Check if taskId is in the query string

  const taskId = parseInt(req.params.taskId);
  return editTask(req, res, taskId);
});

/**
 * Ticket: https://trello.com/c/YX1t6cb9
 * This API endpoint marks an existing task as complete in the chore list
 */
app.put("/doneTask/:taskId", (req, res) => {
  // TODO: Check if taskId is in the query string

  const taskId = parseInt(req.params.taskId);
  return doneTask(req, res, taskId);
});

/**
 * Ticket: https://trello.com/c/YX1t6cb9
 * This API endpoint delete an existing task in the chore list
 */
app.delete("/deleteTask/:taskId", (req, res) => {
  // TODO: Check if taskId is in the query string

  const taskId = parseInt(req.params.taskId);
  return deleteTask(req, res, taskId);
});

app.listen(port, hostname, () => {
  console.log(`Listening at: http://${hostname}:${port}`);
});
