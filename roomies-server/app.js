const pg = require("pg");
const express = require("express");
const app = express();

const port = 3000;
const hostname = "localhost";

const env = require("env.json");
const { response } = require("express");
const Pool = pg.Pool;
const pool = new Pool(env);
pool.connect().then(function () {
  console.log(`Connected to database ${env.database}`);
});

app.use(express.json());

/********************************************************
 * PLEASE DO NOT DELETE ANY COMMENTS IN THIS FILE!
 * ******************************************************
 */

 /**
  * Ticket: https://trello.com/c/C88wyI3w
  * This API endpoint creates a new user account 
  * Returns status code 200 and and empty body if success
  */
app.post("/createUserAccount", (req, res) => {
  // TODO: Validation: check body has username, password, etc
  // TODO: Check if username already exists
  // TODO: Insert into DB (status 500 if fail to insert)
  // TODO: Send empty response with status 200 if success
});

 /**
  * Ticket: https://trello.com/c/C88wyI3w
  * This API endpoint authenticates user for signing into personal account
  * Returns status code 200 and and empty body if sucess
  */
app.post("/signin", (req, res) => {
  // TODO: Validation: check body has username, password, etc
  // TODO: Check if username exists
  // TODO: Get password hash and check if matches
  // TODO: Send empty response with status 200 if success 
});

 /**
  * Ticket: https://trello.com/c/r9tFQ3mI
  * This API endpoint creates a new house
  * Returns status code 200 and and empty body if success
  */
 app.post("/createNewHouse", (req, res) => {
  // TODO: Validation: check body has houseName, password, etc
  // TODO: Insert into DB (status 500 if fail to insert)
  // TODO: Send empty response with status 200 if success
});

 /**
  * Ticket: https://trello.com/c/r9tFQ3mI
  * This API endpoint authenticates before joining an existing house
  * Returns status code 200 and and empty body if sucess
  */
 app.post("/joinHouse", (req, res) => {
  // TODO: Validation: check body has houseName, password, etc
  // TODO: Check if houseName exists
  // TODO: Get password hash and check if matches
  // TODO: Send empty response with status 200 if success 
});

app.listen(port, hostname, () => {
  console.log(`Listening at: http://${hostname}:${port}`);
});
