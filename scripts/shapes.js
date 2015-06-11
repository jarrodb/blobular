var Food = function(context) {
  this.context = context;
  this.x = Math.floor(Math.random() * (this.context.width - 30));;
  this.y = Math.floor(Math.random() * (this.context.height - 30));;
  this.eaten = false;
}; Food.prototype = {
  draw: function() {
    this.context.fillStyle = 'gray';
    this.context.fillRect(this.x, this.y, 10, 10);
  },

  update: function() {
    //respawn eaten food elswhere
    if (this.eaten==true) {
      this.x = Math.floor(Math.random() * (this.context.width - 30));;
      this.y = Math.floor(Math.random() * (this.context.height - 30));;
      this.eaten = false;
    }
  }
}

var Circle = function(context) {
  this.context = context;
  this.x = Math.floor(Math.random() * (this.context.width - 30));;
  this.y = Math.floor(Math.random() * (this.context.height - 30));;
  this.y_velocity = (Math.random() > 0.5 ? -1 : 1)*3;
  this.x_velocity = (Math.random() > 0.5 ? -1 : 1)*3;
  this.max_velocity=4;
  this.decay_renew=30;
  this.decay=this.decay_renew;
  this.color = this.randomColor();
  this.radius = 20;
  this.eaten = false;
  this.human = false;
}; Circle.prototype = {

  draw: function() {
    this.context.beginPath();
    this.context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
    this.context.fillStyle = this.color;
    this.context.fill();
    this.context.lineWidth = 2;
    this.context.strokeStyle = '#003300';
    this.context.stroke();
  },

  update: function(food,entities) {
    if(this.eaten==false) {
      // do collision dectection with food
      for (var i=0; i < food.length; i++) {
        if(this.collisionWith(food[i])) {
          food[i].eaten=true;
          this.radius++;
        }
      }
      // do collision detection with player entities
      for (var id in entities) {
        var entity = entities[id];
        if (entity.eaten == false) {
          // we are cheking if the CENTER of the entity is within our radius,
          //so we are half covering them
          //console.log('processing collission against '+entity.color);
          if(this.collisionWith(entity)) {
            // we can only eat other entities if we are 20% larger
            if(this.radius>entity.radius*1.2){
              console.log(this.color+' eating '+entity.color);
              entity.eaten = true;
              // this is how you get huge
              this.radius+=(entity.radius/2);
            }
          }
        }
      }

      // update coordinates based on velocity
      this.y += this.y_velocity;
      this.x += this.x_velocity;

      // screen edge bounce checks and position readjustment
      if (this.y < 0) {
        this.y_velocity = this.y_velocity * -1;
        this.y = 0 - this.y;
      } else if (this.y > (this.context.height - 30)) {
        this.y_velocity = this.y_velocity * -1;
        this.y = (this.context.height - 30) - (this.y - (this.context.height - 30));
      }
      if (this.x < 0) {
        this.x_velocity = this.x_velocity * -1;
        this.x = 0 - this.x;
      } else if (this.x > this.context.width) {
        this.x_velocity = this.x_velocity * -1;
        this.x = this.context.width - (this.x - this.context.width);
      }

      if (!this.human) { // temp

        if(!this.decay-- || this.x_velocity==0 || this.y_velocity==0) {
          this.decay=this.decay_renew;
          if (this.x_velocity!=0) {
            this.x_velocity += this.x_velocity > 0 ? -1 : 1;
          } else {
            this.x_velocity = (Math.random() > 0.5 ? -1 : 1)*Math.floor(Math.random()*100%4);
          }

          if (this.y_velocity!=0) {
            this.y_velocity += this.y_velocity > 0 ? -1 : 1;
          } else {
            this.y_velocity = (Math.random() > 0.5 ? -1 : 1)*Math.floor(Math.random()*100%4);
          }
        }

      }
    } else {
      // effectively wipe the entity off the screen on next draw
      this.x=0;
      this.y=0;
      this.radius=0;
    }
  },

  collisionWith: function(shape) {
    return (Math.pow((shape.x - this.x),2) + Math.pow((shape.y - this.y),2))
      < Math.pow(this.radius,2)
  },

  // pilfered from stackoverflow
  randomColor: function() {
    var r = Math.floor(Math.random() * 256);
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);
    return 'rgb(' + r + ',' + g + ',' + b + ')';
  }
}
