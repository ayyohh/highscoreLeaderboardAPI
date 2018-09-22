const mongoose = require('mongoose');

const ScoreSchema = new mongoose.Schema({
  score: {type: Number, required: false},
  name: {type: String, required: false},
});

module.exports = mongoose.model('Score', ScoreSchema);
