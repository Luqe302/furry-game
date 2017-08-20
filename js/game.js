var Furry = require("./furry.js");
var Coin = require("./coin.js");

function Game() {
    var self = this;

    self.board = document.querySelectorAll("#board div");
    self.divScore = document.querySelector("#score strong");
    self.furek = new Furry();
    self.coin = new Coin();
    self.score = 0;
    self.isGameOver = false;
    self.speed = 550;

    self.position = function(x, y) {
        return x + (y * 10);
    };

    self.showFurry = function() {
        self.hideVisibleFurry();
        self.board[ self.position(self.furek.x,self.furek.y) ].classList.add('furry');
    };

    self.hideVisibleFurry = function() {
        var divFur = document.querySelector(".furry");
        if(divFur) {
            divFur.classList.remove('furry');
        }
    };

    self.showCoin = function() {
        self.board[ self.position(self.coin.x,self.coin.y) ].classList.add('coin');
    };

    self.moveFurry = function() {

        if (self.furek.direction === "right") {
            self.furek.x = self.furek.x + 1;

        }else if (self.furek.direction === "left") {
            self.furek.x = self.furek.x - 1;

        }else if (self.furek.direction === "up") {
            self.furek.y = self.furek.y - 1;

        }else if (self.furek.direction === "down") {
            self.furek.y = self.furek.y + 1;

        }

        self.gameOver();

        if (self.isGameOver === true) {
            return;
        }
        self.startMove();
        self.showFurry();
        self.kolizja();
    };

    document.addEventListener("keydown", function(event) {
        if (event.which === 39) {
            self.furek.direction = "right";
        }else if (event.which === 38) {
            self.furek.direction = "up";
        }else if (event.which === 40) {
            self.furek.direction = "down";
        }else if (event.which === 37) {
            self.furek.direction = "left";
        }
    });

    self.kolizja = function () {
        if (self.board[ self.position(self.furek.x,self.furek.y)] ===
        self.board[ self.position(self.coin.x,self.coin.y)]) {
            var divCoin = document.querySelector(".coin");
            divCoin.classList.remove("coin");
            self.score = self.score + 1;
            self.divScore.innerText = self.score;
            self.coin = new Coin();
            self.showCoin();
            self.speed = self.speed - 100;
        }
    };

    self.gameOver = function() {
        if(self.furek.x < 0 || self.furek.x > 9 || self.furek.y < 0 || self.furek.y > 9) {
            self.isGameOver = true;
            self.hideVisibleFurry();
            self.stopTimeout();
            console.log("gejm ower");
            var koniec = document.querySelector("#board");
            koniec.innerHTML = "Twoj wynik to " + self.score;

        }
    };

    self.startMove = function() {
        setTimeout(function() {
            self.moveFurry();
        }, self.speed);
    };


    self.startMove();

    self.stopTimeout = function() {
        clearTimeout(self.startMove);
    };
}

module.exports = Game;
