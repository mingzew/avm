var Robot = pulse.Sprite.extend({
   init: function(args) {

      args = args || {};
	   args.src = 'img/spider_robot.png';
     this.velocity = { x: 0, y: (Math.random() * 300) - 150 };
	

      this._super(args);
   },
   update: function(elapsedMS) {

      var newX = this.position.x + this.velocity.x * (elapsedMS / 1000);
      var newY = this.position.y + this.velocity.y * (elapsedMS / 1000);

      if(newX - (this.size.width / 2) <= 0) {
         newX = this.size.width / 2;
         this.velocity.x *= -1;
      }

      if(newY - (this.size.height / 2) <= 0) {
         newY = this.size.height / 2;
         this.velocity.y *= -1;
      }

      if(newX + (this.size.width / 2) >= 450) {
         newX = 450 - this.size.width / 2;
         this.velocity.x *= -1;
      }

      if(newY + (this.size.height / 2) >= 450) {
         newY = 450 - this.size.height / 2;
         this.velocity.y *= -1;
      }

      this.position.x = newX;
      this.position.y = newY;

      this._super(elapsedMS);
   }
});