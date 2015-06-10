var Game = {};

Game.fps = 50;

Game.initialize = function() {
  this.entities = [];
  this.food = [];
  this.context = document.getElementById("viewport").getContext("2d");
};

Game.draw = function() {
  this.context.clearRect(0, 0, 640, 480);
  // draw food first so it z indexes below players
  for (var i=0; i < this.food.length; i++) {
    this.food[i].draw(this.context);
  }
  // sort the entities by size so they get z indexed properly
  this.entities.sort(function(a,b){return a.radius - b.radius});
  for (var i=0; i < this.entities.length; i++) {
    this.entities[i].draw(this.context);
  }
};

Game.update = function() {
  // update players first b/c collision detection will happen here
  // and food will be marked as eaten so it can be respawned upon
  // calling food update
  for (var i=0; i < this.entities.length; i++) {
    this.entities[i].update(this.food,this.entities);
  }
  for (var i=0; i < this.food.length; i++) {
    this.food[i].update();
  }
};

Game.addFood = function() {
  Game.food.push(new Food());
};

Game.addCircle = function(color) {
  Game.entities.push(new Circle(color));
};
