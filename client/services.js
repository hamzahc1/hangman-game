angular.module('hangman.services', [])
  
  .factory('gameFactory', function($http){
    //Gets the state of specific game
    var getGame = function(gameID) {
      return $http({
        method: 'GET',
        url: '/getGameStates/' + gameID
      })
      .then(function(resp) {
        return resp;
      });
    };
    //Sends the state of brand new game 
    var sendGame = function(gameObj) {
      return $http({
        method: 'POST',
        url: '/setupNewGame',
        data: gameObj
      })
      .then(function(response){
        return response;
      }, function(error){
        console.error("Error sending game state")
      })
      };
      //Updates the state of current game
    var updateGame = function(gameObj, gameID) {
      return $http({
        method: 'PUT',
        url: '/updateGame/' + gameID,
        data: gameObj
       })
       .then(function(response){
         return response;
       }, function(error){
         console.error("Error updating game state")
       })
       };
       //Gets the state of all games in the database
    var getAllGames = function() {
      return $http({
        method: 'GET',
        url: '/getGameStates'
      })
      .then(function(resp) {
        return resp.data;
      })
    }

    return {
      getGame: getGame,
      sendGame: sendGame,
      updateGame: updateGame,
      getAllGames: getAllGames
    };
  })