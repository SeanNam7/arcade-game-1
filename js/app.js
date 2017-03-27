// Got from MND
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

// Enemies our player must avoid
var Enemy = function(x,y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.speed = getRandomInt(150,400);
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += dt * this.speed;
    this.reset();
    // when enemies go out of canvas width, then new enemies appear
    // if (this.x = )
    // this.x += 5;
    // console.log("Just checking enemy update");
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Check for Collisions
// Enemy.prototype.checkCollisions = function(allEnemies,player) {
//     if (this.x < player.x)
// }

// Enemy will reset and new Enemy will appear on x = -100 when it hits canvas width
Enemy.prototype.reset = function() {
    if (this.x > ctx.canvas.width) {
        this.x = -100;
    }
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

// Player class
var Player = function(x,y) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/char-boy.png';
};

// // update() function. Updates Player's position. Parameter: dt, a time delta between ticks
Player.prototype.update = function(dt) {
    this.playerWin();
};

// render() function. Draw the Player on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Make player move
Player.prototype.handleInput = function(allowedKeys) {
    
    switch(allowedKeys) {
        case "left":
            this.x += - 100;
            break

        case "up":
            this.y += - 91;
            break

        case "right":
            this.x += + 100;
            break

        case "down":
            this.y += + 91;
            break
    }
}

// Player reset
// @TODO: add timer of 1 second before player goes back to original position
Player.prototype.playerWin = function() {
    if (this.y < -45) {
        this.y = 500;
    }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var allEnemies = [new Enemy(-150,50), new Enemy(-150,130), new Enemy(-150,220), new Enemy(-150,300)];

// Place the player object in a variable called player
var player = new Player(300,500);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
