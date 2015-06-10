function Rect() {
  this.x = Math.floor(Math.random() * (640 - 30));;
  this.y = Math.floor(Math.random() * (480 - 30));;
  this.velocity = Math.random() > 0.5 ? -1 : 1;
};

Rect.prototype.draw = function(context) {
  context.fillRect(this.x, this.y, 30, 30);
};

Rect.prototype.update = function() {
  if (this.y < 0) {
    this.velocity = 1;
  } else if (this.y > 450) {
    this.velocity = -1;
  }
  
  this.y += this.velocity;
};

function Circle(color) {
  this.x = Math.floor(Math.random() * (640 - 30));;
  this.y = Math.floor(Math.random() * (480 - 30));;
  this.velocity = Math.random() > 0.5 ? -1 : 1;
  this.color = color;
  console.log(arguments.length);
};

Circle.prototype.draw = function(context) {
  radius=20;
  context.beginPath();
  context.arc(this.x, this.y, radius, 0, 2 * Math.PI, false);
  context.fillStyle = this.color;
  context.fill();
  context.lineWidth = 2;
  context.strokeStyle = '#003300';
  context.stroke();
};

Circle.prototype.update = function() {
  if (this.y < 0) {
    this.velocity = 1;
  } else if (this.y > 450) {
    this.velocity = -1;
  }
  
  this.y += this.velocity;
};
