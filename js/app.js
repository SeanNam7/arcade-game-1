// Got from MDN Math.random()
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

// Enemies our player must avoid
var Enemy = function(x,y) {
    // Variables applied to each of the game's instances go here,
    this.x = x;
    this.y = y;
    this.speed = getRandomInt(150,500);
    // The image/sprite for our enemies, this uses a helper to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // Need to multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += dt * this.speed;
    this.reset();
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Enemy will reset and new Enemy will appear on x = -100 when it hits canvas width
Enemy.prototype.reset = function() {
    if (this.x > ctx.canvas.width) {
        this.x = -100;
    }
}

// Player class
var Player = function(x,y) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/char-boy.png';
};

// // update() function. Updates Player's position. Parameter: dt, a time delta between ticks
Player.prototype.update = function(dt) {
    this.checkCollisions();
    this.playerWin();
    this.boundaries();
};

// render() function. Draw the Player on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Make player move up, down, right, left with arrows.
// addEventListener at the bottom of file
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

// Player wins then creates an alert in browser and resets player to original position
// @TODO: add timer of 1 second before player goes back to original position
Player.prototype.playerWin = function() {
    if (this.y < -45) {
        alert("You've won!");
        this.x = 300;
        this.y = 500;
    }
}

// Player wins and reset - this is invoked in checkCollisions()
Player.prototype.reset = function() {
    this.x = 300;
    this.y = 500;
}

// Checks for collision between player and enemies - invoked in Player.update
Player.prototype.checkCollisions = function() {
    var playerSize = {w: 20, h: 30}
    var allEnemiesSize = {w: 40, h: 20}

    for (i = 0; i < allEnemies.length; i++) {
    if (allEnemies[i].x < player.x + playerSize.w &&
        allEnemies[i].x + allEnemiesSize.w > player.x &&
        allEnemies[i].y < player.y + playerSize.h &&
        allEnemiesSize.h + allEnemies[i].y > player.y) {
        console.log("player collision");
        alert("You've lost!");
        player.reset();
    }
}
}

// Canvas boundaries so player does not go out of canvas
Player.prototype.boundaries = function() {
    if (this.x < 0) {
        this.x = 0;
    } else if (this.x > 600) {
        this.x = 600;
    } else if (this.y < 0) {
        this.y = 0;
    } else if (this.y > 500) {
        this.y = 500;
    }
}

// Place all enemy objects in canvas
var allEnemies = [new Enemy(-150,50), new Enemy(-150,130), new Enemy(-150,220), new Enemy(-150,300),
                new Enemy(-50,50), new Enemy(0,50), new Enemy(-20,130)];

// Place the player object in canvas
var player = new Player(300,500);

// This listens for key presses and sends the keys to Player.handleInput() method
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
