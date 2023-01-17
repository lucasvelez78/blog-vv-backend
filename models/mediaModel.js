const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const mediaSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    content: {
      type: String,
    },
    videos: [{ type: String }],
  },
  {
    timestamps: true,
  }
);

const Media = mongoose.model("Media", mediaSchema);

module.exports = Media;
