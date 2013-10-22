var Robot = pulse.Sprite.extend({
   init: function(args) {
		this.x = 0;
		this.y = 0;
      args = args || {};
	   args.src = 'img/spider_robot.png';
     this.velocity = { x: 0, y: (250) - 150 };
		this.timer = 0;
		this.RobotType = 'Spider';
		this.health = 50;
		this.damage = 1;
		this.canFly = false;
      this._super(args);
   },
   
   
   update: function(elapsedMS) {
      if (paused) return;
	  if (this.health <= 0){
	  cellgrid[this.x][this.y].removeRobot(this);
	  gameScene.layer.removeNode(this);
	  }
	  this.timer += elapsedMS;
      var newX = this.position.x + this.velocity.x * (elapsedMS / 1000);
      var newY = this.position.y + this.velocity.y * (elapsedMS / 1000);
	  var cellgrid = logicalmap.getMap();
	  if (cellgrid[this.x][this.y].isgoal()){
	  cellgrid[this.x][this.y].removeRobot(this);
	  gameScene.layer.removeNode(this);
          engine.scenes.activateScene(levelFailed);
		  paused = true;
	  }
	        this.position.x = newX;
      this.position.y = newY;
	  if (this.timer >= 500){
	  
	  this.timer = 0;
		var nextlocation = cellgrid[this.x][this.y]; 
		//check if south is in bounds and closer to goal than the previous nextlocation, if so it's the new nextlocation
		 if(this.y+1 < logicalmap.getMAP_HEIGHT() && cellgrid[this.x][this.y + 1].getDistanceFromGoal() < nextlocation.getDistanceFromGoal()) {
		 nextlocation = cellgrid[this.x][this.y + 1]; }
		 //check if north is in bounds and closer to goal than the previous nextlocation, if so it's the new nextlocation
		 if(this.y-1 >= 0 && cellgrid[this.x][this.y - 1].getDistanceFromGoal() < nextlocation.getDistanceFromGoal()) {
		 nextlocation = cellgrid[this.x][this.y + 1]; }
		  //check if west is in bounds and closer to goal than the previous nextlocation, if so it's the new nextlocation
		 if(this.x-1 >= 0 && cellgrid[this.x - 1][this.y].getDistanceFromGoal() < nextlocation.getDistanceFromGoal()) {
		 nextlocation = cellgrid[this.x][this.y + 1]; }
		  //check if east is in bounds and closer to goal than the previous nextlocation, if so it's the new nextlocation
		 if(this.x+1 < logicalmap.getMAP_WIDTH() && cellgrid[this.x+1][this.y].getDistanceFromGoal() < nextlocation.getDistanceFromGoal()) {
		 nextlocation = cellgrid[this.x + 1][this.y]; }
		 //now that we know the new location for the robot, we can remove it from it's old location
		 cellgrid[this.x][this.y].removeRobot(this); 
		  //add it to it's new location
		 nextlocation.addRobot(this);
		 var totalvelocity = this.velocity.x + this.velocity.y;
		 this.velocity.x = (nextlocation.x - this.x) * totalvelocity;
		 this.velocity.y = (nextlocation.y - this.y) * totalvelocity;
		 this.x = nextlocation.x; this.y = nextlocation.y;
		 this.position.x = (this.x * 50) + 25; this.position.y = (this.y * 50) + 25;
			  }
	  if(this.position.x > 425){
	  this.position.x = 425;}
	  if(this.position.y > 425){
	  this.position.y = 425;}


      this._super(elapsedMS);
   },
       takeDamage : function(Tower){
       this.health -= Tower.damage;
    },

    getHealth : function(){
      return this.health;
    }
});