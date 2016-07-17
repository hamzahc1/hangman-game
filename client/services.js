angular.module('hangman.services', [])
  
  .factory('gameFactory', function($http){
    var getGame = function(gameID) {
      return $http({
        method: 'GET',
        url: '/getGameStates/' + gameID
      })
      .then(function(resp) {
        return resp;
      });
    };

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

    var getAllGames = function() {
      return $http({
        method: 'GET',
        url: '/getGameStates'
      })
      .then(function(resp) {
        console.log(resp.data);
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