export const getAllAttributes = async (req, res) => {
  let attributes;
  try {
    // database query to get all attributes
  } catch (err) {
    res.status(500).json({ error: "Internal error occurred." });
  }

  res.status(200).json(attributes);
};

export const getAttributeById = async (req, res) => {
  const attributeId = req.params.id;

  let attribute;
  try {
    // database query to get attribute by id
  } catch (err) {
    res.status(500).json({ error: "Internal error occurred." });
  }

  if (!attribute) {
    res
      .status(404)
      .json({ error: `Attribute with id ${attributeId} does not exist` });
  }

  res.status(200).json(attribute);
};

export const createAttribute = async (req, res) => {
  try {
    // database query to create a attribute
  } catch (error) {
    res.status(500).json({ error: "Internal error occurred." });
  }

  res.status(200).json(attribute);
};

export const deleteAttribute = async (req, res) => {
  const attributeId = req.params.id;

  let attribute;
  try {
    // database query to delete attribute
    if (!attribute) {
      res
        .status(404)
        .json({ error: `Attribute with id ${attributeId} does not exist.` });
      return;
    }

    res.status(200).json({ message: "Attribute successfully deleted." });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Internal error occurred. Could not delete attribute." });
  }
};

export const updateAttribute = async (req, res) => {
  const attributeId = req.params.id;

  let attribute;
  try {
    // database query to get attribute by id
  } catch (error) {
    res.status(500).json({ error: "Internal error occurred." });
  }

  if (!attribute) {
    res
      .status(404)
      .json({ error: `Attribute with id ${attributeId} does not exist.` });
  }

  // let newAttribute = new Attribute(attribute);
  // newAttribute.updateProps(req.body);
  try {
    // database query to update attribute
  } catch (error) {
    res
      .status(500)
      .json({ error: "Internal error occurred. Could not update attribute." });
  }

  res.status(200).json(updatedAttribute);
};
