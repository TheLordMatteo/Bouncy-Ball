// Matteo Antenucci
// Pascal Huynh
//  Web and FX, 502-A22-LA, section 00001
// Bouncy Ball
// Global variables
var bird;
var pipes = [];
var score = 0;
var highScore = 0;
var gameState = "play";
var pipeGap = 150;
var pipeSpeed = 2;

// Setup function
function setup() {
  createCanvas(400, 600);
  bird = new Bird();
  pipes.push(new Pipe());
  textSize(24);
}

// Draw function
function draw() {
  background(135, 206, 235);
  
  // Handle game state
  if (gameState === "play") {
    // Update and display bird
    bird.update();
    bird.display();
    
    // Update and display pipes
    for (var i = pipes.length - 1; i >= 0; i--) {
      pipes[i].update();
      pipes[i].display();
      
      // Check for collision with bird
      if (pipes[i].hits(bird)) {
        gameOver();
        break;
      }
      
      // Remove pipes that have gone off screen
      if (pipes[i].offscreen()) {
        pipes.splice(i, 1);
        score++;
        if (score > highScore) {
          highScore = score;
        }
      }
    }
    
    // Generate new pipe
    if (frameCount % 100 === 0) {
      pipes.push(new Pipe());
    }
    
    // Display score and high score
    text("Score: " + score, 10, 30);
    text("High Score: " + highScore, 10, 60);
  } else if (gameState === "gameOver") {
    gameOver();
  }
}

// Handle mouse click
function mouseClicked() {
  if (gameState === "play") {
    bird.up();
  } else if (gameState === "gameOver") {
    reset();
  }
}

// Bird class
function Bird() {
  this.x = 50;
  this.y = height/2;
  this.vel = 0;
  this.acc = 0.6;
  
  this.update = function() {
    this.vel += this.acc;
    this.vel *= 0.9;
    this.y += this.vel;
    
    if (this.y > height) {
      this.y = height;
      this.vel = 0;
    } else if (this.y < 0) {
      this.y = 0;
      this.vel = 0;
    }
  }
  
  this.up = function() {
    this.vel -= 10;
  }
  
  this.display = function() {
    fill(255, 255, 0);
    ellipse(this.x, this.y, 32, 32);
  }
}

// Pipe class
function Pipe() {
  this.top = random(height/2 - pipeGap);
  this.bottom = height - this.top - pipeGap;
  this.x = width;
  this.w = 30;
  this.speed = pipeSpeed;
  
  this.update = function() {
    this.x -= this.speed;
  }
  
  this.display = function() {
    fill(0, 200, 0);
    rect(this.x, 0, this.w, this.top);
    rect(this.x, height - this.bottom, this.w, this.bottom);
  }
  
  this.offscreen = function() {
    return (this.x < -this.w);
  }
  
  this.hits = function(bird) {
    if (bird.y < this.top || bird.y > height - this.bottom) {
      if (bird.x > this.x && bird.x < this.x + this.w) {
        return true;
      }
    }
    return false;
  }
}
