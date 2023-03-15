let body = document.querySelector("body");
let pointsShow = document.createElement("p");

body.style.backgroundColor = "black";
body.style.color = "white";

let xpos, ypos;
let xpos2, ypos2;
let xspeed2 = 1.8;
let yspeed2 = 2.5;
let xspeed = 2.5;
let yspeed = 1.8;
let rad = 10;
let radEvil = 10;
let xdir = 1;
let ydir = 1;
let xdir2 = -1;
let ydir2 = -1;
let dotE = 0;
let xdot, ydot;
let bg = 0;
let points = 0;
let scoreElem;
let size = 600;
let speedIncrease;
let evilBall;
let counterEvil = 0;
let evilBalls = [];
let particles = [];

let highScore;
let highScoreValue = localStorage.getItem("highScore") ? localStorage.getItem("highScore") : 0;
//let slider;
let life = 100;
let lifeBar;

//creating bad food variavles
let xbf, ybf;
let bfCounterL = 150;
let bfCounter = bfCounterL;
let bfCounter2 = 300;
let bfE = 0;
let poisoned = 0;
let poisonCounter = 0;
let badOrGood = 1;

let img;
let imgBg;
let imgFood;
let imgEvil;
let imgBf;
let imgCookie;
function preload() {
  img = loadImage("https://cdn-icons-png.flaticon.com/256/7457/7457329.png");
  imgBg = loadImage(
    "https://media.tenor.com/TY1HfJK5qQYAAAAC/galaxy-pixel-art.gif"
  );
  imgFood = loadImage(
    "https://dejpknyizje2n.cloudfront.net/marketplace/products/2eed353198d546ee871bb3e6cf89ed43.png"
  );
  imgCookie = loadImage(
    "https://64.media.tumblr.com/a2d28a3237729239a9eb0d91e1b47c8a/tumblr_mrma4kuNQP1s5jjtzo1_500.png"
  );
  imgBf = loadImage(
    "https://www.pngkit.com/png/full/231-2315355_poop-pixel-art-youtube-logo.png"
  );
}

function setup() {
  console.log(frameRate);
  speedIncrease = createCheckbox("Increase speed with every point");
  speedIncrease.position(size + 20, 20);
  evilBall = createCheckbox("Evil Ball mode >_<");
  evilBall.position(size + 20, 60);
  // slider.style('width', '80px');
  // inputSize = createInput(400, [Number]);
  // inputSize = position(size + 20, 40)

  scoreElem = createDiv("Score = 0");
  scoreElem.position(20, 20);
  scoreElem.id = "score";
  scoreElem.style("color", "white");
  createCanvas(size, size);
  //slider = createSlider(300, 1000,500);
  //slider.position(size + 20, 40);
  highScore = createDiv(`Highest Score: ${highScoreValue}`);
  highScore.position(size + 21, 100);
  lifeBar = createDiv();

  lifeBar.style("width", `${size}px`);
  lifeBar.style("height", "10px");
  lifeBar.style("background-color", "green");

  ellipseMode(RADIUS);
  xpos = width / 2;
  ypos = height / 2;
  xpos2 = Math.random() * width;
  ypos2 = Math.random() * height;
}

function draw() {
  if (life > 100) {
    life = 100;
  }
  highScore.html(`Highest Score: ${highScoreValue}`);
  //size = slider.value();
  //background(bg);
  image(imgBg, 0, 0, width, height);

  lifeBar.style("width", `${life * 6}px`);
  if (xdir != 0 && ydir != 0) {
    if (poisoned == 1) {
      life = life - 0.4;
      lifeBar.style("background-color", "red");
    } else {
      lifeBar.style("background-color", "green");
      life = life - 0.2;
    }
  }

  if (dotE == 0) {
    dotE = 1;
    xdot = Math.abs(Math.random() * (width - 20) + 10);
    ydot = Math.abs(Math.random() * (height - 20) + 10);
    //xdot = Math.abs(20 - (Math.random()*(width-200))) ;
    //ydot = Math.abs(20 - Math.random()*(height-200)) ;
  }

  image(imgFood, xdot - 12.5, ydot - 12.5, 25, 25);
  image(img, xpos - 20, ypos - 20, 40, 40);

  xpos = xpos + xdir * xspeed;
  ypos = ypos + ydir * yspeed;

  //bad food
  if (bfCounter <= 0) {
    if (bfE == 0) {
      //xbf = Math.abs((Math.random()*(width-20)) + 10);
      xbf = width;
      ybf = Math.abs(Math.random() * (height - 20) + 10);
      bfE = 1;
    }
    //if(bfCounter2 <= 0) {
    if (xbf <= 0) {
      bfCounterL = bfCounterL - 50;
      console.log(bfCounterL);
      bfCounter = bfCounterL;
      // bfCounter2 = 300;
      bfE = 0;
      xbf = -40;
      ybf = -40;
      badOrGood = frameCount % 3;
    }
    stroke(100);
    ellipse(xbf, ybf, rad);
    if (badOrGood > 0) {
      image(imgBf, xbf - 15, ybf - 15, 30, 30);
    } else {
      image(imgCookie, xbf - 20, ybf - 20, 40, 40);
    }
    bfCounter2 = bfCounter2 - 1;
    xbf = xbf - 1.8;
  }
  bfCounter = bfCounter - 1;

  if (Math.abs(xpos - xbf) <= rad + 5 && Math.abs(ypos - ybf) <= rad + 5) {
    if (badOrGood != 0) {
      poisoned = 1;
      poisonCounter = 0;
      xbf = -30;
      //bfCounter2 = 0;
    } else {
      life = 100;
      poisoned = 0;
      points = points + 2;
      scoreElem.html("Score = " + points);
      poisonCounter = 0;
      xbf = -30;
    }
  }

  //evil ball creation
  if (!evilBall.checked()) {
    xpos2 = null;
    ypos2 = null;
    counterEvil = 1;
  }
  if (evilBall.checked() && counterEvil == 1) {
    let newEvilBall = {
      xpos: random(0, width),
      ypos: random(0, height),
      rad: 10,
      xspeed: random(1.2, 2.8),
      yspeed: random(1.3, 2.7),
    };
    evilBalls.push(newEvilBall);
    console.log(evilBalls);
    xpos2 = Math.random() * width;
    ypos2 = Math.random() * height;
    xdir2 = 1;
    ydir2 = 1;
    counterEvil = 0;
  }
  if (evilBall.checked() && xdir2 == 0 && ydir2 == 0) {
    xdir2 = 1;
    ydir2 = -1;
  }
  if (evilBall.checked() && xdir2 == 0) {
    xdir2 = 1;
  }
  if (evilBall.checked() && ydir2 == 0) {
    ydir2 = -1;
  }
  if (evilBall.checked()) {
    stroke(238, 75, 43);
    fill(238, 75, 43);
    ellipse(xpos2, ypos2, radEvil);
    xpos2 = xpos2 + xdir2 * xspeed2;
    ypos2 = ypos2 + ydir2 * yspeed2;
  }
  //evil ball bouncing
  if (xpos2 >= width - radEvil) {
    xdir2 = -1;
  } else if (xpos2 <= radEvil) {
    xdir2 = 1;
  }

  if (ypos2 >= height - radEvil) {
    ydir2 = -1;
  } else if (ypos2 <= radEvil) {
    ydir2 = 1;
  }

  //loosing
  if (
    xpos > width - rad ||
    xpos < rad ||
    (Math.abs(xpos - xpos2) <= radEvil && Math.abs(ypos - ypos2) <= radEvil) ||
    (life < 0 && life > -1)
  ) {
    //  xdir = -1*xdir; talvez agregam un modo por tiempo a colectar mas, con increase speed y sin morir sino q rebotas.
    background("red");
    ydir = 0;
    xdir = 0;
    xpos = width / 2;
    ypos = height / 2;
    xspeed = 2.5;
    yspeed = 1.8;
    xspeed2 = 1.8;
    yspeed2 = 2.5;
    radEvil = 10;
    life = 100;
    lifeBar.style("background-color", "green");
    poisoned = 0;
    bfCounter = 200;
  }
  if (ypos > height - rad || ypos < rad) {
    background("red");
    ydir = 0;
    xdir = 0;
    xpos = width / 2;
    ypos = height / 2;
    xspeed = 2.5;
    yspeed = 1.8;
    xspeed2 = 1.8;
    yspeed2 = 2.5;
    radEvil = 10;
    life = 100;
  }

  //collecting a ball / adding a point
  if (Math.abs(xpos - xdot) <= 15 && Math.abs(ypos - ydot) <= 15) {
    if (poisoned == 1) {
      if (poisonCounter >= 2) {
        poisoned = 0;
        poisonCounter = 0;
      } else {
        poisonCounter++;
      }
    }

    dotE = 0;

    r = Math.random() * 255;
    g = Math.random() * 255;
    b = Math.random() * 255;
    //stroke(Math.random()*255, Math.random()*255, Math.random()*255);
    console.log("point streak", points);
    points++;
    life = life + 50;
    scoreElem.html("Score = " + points);
    console.log(highScoreValue);
    //updateing and saving the highscore in localStorage
    if (points > highScoreValue) {
      highScoreValue = points;
      localStorage.setItem("highScore", highScoreValue);
      console.log("high", localStorage.getItem("highScore"));
    }

    //increase speed
    if (speedIncrease.checked()) {
      console.log("increasing speed by 0.1");
      xspeed = xspeed + 0.1;
      yspeed = yspeed + 0.1;
      xspeed2 = xspeed2 + 0.1;
      yspeed2 = yspeed2 + 0.1;
    }
    //evil ball radius increase
    if (evilBall.checked()) {
      radEvil = radEvil + 1;
    }
  }
  if (evilBall.checked()) {
    //particles
    for (let i = 0; i < 1; i++) {
      let p = new Particle();
      particles.push(p);
    }
    for (let i = particles.length - 1; i >= 0; i--) {
      particles[i].update();
      particles[i].show();
      if (particles[i].finished()) {
        particles.splice(i, 1);
      }
    }
    fill(40, 25, 2);
  }
}

//controls
function keyPressed() {
  if (xdir == 0 && ydir == 0) {
    points = 0;
    scoreElem.html("Score = " + points);
  }
  if (keyCode === LEFT_ARROW) {
    xdir = -1;
    // xdir2 = -1; agregar 2da pelota q si la tocas te mata.
    bg = 0;
  } else if (keyCode === RIGHT_ARROW) {
    xdir = 1;
    // xdir2 = 1;
    bg = 0;
  }
  if (keyCode === DOWN_ARROW) {
    ydir = 1;
    // ydir2 = 1;
    bg = 0;
  } else if (keyCode === UP_ARROW) {
    ydir = -1;
    //  ydir2 = -1;
    bg = 0;
  }
}
let counter1 = 0;
function keyTyped() {
  if (xdir == 0 && ydir == 0) {
    life = 100;
    if (key === "a") {
      xdir = -1;
      ydir = 1;
      //xdir2 = -1;
      bg = 0;
    } else if (key === "d") {
      xdir = 1;
      ydir = -1;
      // xdir2 = 1;
      bg = 0;
    }
    if (key === "s") {
      ydir = 1;
      xdir = 1;
      // ydir2 = 1;
      bg = 0;
    } else if (key === "w") {
      ydir = -1;
      xdir = -1;
      // ydir2 = -1;
      bg = 0;
    }
  }

  if (key === "a") {
    xdir = -1;
    //xdir2 = -1;
  } else if (key === "d") {
    xdir = 1;
    // xdir2 = 1;
  }
  if (key === "s") {
    ydir = 1;
    // ydir2 = 1;
  } else if (key === "w") {
    ydir = -1;
    // ydir2 = -1;
  }
  if (key === "c") {
    if (xdir == 1 && ydir == -1) {
      ydir = 1;
    } else if (xdir == 1 && ydir == 1) {
      xdir = -1;
    } else if (xdir == -1 && ydir == 1) {
      ydir = -1;
    } else if (xdir == -1 && ydir == -1) {
      xdir = 1;
    }
    console.log(xdir, ydir);
  }
  if (key === "x") {
    if (xdir == 1 && ydir == -1) {
      xdir = -1;
    } else if (xdir == -1 && ydir == -1) {
      ydir = 1;
    } else if (xdir == -1 && ydir == 1) {
      xdir = 1;
    } else if (xdir == 1 && ydir == 1) {
      ydir = -1;
    }

    console.log(xdir, ydir);
  }
  if (key === " ") {
    if (xdir == 0 && ydir == 0) {
      xdir = 1;
      ydir = 1;
    }
  }
}

function touchStarted(e) {
  if (e.x != undefined && e.y != undefined) {
    if (xdir == 0 && ydir == 0) {
      points = 0;
      scoreElem.html("Score = " + points);
    }

    if (xdir == 0 && ydir == 0) {
      if (e.x <= width / 2 && e.y >= height / 2) {
        xdir = -1;
        ydir = 1;
        //xdir2 = -1;
        bg = 0;
      } else if (e.x >= width / 2 && e.y <= height / 2) {
        xdir = 1;
        ydir = -1;
        // xdir2 = 1;
        bg = 0;
      }
      if (e.x >= width / 2 && e.y >= height / 2) {
        ydir = 1;
        xdir = 1;
        // ydir2 = 1;
        bg = 0;
      } else if (e.x <= width / 2 && e.y <= height / 2) {
        ydir = -1;
        xdir = -1;
        // ydir2 = -1;
        bg = 0;
      }
    }

    if (e.x >= width / 2 && e.y <= height / 2) {
      xdir = 1;
      ydir = -1;
    } else if (e.x >= width / 2 && e.y >= height / 2) {
      xdir = 1;
      ydir = 1;
    } else if (e.x <= width / 2 && e.y >= height / 2) {
      xdir = -1;
      ydir = 1;
    } else if (e.x <= width / 2 && e.y <= height / 2) {
      xdir = -1;
      ydir = -1;
    }
  }
}

class Particle {
  constructor() {
    this.x = xpos2;
    this.y = ypos2;
    this.vx = random(-0.3, 0.3);
    this.vy = random(-1, -0.3);
    this.alpha = 255;
    this.d = radEvil / 3;
  }

  finished() {
    return this.alpha < 0;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.alpha -= 3;
    this.d -= random(0.05, 0.1);
  }

  show() {
    noStroke();
    fill(random(200, 230), random(50, 150), 10, this.alpha);
    ellipse(
      random(this.x + radEvil / 2, this.x - radEvil / 2),
      random(this.y + radEvil / 2, this.y - radEvil / 2),
      this.d
    );
  }
}
