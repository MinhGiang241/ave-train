let canvas = document.querySelector("#canvas");

canvas.width = innerWidth;
canvas.height = innerHeight;

var c = canvas.getContext("2d");
/**
c.fillStyle = "#a23459";
c.fillRect(100, 100, 40, 40);
c.beginPath();
c.moveTo(50, 10);
c.lineTo(300, 100);
c.strokeStyle = "#fa34a3";
c.stroke();
c.lineTo(400, 10);
c.strokeStyle = "#fa3";
c.stroke();
*/

var x = 200;
var y = 200;
var dx = 8;
var dy = 8;
var radius = 100;

c.beginPath();
c.arc(400, 400, 10, 0, Math.PI * 2, false);
c.strokeStyle = "blue";

function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, innerWidth, innerHeight);
  c.beginPath();
  c.arc(x, y, radius, Math.PI * 2, false);
  c.fill();
  c.fillStyle = "red";
  c.strokeStyle = "red";
  c.stroke();

  if (x + radius > innerWidth || x - radius < 0) {
    dx = -dx;
  }
  if (y + radius > innerHeight || y - radius < 0) {
    dy = -dy;
  }
  x += dx;
  y += dy;
}
animate();
