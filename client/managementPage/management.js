angular.module('hangman.management', [])

.controller('managementController', function($scope, gameFactory) {

  $scope.getAllGameStates = function() {
    gameFactory.getAllGames()
      .then(function(allGamesStates){
        $scope.allGames = allGamesStates;
        return _.each($scope.allGames, function(game) {
          var guess = [];
          for(var i = 0; i < game.letters.length; i++){
            if(game.letters[i].chosen) {
              guess.push(game.letters[i].name);
            }
          }
            game.guesses = guess.join(', ');
          if(game.lost) {
            game.state = 'Lost'
          } else if (game.win) {
            game.state = 'Won'
          } else {
            game.state = 'In Progress'
          }
          
        })
      })
  }
  $scope.getAllGameStates();
})