const pg = require("pg");
const express = require("express");
const app = express();
const accountModule = require("./account");
const houseModule = require("./house");
const bcrypt = require("bcrypt");
const port = 3000;
const hostname = "localhost";

const env = require("./env.json");
const { response } = require("express");
const Pool = pg.Pool;
const pool = new Pool(env);
function ValidateEmail(email) 
{
	return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
}
function ValidateUsername(username){
	return /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/.test(email)
}
const saltRounds = 10;
function check_signin(body){
	if (
        !body.hasOwnProperty("username") ||
        !body.hasOwnProperty("password") ||
		!body.hasOwnProperty("email") ||
		typeof body.username != 'string' ||
		typeof body.password != 'string' ||
		!body.password.length > 8 ||
		!ValidateEmail(body.email)
		){
			console.log(!body.hasOwnProperty("username"))
console.log(!body.hasOwnProperty("password"))
console.log(!body.hasOwnProperty("email"))
console.log(typeof body.username != 'string')
console.log(typeof body.password != 'string')
console.log(body.password.length > 8)
console.log(!ValidateEmail(body.email))
			console.log("IT FAILED")
			return 1
		} 
	else{
		console.log("WORKED")
		pool.query(
                "SELECT username FROM Users where username = $1)",
                [body.username]
            )
                .then(function (response) {
					console.log(response.rows.length)
					return response.rows.length
                })
                .catch(function (error) {
                    console.log(error);
                    return 500// server error
                });
	}
	
}

module.exports = createNewUserAccount = (req, res) => {
  // TODO: Validation: check body has username, password, etc
  // TODO: Check if username already exists
  // TODO: Insert into DB (status 500 if fail to insert)
  // TODO: Send empty response with status 200 if success
  let body = req.body
  let check = check_signin(body);
  if (check_signin(body)) {
	  
	  res.status(401);
	  res.header("Content-Type", "text/plain");
	  res.send();
  }
  else if(check_signin(body) === 500){
	  res.sendstatus(500)
  }
  else{
	  bcrypt
        .hash(body.password, saltRounds)
        .then(function (hashedPassword) {
            pool.query(
                "INSERT INTO Users (username, password, email_addr) VALUES ($1, $2, $3)",
                [body.username, hashedPassword, body.email]
            )
                .then(function (response) {
                    // account successfully created
                    res.status(200).send();
                })
                .catch(function (error) {
                    res.status(500).send(); // server error
                });
        })
        .catch(function (error) {
            console.log(error);
            res.status(500).send(); // server error
        });
  }
  
  console.log("createNewUserAccount function runs");
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
