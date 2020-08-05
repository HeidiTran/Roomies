module.exports = createNewHouse = (req, res) => {
  // TODO: Validation: check body has houseName, password, etc
  // TODO: Insert into DB (status 500 if fail to insert)
  // TODO: Send empty response with status 200 if success
  return res.status(200).send();
};

module.exports = joinHouse = (req, res) => {
  // TODO: Validation: check body has houseName, password, etc
  // TODO: Check if houseName exists
  // TODO: Get password hash and check if matches
  // TODO: Send empty response with status 200 if success
  return res.status(200).send();
};
