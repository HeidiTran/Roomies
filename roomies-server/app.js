const express = require("express");
const app = express();
const accountModule = require("./account");
const houseModule = require("./house");

const port = 3000;
const hostname = "localhost";
const { response } = require("express");

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

app.listen(port, hostname, () => {
  console.log(`Listening at: http://${hostname}:${port}`);
});
