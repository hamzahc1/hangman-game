var router = require('express').Router();
var controller = require('./controller');

router.get('/getGameStates', controller.gameStates.getAllGames)

router.get('/getGameStates/:id', controller.gameStates.getGameState)

router.post('/setupNewGame', controller.createAndUpdate.createNewGame)

router. put('/updateGame/:id', controller.createAndUpdate.updateGame)

module.exports = router;