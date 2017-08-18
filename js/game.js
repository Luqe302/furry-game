var furry = require('./furry.js');
var coin = require('./coin.js');

function Game(){
var self = this;


    this.board = document.querySelectorAll('section#board div');
    this.furry = new Furry();
    this.coin = new Coin();
    this.score = 0;

    this.index = function(x,y) {
      return x + (y * 10);
    }

    this.showFurry = function() {
        this.hideVisibleFurry();

        if (this.furry.x < 0 || this.furry.x > 9 || this.furry.y < 0 || this.furry.y > 9) {
            return;
        }

        this.board[
            this.index(this.furry.x,this.furry.y)
        ].classList.add('furry');
    }

    this.showCoin = function() {
        this.board[
            this.index(this.coin.x,this.coin.y)
        ].classList.add('coin');
    }

    this.startGame = function(){
        this.move = setInterval(function(){
            self.moveFurry();
        },250 )
    }


    self.moveFurry = function() {
        if(self.furry.direction === "right") {
            self.furry.x = self.furry.x + 1;
        } else if ( self.furry.direction === 'left') {
            self.furry.x = self.furry.x - 1;
        } else if ( this.furry.direction === 'up') {
            self.furry.y = self.furry.y + 1;
        } else if ( self.furry.direction === 'down') {
            self.furry.y = self.furry.y - 1;
        }

        self.showFurry();
        this.checkCoinCollision();
        this.gameOver();
    }

    this.hideVisibleFurry = function() {
        var findFurry = document.querySelector('.furry');

        if (findFurry) {
            findFurry.classList.remove('furry');
        }
    }

    this.turnFurry = function(event) {
        switch (event.which) {
            case 37:
                this.furry.direction = 'left';
                break;
            case 38 :
                this.furry.direction = 'down';
                break;
            case 39:
                this.furry.direction = 'right';
                break;
            case 40:
                this.furry.direction = 'up';
                break;
        }
    }

    this.checkCoinCollision = function() {
        if (this.coin.x === this.furry.x && this.coin.y === this.furry.y) {

            var removeCoin = document.querySelector('.coin');

            removeCoin.classList.remove('coin');
            this.coin = new Coin();
            this.showCoin();
            this.score = this.score + 1;
            var points = document.querySelector('#score #points');
            points.innerHTML = this.score;
        }
    }

    this.gameOver = function() {
        if (this.furry.x < 0 || this.furry.x > 9 || this.furry.y < 0 || this.furry.y > 9) {
            clearInterval(this.move);

        this.hideVisibleFurry();

        alert("GAME OVER :(   Zdobyte punkty: " + self.score);
        }
    }
}


module.exports = Game;
