const express = require("express");
const app = express();
const accountModule = require("./account");
const houseModule = require("./house");
const groceryModule = require("./grocery");

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
app.get("/getAllItems", (req, res) => {
  return getAllItems(req, res);
});

/**
 * Ticket: https://trello.com/c/JNVH6ycc
 * This API return an item in the grocery list based on id
 */
app.get("/getItem/:itemId", (req, res) => {
  return getItem(req, res);
});

/**
 * Ticket: https://trello.com/c/JNVH6ycc
 * This API endpoint create a new item in the grocery list
 */
app.post("/addItem", (req, res) => {
  return addItem(req, res);
});

/**
 * Ticket: https://trello.com/c/JNVH6ycc
 * This API endpoint edit an existing item in the grocery list
 */
app.put("/editItem/:itemId", (req, res) => {
  return editItem(req, res);
});

/**
 * Ticket: https://trello.com/c/JNVH6ycc
 * This API endpoint delete an existing item in the grocery list
 */
app.delete("/deleteItem/:itemId", (req, res) => {
  // TODO: Check if itemId is in the query string

  return deleteItem(req, res);
});

app.listen(port, hostname, () => {
  console.log(`Listening at: http://${hostname}:${port}`);
});
