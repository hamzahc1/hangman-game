var db = require('../db/gameSchema');

module.exports = {
  //Creates new game and returns game state to browser
  createNewGame: function(req,res){
    var newGameSetup = req.body
    db.create(newGameSetup, function(error, newGame){
        if(error){
          res.send(404)
        } else {
          res.status(201).send(newGame)
        }
    })
  },

  //Updates game state with player moves and returns game state to the browser
  updateGame: function(req,res){
    var id = req.params.id;
    var updatedGame = req.body;
    db.findByIdAndUpdate(id, req.body, {new: true}, function(error, newGame){
        if(error){
          res.send(404)
        } else {
          res.status(200).send(newGame)
        }
    })
  }
}