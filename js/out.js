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
/***/ (function(module, exports) {

function Furry() {
    this.x = 0;
    this.y = 0;
    this.direction = "right";
}

function Coin() {
    this.x = Math.floor(Math.random() * 10);
    this.y = Math.floor(Math.random() * 10);
}

function Game() {
    this.board = document.querySelectorAll("#board div");
    this.divScore = document.querySelector("#score strong");
    this.furek = new Furry();
    this.coin = new Coin();
    this.score = 0;
    this.isGameOver = false;
    this.speed = 850;
    var self = this;

    this.position = function(x, y) {
        return x + (y * 10);
    };

    this.showFurry = function() {
        this.hideVisibleFurry();
        this.board[ this.position(this.furek.x,this.furek.y) ].classList.add('furry');
    };

    this.hideVisibleFurry = function() {
        var divFur = document.querySelector(".furry");
        if(divFur) {
            divFur.classList.remove('furry');
        }
    };

    this.showCoin = function() {
        this.board[ this.position(this.coin.x,this.coin.y) ].classList.add('coin');
    };

    this.moveFurry = function() {

        if (this.furek.direction === "right") {
            this.furek.x = this.furek.x + 1;

        }else if (this.furek.direction === "left") {
            this.furek.x = this.furek.x - 1;

        }else if (this.furek.direction === "up") {
            this.furek.y = this.furek.y - 1;

        }else if (this.furek.direction === "down") {
            this.furek.y = this.furek.y + 1;

        }

        this.gameOver();

        if (this.isGameOver === true) {
            return;
        }

        this.showFurry();
        this.kolizja();
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

    this.kolizja = function () {
        if (this.board[ this.position(this.furek.x,this.furek.y)] ===
        this.board[ this.position(this.coin.x,this.coin.y)]) {
            var divCoin = document.querySelector(".coin");
            divCoin.classList.remove("coin");
            this.score = this.score + 1;
            this.divScore.innerText = this.score;
            this.coin = new Coin();
            this.showCoin();
            this.speed = this.speed - 20;
            this.startGame();
            // funkcja, ktora wywoluje interwal
            // i przekazuje mu nowy speed
        }
    };

    this.gameOver = function() {
        if(this.furek.x < 0 || this.furek.x > 9 || this.furek.y < 0 || this.furek.y > 9) {
            this.isGameOver = true;
            console.log("gameOver");
            self.hideVisibleFurry();
            this.stopInterval();

            var koniec = document.querySelector("#board");
            koniec.innerHTML = "Twoj wynik to " + this.score;

        }
    };

    this.startGame = function() {
        setInterval(function() {
            self.moveFurry();
        }, this.speed);
    };


    this.idSetInterval = this.startGame();
    this.stopInterval = function() {
        clearInterval(self.idSetInterval);
    };
}

var gra = new Game();

gra.showCoin();
gra.showFurry();


/***/ })
/******/ ]);