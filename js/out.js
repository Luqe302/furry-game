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

var game = __webpack_require__(1);

var game2 = new Game();
game2.showFurry();
game2.showCoin();
game2.startGame();
game2.moveFurry();

document.addEventListener('keydown', function(event){
    game2.turnFurry(event);
});


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var furry = __webpack_require__(2);
var coin = __webpack_require__(3);

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


/***/ }),
/* 2 */
/***/ (function(module, exports) {

function Furry(){
    this.x = 0;
    this.y = 0;
    this.direction = 'right';
}

module.exports = Furry;


/***/ }),
/* 3 */
/***/ (function(module, exports) {

function Coin(){
    this.x = Math.floor(Math.random() * 10);
    this.y = Math.floor(Math.random() * 10);
}

module.exports = Coin;


/***/ })
/******/ ]);