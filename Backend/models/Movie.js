const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, required: true },
  genre: { type: String },
  year: { type: String },
  quality: { type: String },
  size: { type: String },
  rating: { type: String },
  language: { type: String },
  poster: { type: String },
  description: { type: String },
  files: [{
    name: String,
    size: String,
    link: String
  }],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Movie', MovieSchema);
