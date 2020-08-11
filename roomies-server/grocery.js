const pg = require("pg");
const env = require("./env.json");

const Pool = pg.Pool;
const pool = new Pool(env);

/**
 * Connect to roomies database
 */
pool.connect();

module.exports = getAllItems = async (req, res) => {
	try {
    const { rows } = await pool.query(
      "SELECT * FROM Items"
    );

    if (rows.length > 0){
		return res.status(200).json({"Items":rows})
	}
	else{
		return res.status(500).send("");
	}
  } catch (error) {
	  console.log(error)
	  return res.status(500).send({});
  }
};

module.exports = getItem = async (req, res, itemId) => {
  	try {
    const { rows } = await pool.query(
      "SELECT * FROM Items where item_id = $1",
      [itemId]
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
  	try {
    await pool.query(
      "INSERT INTO Items (name, house_id, quantity, price) VALUES ($1, $2, $3, $4)",
      [req.item, req.houseId, req.quantity, req.price]
    );
    return res.status(200).send({});
  } catch (error) {
	  console.log(error);
	  return res.status(500).send({});
  }
};

module.exports = editItem = async (req, res, itemId) => {
	try {
    await pool.query(
       "UPDATE Items\
		SET name = $1,\
			quantity = $2,\
			price = $3,\
			bought = $4,\
			bought_on = $5,\
		WHERE item_id = $6;",
      [req.name, req.quantity, req.price, req.bought, req.boughtOn, itemId]
    );
    return res.status(200).send({});
  } catch (error) {
	  console.log(error);
	  return res.status(500).send({});
  }
};

module.exports = deleteItem = async (req, res, itemId) => {
	try {
    await pool.query(
       "DELETE FROM Items\
		WHERE item_id = $1;",
      [itemId]
    );
    return res.status(200).send({});
  } catch (error) {
	  console.log(error);
	  return res.status(500).send({});
  }
};
