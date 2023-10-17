export const getAllFlags = (req, res) => {
  let flags;
  try {
    // fetch all flags data
  } catch (err) {
    res.status(500).json({ error: "Internal error occured." });
  }
  res.status(200).json({ flags });
};

export const getFlagById = (req, res) => {
  const flagId = req.params.flagId;

  // check if flag id is correct

  let flag;
  try {
    // get flag by flag id
  } catch (err) {
    res.status(500).json({ error: "Internal error occured." });
  }

  if (!flag) {
    res.status(404).json({ error: `Flag with id ${flagId} does not exist` });
  }

  res.status(200).json({ flag });
};

export const createFlag = (req, res) => {
  // validate inputs
  
  let flag;
  try {
    // attempt to creat new flag
  } catch (error) {
    res.status(500).json({ error: "Internal error occured." });
  }

  res.status(200).json({ flag });
};

export const deleteFlag = (req, res) => {
  const flagId = req.params.flagId;

  // check flagId if valid?

  let flag;
  try {
    // find flag by id
  } catch (error) {
    res.status(500).json({ error: "Internal error occured. Could not delete flag." });
  }

  if (!flag) {
    res.status(404).json({ error: `Flag with id ${flagId} does not exist.`});
  }

  res.status(200).json({ message: 'Flag successfully deleted.' });
};

export const updateFlag = (req, res) => {
  const flagId = req.params.flagId;

  // validate flagId
  // validate new flag info

  let flag;
  try {
    // find flag by id
  } catch (error) {
    res.status(500).json({ error: "Internal error occured." });
  }

  if (!flag) {
    res.status(404).json({ error: `Flag with id ${flagId} does not exist.`});
  }

  let updatedFlag;
  try {
    // update flag
  } catch (error) {
    res.status(500).json({ error: "Internal error occured. Could not update flag." });
  }

  res.status(200).json({ flag: updatedFlag });
};
