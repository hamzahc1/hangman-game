var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/hangman');

var GamesSchema = new mongoose.Schema({
  //UPDATE SCHEMA FOR NEW bits and pieces! 
  secretWord: [{}],
  missesAllowed: Number,
  letters: [{}],
  lost: Boolean,
  win: Boolean,
  fullWord: String,
}, {timestamps: true})

module.exports = mongoose.model('Game', GamesSchema);