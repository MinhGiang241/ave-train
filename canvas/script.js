"use strict";
let canvas = document.querySelector("#canvas");

canvas.width = innerWidth;
canvas.height = innerHeight;

var c = canvas.getContext("2d");
var mouse = {
  x: 0,
  y: 0,
};
addEventListener("mousemove", function (e) {
  mouse.x = e.offsetX;
  mouse.y = e.offsetY;
});

addEventListener("resize", function (e) {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
});

var x = 200;
var y = 200;
var dx = 8;
var dy = 8;
var radius = 100;
var maxRadius = 200;
var minRadius = 5;
var colorArray = [
  "#ffaa33",
  "#99ffaa",
  "#00ff00",
  "#4411aa",
  "#ff1100",
  "#1E90FF",
  "#DDA0DD",
  "#FF7F50",
  "#FFD700",
];
var gravity = 1;
var friction = 0.9;

function Circle(x, y, dx, dy, radius, color) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.radius = radius;
  this.color = color;

  this.draw = function () {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.strokeStyle = this.color;
    c.fillStyle = this.color;
    c.lineWidth = 2;
    c.fill();
    c.stroke();
  };

  this.move = function () {
    if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
      this.dx = -this.dx;
    }
    if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
      this.dy = -this.dy;
    }
    this.x += this.dx;
    this.y += this.dy;
  };

  this.freeMove = function () {
    if (
      mouse.x - this.x < 50 &&
      mouse.x - this.x > -50 &&
      mouse.y - this.y < 50 &&
      mouse.y - this.y > -50
    ) {
      if (this.radius < maxRadius) {
        this.radius += 1;
      }
    } else if (this.radius > minRadius) {
      this.radius -= 1;
    }
    this.move();
    this.draw();
  };
}

function Ball(x, y, dx, dy, radius, color) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.radius = radius;
  this.color = color;

  this.draw = function () {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.strokeStyle = this.color;
    c.fillStyle = this.color;
    c.lineWidth = 2;
    c.fill();
    c.stroke();
  };
  this.update = function () {
    if (this.y + this.radius + dy > canvas.height) {
      this.dy = -this.dy * friction;
    } else {
      this.dy += gravity;
    }
    this.y += this.dy;
    this.draw();
  };

  this.click = function () {
    this.dy = randomIntFromRange(0, 100);
  };
}
addEventListener("click", (e) => {
  console.log("click");
  for (let b of ballArr) {
    b.click();
  }
});

var circleArr = Array.from({ length: 2000 }, (_d) => {
  return new Circle(
    Math.random() * (innerWidth - minRadius * 2) + minRadius,
    Math.random() * (innerHeight - minRadius * 2) + minRadius,
    Math.random() * 8 - 4,
    Math.random() * 8 - 4,
    minRadius,
    colorArray[Math.floor(Math.random() * colorArray.length)],
  );
});

function randomIntFromRange(start, end) {
  return Math.floor(Math.random() * (end - start) + start);
}

var ballArr = Array.from(
  { length: 100 },
  (_d) =>
    new Ball(
      randomIntFromRange(0, canvas.width),
      innerHeight - radius,
      dx,
      dy,
      radius,
      // colorArray[Math.floor(Math.random() * colorArray.length)],
      `rgb(
        ${Math.floor(Math.random() * 256)},
        ${Math.floor(Math.random() * 256)},
        ${Math.floor(Math.random() * 256)}
      )`,
    ),
);

function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, innerWidth, innerHeight);
  for (let ball of ballArr) {
    ball.update();
  }
}

animate();
