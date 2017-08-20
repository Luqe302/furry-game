/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

var Game = __webpack_require__(1);
var gra = new Game();

gra.showCoin();
gra.showFurry();


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var Furry = __webpack_require__(2);
var Coin = __webpack_require__(3);

function Game() {
    var self = this;

    self.board = document.querySelectorAll("#board div");
    self.divScore = document.querySelector("#score strong");
    self.furek = new Furry();
    self.coin = new Coin();
    self.score = 0;
    self.isGameOver = false;
    self.speed = 500;

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
            divCoin.classList.add("light");
            divCoin.classList.remove("coin");
            self.score = self.score + 1;
            self.divScore.innerText = self.score;
            self.coin = new Coin();
            self.showCoin();
            self.speed = self.speed - 30;
        }
    };

    self.gameOver = function() {
        if(self.furek.x < 0 || self.furek.x > 9 || self.furek.y < 0 || self.furek.y > 9) {
            self.isGameOver = true;
            self.hideVisibleFurry();
            self.stopTimeout();
            console.log("gejm ower");

            self.createScoreBoard();
        }
    };

    self.createScoreBoard = function() {
        var scoreBoard = document.querySelector("#board");
        var score = document.createElement("div");
        var wrapperScore = document.createElement("div");
        wrapperScore.className = "wrapperScore";
        score.innerHTML = "Koniec gry<br>" + "Zdobyłeś <span>" + self.score + "</span> punktów";
        scoreBoard.innerHTML = "";
        scoreBoard.appendChild(wrapperScore);
        wrapperScore.appendChild(score);
    };

    self.retryGame = function() {
        var retryGame = document.createElement("button");
        retryGame.addEventListener("click", function() {

        });
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


/***/ }),
/* 2 */
/***/ (function(module, exports) {

function Furry() {
    this.x = 0;
    this.y = 0;
    this.direction = "right";
}


module.exports = Furry;


/***/ }),
/* 3 */
/***/ (function(module, exports) {

function Coin() {
    this.x = Math.floor(Math.random() * 10);
    this.y = Math.floor(Math.random() * 10);
}

module.exports = Coin;


/***/ })
/******/ ]);