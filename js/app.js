var game = require('./game.js');

var game2 = new Game();
game2.showFurry();
game2.showCoin();
game2.startGame();
game2.moveFurry();

document.addEventListener('keydown', function(event){
    game2.turnFurry(event);
});
