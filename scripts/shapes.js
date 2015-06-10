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
  this.y_velocity = Math.random() > 0.5 ? -1 : 1;
  this.x_velocity = Math.random() > 0.5 ? -1 : 1;
  this.color = color;
  this.radius = 20;
  this.eaten = false;
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

Circle.prototype.update = function(food,entities) {
  if(this.eaten==false){
  // do collision dectection with food
  for (var i=0; i < food.length; i++) {
    if(Math.pow((food[i].x - this.x),2) + Math.pow((food[i].y - this.y),2) < Math.pow(this.radius,2) ) {
      food[i].eaten=true;
      this.radius++;
    }
  }
  // do collision detection with player entities
  for (var i=0; i < entities.length; i++) {
    if(entities[i].eaten==false){
      // we are cheking if the CENTER of the entity is within our radius, so we are half covering them
      var current=entities[i];
      //console.log('processing collission against '+current.color);
      var distance = Math.pow((current.x - this.x),2) + Math.pow((current.y - this.y),2);
      var r_sq = Math.pow(this.radius,2);
      //console.log('distance '+distance+' r_sq '+r_sq);
      if(distance < r_sq) {
        // we can only eat other entities if we are 20% larger
        if(this.radius>current.radius*1.2){
           console.log(this.color+' eating '+current.color);
          entities[i].eaten=true;
          // this is how you get huge
          this.radius+=(entities[i].radius/2);
        }
      }
    }
  }

  // screen edge  bounce checks
  if (this.y < 0) {
    this.y_velocity = 1;
  } else if (this.y > 450) {
    this.y_velocity = -1;
  }
  if (this.x < 0) {
    this.x_velocity = 1;
  } else if (this.x > 640) {
    this.x_velocity = -1;
  }
  // update coordinates based on velocity
  this.y += this.y_velocity;
  this.x += this.x_velocity;
  } else {
    // effectively wipe the entity off the screen on next draw
    this.x=0;
    this.y=0;
    this.radius=0;
  }
};
