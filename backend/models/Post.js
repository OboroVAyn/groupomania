const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  userId: { type: mongoose.Schema.ObjectId, require: true },
  postText: { type: "string", require: true },
  firstName: { type: "string", require: true },
  lastName: { type: "string", require: true },
  imageUrl: { type: "string" },
  likes: { type: "number", default: 0 },
  usersLiked: { type: "array", default: [] },
});

module.exports = mongoose.model("Post", postSchema);
