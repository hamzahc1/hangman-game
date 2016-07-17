angular.module('hangman.gamePlay', [])


.controller('hangmanController',function($scope, gameFactory) {
  
  //Splits a word into letters and gives it a boolean value for whether it has been selected yet
  var makeLetters = function(word) {
    return _.map(word.split(''), function(letter) {
      return { name: letter, chosen: false };
    });
  };
  
  var getRandomWord = function() {
    return words[Math.floor(Math.random() * words.length)];
  };
  
  var revealSecret = function() {
    _.each($scope.gameState.secretWord, function(letter) {
      letter.chosen = true;
    });
  };
  
  //Checks to see if the current game has been won or lost yet
  var checkForEndOfGame = function() {
    $scope.gameState.win = _.reduce($scope.gameState.secretWord, function(memo, letter) {
      return memo && letter.chosen;
    }, true);
    
    if ($scope.gameState.win === false && $scope.gameState.missesAllowed === 0) {
      $scope.gameState.lost = true;
      revealSecret();
    }
    gameFactory.updateGame($scope.gameState, localStorage.gameId)
      .then(function(updatedGameState){
      })

  };

  //Clears localStorage and starts a new game
  $scope.reset = function() {
    localStorage.clear();
    console.log('reset');
    createAndSendGame()
    }

  //Creates a new game and places the gameID in localStorage
  var createAndSendGame = function() {
    var newWord = getRandomWord()
    gameFactory.sendGame({'secretWord': makeLetters(newWord), 'missesAllowed' : 6, 'win': false, 'lost': false, 'letters': makeLetters('abcdefghijklmnopqrstuvwxyz'),'fullWord': newWord})
      .then(function(response){
        console.log(response);
        localStorage.gameId = response.data._id
          $scope.gameState = {
            'secretWord': response.data.secretWord,
            'missesAllowed': response.data.missesAllowed,
            'win': response.data.win,
            'lost': response.data.lost,
            'letters': response.data.letters
          }
        
      })
  };

  $scope.gameState = {};


  $scope.pageLoad = function() {
    if(localStorage.gameId) {
      gameFactory.getGame(localStorage.gameId)
        .then(function(currentGame) {
          $scope.gameState.secretWord = currentGame.data.secretWord,
          $scope.gameState.missesAllowed = currentGame.data.missesAllowed,
          $scope.gameState.win = currentGame.data.win,
          $scope.gameState.lost = currentGame.data.lost,
          $scope.gameState.letters = currentGame.data.letters
        })
    } else {
      createAndSendGame();
    }
  }
  
  //Checks for a current Game when page loads
  $scope.pageLoad();
  
  $scope.try = function(guess) {
    guess.chosen = true;
    var found = false;
    _.each($scope.gameState.secretWord, function(letter) {
      if (guess.name.toUpperCase() === letter.name.toUpperCase() ) {
        letter.chosen = true;
        found = true;
      }
    });
    
    if (found === false) {
      $scope.gameState.missesAllowed--;
    }
    checkForEndOfGame();
  };
});

//Array of random selection of words
var words = [
  'Rails', 'AngularJS', 'Bootstrap', 'Ruby', 'JavaScript',
  'authentication', 'function', 'array', 'object', 'sublime',
  'github', 'agile', 'route', 'database', 'model', 'view',
   'controller', 'terminal', 'array', 'data', 'inheritance',
  'Heroku', 'scope',  'closure'
  ];
  