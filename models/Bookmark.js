var mongoose = require("mongoose");

var BookmarkSchema = new mongoose.Schema({
  profile: { type: String, default: "" }, // ID of the profile who posted the bookamrk
  url: { type: String, trim: true, default: "" },
  title: { type: String, trim: true, default: "" },
  description: { type: String, trim: true, default: "" },
  image: { type: String, default: "" },
  timestamp: { type: Date, default: Date.now }
});

BookmarkSchema.methods.summary = function() {
  var summary = {
    id: this._id.toString(),
    profile: this.profile,
    url: this.url,
    title: this.title,
    description: this.description,
    image: this.image,
    timestamp: this.timestamp
  };
  return summary;
};

module.exports = mongoose.model("BookmarkSchema", BookmarkSchema);
