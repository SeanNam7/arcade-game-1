// Got from MDN Math.random()
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

// Creating variables with %data% inside objects to add scores and lives to game
var score = "SCORE: %data%";
var lives = "LIVES: %data%";

// Enemies our player must avoid
var Enemy = function(x,y) {
    // Variables applied to each of the game's instances go here,
    this.x = x;
    this.y = y;
    // random speed from 150 to 500
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
    // creating scores that start at 0 and lives start at 3
    this.score = 0;
    this.lives = 3;
};

// // update() function. Updates Player's position. Parameter: dt, a time delta between ticks
Player.prototype.update = function(dt) {
    // variables replace %data%, using .replace method, inside the variables score and lives so they get invoked when player wins or collides
    var updateScore = score.replace("%data%", this.score);
    var updateLives = lives.replace("%data%", this.lives);

    // targetting #data id in index.html file so score and lives get updated based on winning or collision
    $("#data").html(" ");
    $("#data").html(updateScore + " " + updateLives);

    // conditions for when player wins = score increases 100 using if/else statements and invoking playerWin() function
    if (this.playerWin()) {
        this.score += 100;
        setTimeout(player.reset(), 5000 * dt);
    } 

    // conditions for when player collides = life decreases by 1 using if/else statements and invoking checkCollision() function
    else if (this.checkCollisions()) { 
        this.lives -= 1;
        console.log("less life!");
        setTimeout(player.reset(), 1000 * dt);
    }

    // If lives get to 0, reset to 3. Added a fun alert message :)
    if (this.lives <= 0) {
        alert("Ooops! You are out of life. Let me recharge you so you keep playing :)");
        this.lives = 3;
        this.score = 0;
    }
    
    // invoking checkCollisions(), playerWin(), and boundaries() function through Object-Oriented JS
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
        console.log("Yay! You've won. Keep going!")
        // alert("You've won!");
        ctx.font = '40pt Arial';
        ctx.fillStyle = 'white';
        ctx.fillText = ('WIN MESSAGE', 10, 400);
        this.x = 300;
        this.y = 500;

        // Return true boolean for when conditions meet at Player.update function = when player wins or collides
        return true;
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
        console.log("Ooops! There was a collision. Start again :)");
        // alert("You've lost!");
        player.reset();
        return true;
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
