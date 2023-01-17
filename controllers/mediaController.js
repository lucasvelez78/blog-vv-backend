const Media = require("../models/mediaModel");

exports.getAll = async (req, res) => {
  try {
    const media = await Media.find();
    res.json(media);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};

exports.create = async (req, res) => {
  const { name, content } = req.body;
  let videosPaths = [];

  if (Array.isArray(req.files.videos) && req.files.videos.length > 0) {
    for (let video of req.files.videos) {
      videosPaths.push("/" + video.path);
    }
  }
  try {
    const createMedia = await Media.create({
      name,
      content,
      videos: videosPaths,
    });
    res.json({ message: "media created" });
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};
