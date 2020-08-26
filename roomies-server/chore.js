const pg = require("pg");
const env = require("./env.json");

const Pool = pg.Pool;
const pool = new Pool(env);

/**
 * Connect to roomies database
 */
pool.connect();

function isValidNewTaskForm(body) {
  if (
    !body.hasOwnProperty("name") ||
    !body.hasOwnProperty("houseId") ||
    !body.hasOwnProperty("userId")
  ) {
    return false;
  }

  if (
    typeof body.name != "string" ||
    typeof body.houseId != "number" ||
    typeof body.userId != "number"
  ) {
    return false;
  }

  return true;
}

function isValidGetAllTasksQuery(query) {
  if (!query.hasOwnProperty("houseId")) {
    return false;
  }

  return true;
}

function isValidDoneTaskForm(body) {
  if (!body.hasOwnProperty("status")) {
    return false;
  }

  if (typeof body.status != "boolean") {
    return false;
  }

  return true;
}

function isValidEditTaskForm(body) {
  if (
    !body.hasOwnProperty("status") ||
    !body.hasOwnProperty("name") ||
    !body.hasOwnProperty("userId")
  ) {
    return false;
  }

  if (
    typeof body.status != "boolean" ||
    typeof body.name != "string" ||
    typeof body.userId != "number"
  ) {
    return false;
  }

  return true;
}

async function getUserData(userId) {
  try {
    const { rows } = await pool.query(
      "SELECT * FROM Users WHERE user_id = $1",
      [userId]
    );

    if (rows.length > 0) return rows[0];
    else return null;
  } catch (error) {
    throw Error(error);
  }
}

const beatifyDate = (dateStr) => {
  if (dateStr == null) return null;

  const date = new Date(dateStr);
  return date.getMonth() + 1 + "/" + date.getDate();
};

module.exports = getAllTasks = async (req, res) => {
  let query = req.query;

  if (!isValidGetAllTasksQuery(query)) {
    return res.status(400).send({});
  }

  try {
    let result = await pool.query(
      "SELECT * FROM Tasks WHERE house_id=$1 ORDER BY task_id",
      [query.houseId]
    );
    let json = await Promise.all(
      result.rows.map(async (r) => {
        let user = await getUserData(r.user_id);
        return {
          taskId: r.task_id,
          name: r.name,
          username: user.username,
          finishedOn: beatifyDate(r.finished_on),
          status: r.status,
        };
      })
    );
    return res.status(200).json(json);
  } catch (error) {
    console.log(error);
    return res.status(500).send();
  }
};

module.exports = getTask = async (req, res, taskId) => {
  try {
    let result = await pool.query("SELECT * FROM Tasks WHERE task_id=$1", [
      taskId,
    ]);
    let data = result.rows[0];
    let json = {
      taskId: data.task_id,
      name: data.name,
      userId: data.user_id,
      status: data.status,
    };
    return res.status(200).json(json);
  } catch (error) {
    console.log(error);
    return res.status(500).send();
  }
};

module.exports = addTask = async (req, res) => {
  let body = req.body;

  if (!isValidNewTaskForm(body)) {
    return res.status(400).send({});
  }

  try {
    let result = await pool.query(
      "INSERT INTO Tasks (name, house_id, user_id) VALUES ($1, $2, $3)",
      [body.name, body.houseId, body.userId]
    );
    return res.status(201).send();
  } catch (error) {
    console.log(error);
    return res.status(500).send();
  }
};

module.exports = editTask = async (req, res, taskId) => {
  let body = req.body;

  if (!isValidEditTaskForm(body)) {
    return res.status(400).send({});
  }

  try {
    let result = await pool.query(
      "UPDATE Tasks SET status = $1, finished_on = to_timestamp($2), name = $3, user_id = $4 WHERE task_id= $5",
      [body.status, body.finished_on, body.name, body.userId, taskId]
    );
    return res.status(200).send();
  } catch (error) {
    console.log(error);
    return res.status(500).send();
  }
};

module.exports = doneTask = async (req, res, taskId) => {
  try {
    let result = await pool.query(
      "UPDATE Tasks SET status = $1, finished_on = NOW() WHERE task_id= $2",
      [true, taskId]
    );
    return res.status(200).send();
  } catch (error) {
    console.log(error);
    return res.status(500).send();
  }
};

module.exports = deleteTask = async (req, res, taskId) => {
  try {
    let result = await pool.query("DELETE FROM Tasks WHERE task_id=$1;", [
      taskId,
    ]);
    return res.status(200).send();
  } catch (error) {
    console.log(error);
    return res.status(500).send();
  }
};
