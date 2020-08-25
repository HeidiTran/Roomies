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

    if (object) {
      intObj = parseInt(object);
      strObj = intObj.toString();
      if (strObj.length === object.length) {
        return intObj;
      } else {
        return false;
      }
    } else {
      return false;
    }
  } catch (error) {
    throw Error(error);
  }
}

async function itemExists(itemId) {
  try {
    const { rows } = await pool.query(
      "SELECT * FROM Items where item_id = $1",
      [itemId]
    );

    if (rows.length > 0) return true;
    else return false;
  } catch (error) {
    throw Error(error);
  }
}

const beatifyDate = (dateStr) => {
  if (dateStr == null) return null;

  const date = new Date(dateStr);
  return date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear();
};

module.exports = getAllItems = async (req, res) => {
  // TODO: check if houseId is in the request query

  let houseId = parseIntValidation(req.query.houseId);
  if (houseId) {
    try {
      const {
        rows,
      } = await pool.query("SELECT * FROM Items where house_id = $1 order by item_id", [
        houseId,
      ]);

      if (rows.length > 0) {
        return res.status(200).json(
          rows.map((elem) => {
            return {
              itemId: elem.item_id,
              name: elem.name,
              quantity: elem.quantity,
              price: parseFloat(elem.price),
              bought: elem.bought,
              boughtOn: beatifyDate(elem.bought_on),
            };
          })
        );
      } else {
        return res.status(200).json([]);
      }
    } catch (error) {
      return res.status(500).send();
    }
  } else {
    return res.status(400).send("Error while getting houseId!");
  }
};

module.exports = getItem = async (req, res) => {
  // TODO: Check if itemId is in the params
  let itemId = parseIntValidation(req.query.itemId);
  if (!(await itemExists(itemId))) return res.status(404).send();

  try {
    const { rows } = await pool.query(
      "SELECT * FROM Items where item_id = $1",
      [itemId]
    );

    if (rows.length > 0) {
      const elem = rows[0];
      return res.status(200).json({
        itemId: elem.item_id,
        name: elem.name,
        quantity: elem.quantity,
        price: parseFloat(elem.price),
        bought: elem.bought,
      });
    } else {
      return res.status(404).send();
    }
  } catch (error) {
    return res.status(500).send();
  }
};

module.exports = addItem = async (req, res) => {
  if (
    !req.body.hasOwnProperty("houseId") ||
    !req.body.hasOwnProperty("name") ||
    !req.body.hasOwnProperty("quantity") ||
    !req.body.hasOwnProperty("price") ||
    !req.body.hasOwnProperty("bought")
  ) {
    return res.status(400).send({});
  }

  if (
    typeof req.body.houseId != "number" ||
    typeof req.body.name != "string" ||
    typeof req.body.quantity != "number" ||
    typeof req.body.price != "number" ||
    typeof req.body.bought != "boolean"
  ) {
    return res.status(400).send();
  }
  try {
    await pool.query(
      "INSERT INTO Items (name, house_id, quantity, price, bought) VALUES ($1, $2, $3, $4, $5)",
      [
        req.body.name,
        req.body.houseId,
        req.body.quantity,
        req.body.price,
        req.body.bought,
      ]
    );
    return res.status(201).send();
  } catch (error) {
    return res.status(500).send();
  }
};

module.exports = editItem = async (req, res) => {
  // TODO: Check if itemId is in the params
  let itemId = req.params.itemId;

  if (!(await itemExists(itemId))) return res.status(404).send();

  if (
    !req.body.hasOwnProperty("name") ||
    !req.body.hasOwnProperty("quantity") ||
    !req.body.hasOwnProperty("price") ||
    !req.body.hasOwnProperty("bought") ||
    !req.body.hasOwnProperty("itemId")
  ) {
    return res.status(400).send();
  }
  if (
    typeof req.body.name != "string" ||
    typeof req.body.quantity != "number" ||
    typeof req.body.price != "number" ||
    typeof req.body.bought != "boolean" ||
    typeof req.body.itemId != "number"
  ) {
    return res.status(400).send();
  }
  try {
    await pool.query(
      "UPDATE Items\
		SET name = $1,\
			quantity = $2,\
			price = $3,\
			bought = $4\
		WHERE item_id = $5",
      [
        req.body.name,
        req.body.quantity,
        req.body.price,
        req.body.bought,
        itemId,
      ]
    );
    return res.status(204).send();
  } catch (error) {
    return res.status(500).send();
  }
};

module.exports = deleteItem = async (req, res) => {
  // TODO: Check if itemId is in the params
  let itemId = req.params.itemId;

  if (!(await itemExists(itemId))) return res.status(404).send();

  try {
    await pool.query("DELETE FROM Items\
				WHERE item_id = $1", [itemId]);
    return res.status(200).send();
  } catch (error) {
    return res.status(500).send();
  }
};

module.exports = boughtItem = async (req, res) => {
  // TODO: Check if itemId is in the params
  let itemId = req.params.itemId;
  if (!(await itemExists(itemId))) return res.status(404).send();

  // TODO: If item's bought attribute is already try -> do nothing

  try {
    await pool.query(
      "UPDATE Items\
		SET bought = true,\
			bought_on = NOW()\
		WHERE item_id = $1",
      [itemId]
    );
    return res.status(204).send();
  } catch (error) {
    return res.status(500).send();
  }
};
