angular.module('hangman', [
  'hangman.gamePlay',
  'hangman.management',
  'hangman.services',
  'ngRoute'
])

.config(function($routeProvider, $httpProvider){
  $routeProvider
  .when('/playHangman', {
    templateUrl: 'gamePlay/gamePlay.html',
    controller: 'hangmanController'
  })
  .when('/managementPage', {
    templateUrl: 'managementPage/management.html',
    controller: 'managementController'
  });
});