function Food() {
  this.x = Math.floor(Math.random() * (640 - 30));;
  this.y = Math.floor(Math.random() * (480 - 30));;
  this.eaten = false;
};

Food.prototype.draw = function(context) {
  context.fillStyle = 'gray';
  context.fillRect(this.x, this.y, 10, 10);
};

Food.prototype.update = function() {
  //respawn eaten food elswhere
  if (this.eaten==true) {
    this.x = Math.floor(Math.random() * (640 - 30));;
    this.y = Math.floor(Math.random() * (480 - 30));;
    this.eaten = false;
  }
};

function Circle(color) {
  this.x = Math.floor(Math.random() * (640 - 30));;
  this.y = Math.floor(Math.random() * (480 - 30));;
  this.velocity = Math.random() > 0.5 ? -1 : 1;
  this.color = color;
  this.radius = 20;
  console.log(arguments.length);
};

Circle.prototype.draw = function(context) {
  context.beginPath();
  context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
  context.fillStyle = this.color;
  context.fill();
  context.lineWidth = 2;
  context.strokeStyle = '#003300';
  context.stroke();
};

Circle.prototype.update = function(food) {
  // do collision dectection with food
  for (var i=0; i < food.length; i++) {
    if(Math.pow((food[i].x - this.x),2) + Math.pow((food[i].y - this.y),2) < Math.pow(this.radius,2) ) {
      food[i].eaten=true;
      this.radius++;
    }
  }


  if (this.y < 0) {
    this.velocity = 1;
  } else if (this.y > 450) {
    this.velocity = -1;
  }
  
  this.y += this.velocity;
};
