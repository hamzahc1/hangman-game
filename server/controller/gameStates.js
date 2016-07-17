var db = require('../db/gameSchema');

module.exports = {
  //Gets the state of all games played/in progress
  getAllGames: function(req,res){
    db.find({}, function(error, object){
      if(error) {
        console.log("error", error)
        res.send(404)
      } else if (object) {
        console.log('OBJECTS:', object);
        res.status(200).send(object)
      } 

    })
  },
  //Gets the state of a specific game given the game id
  getGameState: function(req,res){
    var id = req.params.id
    db.findOne({_id: id}, function(error, object){
      if(error) {
        console.log("error", error)
        res.send(404)
      } else if (object) {
        console.log('OBJECT:', object.guesses);
        res.status(200).send(object)
      } 

    })
  }

}