const pg = require("pg");
const env = require("./env.json");

const Pool = pg.Pool;
const pool = new Pool(env);

/**
 * Connect to roomies database
 */
pool.connect();
function parseIntValidation(object) {
  try {
    let intObj;
	let strObj;
	
	if(object){
		intObj = parseInt(object)
		strObj = intObj.toString()
		console.log(intObj)
		if (strObj.length === object.length){
			return intObj;
		}
		else{
			return false
		}
	}
	else{
		console.log("no")
		return false
	}
  } catch (error) {
    throw Error(error);
  }
}

module.exports = getAllItems = async (req, res) => {
  // TODO: check if houseId is in the request query
	
	let houseId = parseIntValidation(req.query.houseId);
	console.log(houseId);
	if (houseId){
		try {
			console.log("here?");
			const { rows } = await pool.query(
			  "SELECT * FROM Items where house_id = $1",
			  [houseId]
			);

			if (rows.length > 0){
				return res.status(200).json({"Items":rows})
			}
			else{
				return res.status(500).send({});
			}
	  } catch (error) {
		  console.log(error)
		  return res.status(500).send({});
		}
		
	}
	else{
		return res.status(500).send({});
	}
	
};

module.exports = getItem = async (req, res) => {
	console.log(req);
	if (
		!req.body.hasOwnProperty("itemId") ||
		!req.body.hasOwnProperty("houseId")
	  ) {
		return res.status(500).send({});
	  }
	if (
		typeof req.body.itemId != "number" ||
		typeof req.body.houseId != "number"
		) {
		return res.status(500).send({});
	  }
	  
	try {
		const { rows } = await pool.query(
		  "SELECT * FROM Items where item_id = $1 and house_id = $2",
		  [req.body.itemId, req.body.houseId]
		);

		if (rows.length > 0){
			return res.status(200).json({"Items":rows})
		}
		else{
			return res.status(500).send({});
		}
  } catch (error) {
	  console.log(error);
	  return res.status(500).send({});
	  }
};

module.exports = addItem = async (req, res) => {
	console.log("hellu");
	if (
		!req.body.hasOwnProperty("houseId") ||
		!req.body.hasOwnProperty("name") ||
		!req.body.hasOwnProperty("quantity") ||
		!req.body.hasOwnProperty("price") ||
		!req.body.hasOwnProperty("bought")
	  ) {
		return res.status(500).send({});
	  }
	if (
		typeof req.body.houseId != "number" ||
		typeof req.body.name != "string" ||
		typeof req.body.quantity != "number" ||
		typeof req.body.price != "number" ||
		typeof req.body.bought != "boolean"
		) {
		return res.status(500).send({});
	  }
	try {
		await pool.query(
		  "INSERT INTO Items (name, house_id, quantity, price, bought) VALUES ($1, $2, $3, $4, $5)",
		  [req.body.name, req.body.houseId, req.body.quantity, req.body.price,req.body.bought ]
		);
		return res.status(201).send({});
	  } catch (error) {
		  console.log(error);
		  return res.status(500).send({});
	  }
		
};

module.exports = editItem = async (req, res) => {
	if (
		!req.body.hasOwnProperty("name") ||
		!req.body.hasOwnProperty("quantity") ||
		!req.body.hasOwnProperty("price") ||
		!req.body.hasOwnProperty("bought") ||
		!req.body.hasOwnProperty("boughtOn") ||
		!req.body.hasOwnProperty("houseId") ||
		!req.body.hasOwnProperty("itemId")
	  ) {
		return res.status(500).send({});
	  }
	if (
		typeof req.body.name != "string" ||
		typeof req.body.quantity != "number" ||
		typeof req.body.price != "number" ||
		typeof req.body.bought != "boolean" ||
		typeof req.body.boughtOn != "object" ||
		typeof req.body.houseId != "number" ||
		typeof req.body.itemId != "number"
		) {
		return res.status(500).send({});
	  }
	try {
    await pool.query(
       "UPDATE Items\
		SET name = $1,\
			quantity = $2,\
			price = $3,\
			bought = $4,\
			bought_on = $5,\
		WHERE item_id = $6 and house_id = $7;",
      [req.body.name, req.body.quantity, req.body.price, req.body.bought, req.body.boughtOn, req.body.itemId, req.body.houseId]
    );
    return res.status(200).send({});
  } catch (error) {
	  console.log(error);
	  return res.status(500).send({});
  }
};

module.exports = deleteItem = async (req, res) => {
	try {
		if (
			!req.body.hasOwnProperty("itemId") ||
			!req.body.hasOwnProperty("houseId")
		  ) {
			return res.status(500).send({});
		  }
		if (
			typeof req.body.itemId != "number" ||
			typeof req.body.houseId != "number"
			) {
			return res.status(500).send({});
		  }
			await pool.query(
			   "DELETE FROM Items\
				WHERE item_id = $1 and house_id = $2;",
			  [req.body.itemId, req.body.houseId]
			);
		return res.status(200).send({});
  } catch (error) {
	  console.log(error);
	  return res.status(500).send({});
  }
};
