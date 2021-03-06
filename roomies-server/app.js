const express = require("express");
const app = express();
const accountModule = require("./account");
const houseModule = require("./house");
const groceryModule = require("./grocery");
const choreModule = require("./chore");

const port = 3000;
const hostname = "localhost";
const { response } = require("express");

app.use(express.json());

// Config CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

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
app.post("/signIn", (req, res) => {
  return signin(req, res);
});

/**
 * Ticket: https://trello.com/c/HEytgbbh
 * This API endpoint authenticates user for signing into personal account
 * Returns status code 200 and and empty body if sucess
 */
app.get("/getUsers", authenticateJWT, verifyUserInHouse, (req, res) => {
  return getUsers(req, res);
});

/**
 * Ticket: https://trello.com/c/r9tFQ3mI
 * This API endpoint creates a new house
 * Returns status code 200 and and empty body if success
 */
app.post("/createNewHouse", authenticateJWT, (req, res) => {
  return createNewHouse(req, res);
});

/**
 * Ticket: https://trello.com/c/r9tFQ3mI
 * This API endpoint authenticates before joining an existing house
 * Returns status code 200 and and empty body if sucess
 */
app.post("/joinHouse", authenticateJWT, (req, res) => {
  return joinHouse(req, res);
});

/**
 * Ticket: https://trello.com/c/JNVH6ycc
 * This API return all items in the grocery list
 */
app.get("/getAllItems", authenticateJWT, verifyUserInHouse, (req, res) => {
  return getAllItems(req, res);
});

/**
 * Ticket: https://trello.com/c/JNVH6ycc
 * This API return an item in the grocery list based on id
 */
app.get("/getItem/:itemId", authenticateJWT, verifyUserInHouse, (req, res) => {
  return getItem(req, res);
});

/**
 * Ticket: https://trello.com/c/JNVH6ycc
 * This API endpoint create a new item in the grocery list
 */
app.post("/addItem", authenticateJWT, verifyUserInHouse, (req, res) => {
  return addItem(req, res);
});

/**
 * Ticket: https://trello.com/c/JNVH6ycc
 * This API endpoint edit an existing item in the grocery list
 */
app.put("/editItem/:itemId", authenticateJWT, verifyUserInHouse, (req, res) => {
  return editItem(req, res);
});

/**
 * Ticket: https://trello.com/c/JNVH6ycc
 * This API endpoint delete an existing item in the grocery list
 */
app.delete("/deleteItem/:itemId", authenticateJWT, verifyUserInHouse, (req, res) => {
  // TODO: Check if itemId is in the query string

  return deleteItem(req, res);
});

/**
 * Ticket: https://trello.com/c/W7jxsWvZ
 * This API endpoint check item as bought in the grocery list
 */
app.put("/boughtItem/:itemId", authenticateJWT, verifyUserInHouse, (req, res) => {
  // TODO: Check if itemId is in the query string
  return boughtItem(req, res);
});

/**
 * Ticket: https://trello.com/c/YX1t6cb9
 * This API return all tasks in the chore list
 */
app.get("/getAllTasks", authenticateJWT, verifyUserInHouse, (req, res) => {
  return getAllTasks(req, res);
});

/**
 * Ticket: https://trello.com/c/YX1t6cb9
 * This API return an task in the chore list based on id
 */
app.get("/getTask/:taskId", authenticateJWT, verifyUserInHouse, (req, res) => {
  // TODO: Check if taskId is in the query string

  const taskId = parseInt(req.params.taskId);
  return getTask(req, res, taskId);
});

/**
 * Ticket: https://trello.com/c/YX1t6cb9
 * This API endpoint create a new task in the chore list
 */
app.post("/addTask", authenticateJWT, verifyUserInHouse, (req, res) => {
  return addTask(req, res);
});

/**
 * Ticket: https://trello.com/c/YX1t6cb9
 * This API endpoint edit an existing task in the chore list
 */
app.put("/editTask/:taskId", authenticateJWT, verifyUserInHouse, (req, res) => {
  // TODO: Check if taskId is in the query string

  const taskId = parseInt(req.params.taskId);
  return editTask(req, res, taskId);
});

/**
 * Ticket: https://trello.com/c/YX1t6cb9
 * This API endpoint marks an existing task as complete in the chore list
 */
app.put("/doneTask/:taskId", authenticateJWT, verifyUserInHouse, (req, res) => {
  // TODO: Check if taskId is in the query string

  const taskId = parseInt(req.params.taskId);
  return doneTask(req, res, taskId);
});

/**
 * Ticket: https://trello.com/c/YX1t6cb9
 * This API endpoint delete an existing task in the chore list
 */
app.delete("/deleteTask/:taskId", authenticateJWT, verifyUserInHouse, (req, res) => {
  // TODO: Check if taskId is in the query string

  const taskId = parseInt(req.params.taskId);
  return deleteTask(req, res, taskId);
});

app.listen(port, hostname, () => {
  console.log(`Listening at: http://${hostname}:${port}`);
});