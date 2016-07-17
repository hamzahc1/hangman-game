angular.module('hangman.gamePlay', [])


.controller('hangmanController',function($scope, gameFactory) {
  
  // $scope.gameState.missesAllowed = 6;
  
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
  
  var checkForEndOfGame = function() {
    $scope.gameState.win = _.reduce($scope.gameState.secretWord, function(memo, letter) {
      return memo && letter.chosen;
    }, true);
    
    if ($scope.gameState.win === false && $scope.gameState.missesAllowed === 0) {
      $scope.gameState.lost = true;
      revealSecret();
    }
    // console.log('LETTERs', $scope.gameState)
    gameFactory.updateGame($scope.gameState, localStorage.gameId)
      .then(function(updatedGameState){
        // console.log('updated game state!', updatedGameState)
      })
    //Update database,
      //If lost reveal secret
      //If won then we gucci! 

  };


  // $scope.letters = makeLetters('abcdefghijklmnopqrstuvwxyz');
  
  $scope.reset = function() {
    localStorage.clear();
    console.log('reset');
    createAndSendGame()
    }

  // var createGame = function() {
  //   //THIS FUNCTION WILL BE DELETED!
  //   _.each($scope.letters, function(letter) {
  //     letter.chosen = false;
  //   });
    
  //   $scope.gameState = {
  //     'secretWord': makeLetters(getRandomWord()),
  //     'missesAllowed' : 6,
  //     'win': false,
  //     'lost': false
  //   }
  // };


  var createAndSendGame = function() {
    console.log("I FIRED!")
    var newWord = getRandomWord()
    gameFactory.sendGame({'secretWord': makeLetters(newWord), 'missesAllowed' : 6, 'win': false, 'lost': false, 'letters': makeLetters('abcdefghijklmnopqrstuvwxyz'), 'fullWord': newWord})
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
    console.log("DID I FIRE TWICE TOO?")
    if(localStorage.gameId) {
      gameFactory.getGame(localStorage.gameId)
        .then(function(currentGame) {
          // console.log('current game is ', $scope.gameState)
          $scope.gameState.secretWord = currentGame.data.secretWord,
          $scope.gameState.missesAllowed = currentGame.data.missesAllowed,
          $scope.gameState.win = currentGame.data.win,
          $scope.gameState.lost = currentGame.data.lost,
          $scope.gameState.letters = currentGame.data.letters
          // console.log(currentGame.data.guesses);
        })
    } else {
      createAndSendGame();
    }
  }
  
  $scope.pageLoad();
  
  $scope.try = function(guess) {
    //TODO sendGameState on each try (or should this part be in the checkEndOfGame?)!! 
    guess.chosen = true;
    // console.log($scope.gameState.letters)
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
    // console.log("WORD:", $scope.gameState.secretWord);
    checkForEndOfGame();
  };
});

var words = [
  'Rails', 'AngularJS', 'Bootstrap', 'Ruby', 'JavaScript',
  'authentication', 'function', 'array', 'object', 'sublime',
  'github', 'agile', 'route', 'database', 'model', 'view',
   'controller', 'terminal', 'array', 'data', 'inheritance',
  'Heroku', 'scope',  'closure'
  ];
  