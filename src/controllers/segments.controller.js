export const getAllSegments = async (req, res) => {
  let segments;
  try {
    // database query to get all segments
  } catch (err) {
    res.status(500).json({ error: "Internal error occurred." });
  }

  res.status(200).json(segments);
};

export const getSegmentById = async (req, res) => {
  const segmentId = req.params.id;

  let segment;
  try {
    // database query to get segment by id
  } catch (err) {
    res.status(500).json({ error: "Internal error occurred." });
  }

  if (!segment) {
    res
      .status(404)
      .json({ error: `Segment with id ${segmentId} does not exist` });
  }

  res.status(200).json(segment);
};

export const createSegment = async (req, res) => {
  try {
    // database query to create a segment
  } catch (error) {
    res.status(500).json({ error: "Internal error occurred." });
  }

  res.status(200).json(segment);
};

export const deleteSegment = async (req, res) => {
  const segmentId = req.params.id;

  let segment;
  try {
    // database query to delete segment
    if (!segment) {
      res
        .status(404)
        .json({ error: `Segment with id ${segmentId} does not exist.` });
      return;
    }

    res.status(200).json({ message: "Segment successfully deleted." });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Internal error occurred. Could not delete segment." });
  }
};

export const updateSegment = async (req, res) => {
  const segmentId = req.params.id;

  let segment;
  try {
    // database query to get segment by id
  } catch (error) {
    res.status(500).json({ error: "Internal error occurred." });
  }

  if (!segment) {
    res
      .status(404)
      .json({ error: `Segment with id ${segmentId} does not exist.` });
  }

  // let newSegment = new Segment(segment);
  // newSegment.updateProps(req.body);
  try {
    // database query to update segment
  } catch (error) {
    res
      .status(500)
      .json({ error: "Internal error occurred. Could not update segment." });
  }

  res.status(200).json(updatedSegment);
};
