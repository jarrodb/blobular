var Game = function(options) {
  options = (!options) ? {} : options;

  // init defaults
  this.fps = options.fps || 50;
  this.height = options.height || 576;
  this.width = options.width || 1024;
  this.playerCount = options.entities || 4;
  this.foodCount = options.food || 40;

  // discover the canvas
  this.canvas = document.getElementById(options.viewport || "viewport");
  this.context = this.canvas.getContext("2d");

  // init canvas dimensions and add to context
  this.canvas.height = this.context.height =  this.height;
  this.canvas.width = this.context.width = this.width;

  // init arrays for game state
  this.entities = {};
  this.entityIds = [];
  this.food = [];

  for (i = this.playerCount; i; i--)
    this.addCircle();

  for (i = this.foodCount; i; i--)
    this.addFood();

  this.connect();
}; Game.prototype = {

  // connect to server
  connect: function() {
    var id = this.entityIds[0];
    var entity = this.entities[id];
    console.log(entity);
    entity.human = true;
    entity.color = 'black';

    //http://stackoverflow.com/questions/1402698/binding-arrow-keys-in-js-jquery
    // simulate receiving directions to control the first entity element
    document.onkeydown = function(e) {
      e = e || window.event;
      switch(e.which || e.keyCode) {
      case 37: // left
        entity.x_velocity--;
        break;
      case 38: // up
        entity.y_velocity--;
        break;
      case 39: // right
        entity.x_velocity++;
        break;
      case 40: // down
        entity.y_velocity++;
        break;
      default: return; // exit this handler for other keys
      }
      e.preventDefault(); // prevent the default action (scroll / move caret)
    }
  },

  draw: function() {
    this.context.clearRect(0, 0, this.width, this.height);
    // draw food first so it z indexes below players
    for (var i=0; i < this.food.length; i++) {
      this.food[i].draw();
    }
    // sort the entities by size so they get z indexed properly
    var _this = this;
    this.entityIds.sort(function(a,b){
        return _this.entities[a].radius - _this.entities[b].radius;
    });
    this.entityIds.forEach(function(e, idx, arr) {
        _this.entities[e].draw();
    });
  },

  update: function() {
    // update players first b/c collision detection will happen here
    // and food will be marked as eaten so it can be respawned upon
    // calling food update
    var _this = this;
    this.entityIds.forEach(function(e, idx, arr) {
      _this.entities[e].update(_this.food,_this.entities);
    });
    for (var i=0; i < this.food.length; i++) {
      this.food[i].update();
    }
  },

  run: function() {
    var _this = this,
        loops = 0,
        skipTicks = 1000 / this.fps,
        maxFrameSkip = 10,
        nextGameTick = (new Date).getTime();

    return function() {
      loops = 0;
      while ((new Date).getTime() > nextGameTick) {
        _this.update();
        nextGameTick += skipTicks;
        loops++;
      }
      _this.draw();
    }
  },

  addFood: function() {
    this.food.push(new Food(this.context));
  },

  addCircle: function() {
    var uuid = this.guid();
    this.entityIds.push(uuid);
    this.entities[uuid] = new Circle(this.context);
  },

  guid: function() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
      s4() + '-' + s4() + s4() + s4();
    }
}

