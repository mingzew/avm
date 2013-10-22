towerTypeEnum={
    SQUIRREL:{name:'Squirrel',texture:'GRAPHICS/Characters/squirrel.png',cost:15,range:2,damage:5,maxHealth:50,description:''},
    BEAR:{name:'Bear',texture:'GRAPHICS/Characters/bear.png',cost:20,range:1,damage:10,maxHealth:150,description:''},
    SPIDER:{name:'Spider',texture:'GRAPHICS/Characters/spider.png',cost:5,range:2,damage:0,effectLength:0,maxHealth:25,description:'',canSlow:true},
    SNAKE:{name:'Snake',texture:'GRAPHICS/Characters/snake.png',cost:10,range:1,damage:1,damageOverTime:3,effectLength:5,maxHealth:17,description:''},
    SKUNK:{name:'Skunk',texture:'GRAPHICS/Characters/snake.png',cost:10,range:2,damage:0,effectLength:0,maxHealth:100,description:'',canConfuse:true}
};
Tower=pulse.Sprite.extend({
    init: function(params){
		params = params || {};
        this.name=params.towerType.name;
        this.cost=params.towerType.cost;
        this.range=params.towerType.range;
        this.fireRate=30;
        this.reload=0;
        this.damage=params.towerType.damage;
        this.damageOverTime=params.towerType.damageOverTime;
        this.effectLength=params.towerType.effectLength;
        this.maxHealth=params.towerType.maxHealth;
        this.weakTo=null;
        //this=this.towerTypeEnum[params.towerType];
        this.isAlive=true;
        this.health=this.maxHealth;
        this.description=params.towerType.description;
        this.target=null;
        this.canHitAir=true;
        this.canConfuse=params.towerType.canConfuse;
        this.canSlow=params.towerType.canSlow;
        params.size={width:50,height:50};
		params.src = params.towerType.texture;
        this._super(params);
        this.logicalMap=null;
    },
    /**
     *  Should be called in every game loop for each tower.
     */
    /*update:function(elapsed){
        if(this.reload==0){
            //this.fire(logicalMap);
        }else{
            this.reload--;
        }
        this.__super(elapsed);
    },*/
    /**
     * Searches through the map for the closest robot in range.
     * @param logicalMap
     */
   getTarget: function(){
        this.target=logicalMap.prototype.getNearestToGoalCellContainingRobot(this);
    },
    /**
     * Takes a shot at the robot after targeting it.
     * @param logicalMap
     */
    fire:function(){
        this.getTarget();
        if(this.reload==0&&this.target!=null){
           this.target.takeDamage(this);
            this.reload = this.fireRate;
        }
    },
    /**
     * Causes the tower to take damage from the robot attacking it.
     * @param robot
     */
    takeDamage:function(robot){
        if(robot.robotType==this.weakTo){
            this.health-=2*robot.damage;
        }else{
            this.health-=robot.damage;
        }
        if (this.health <= 0) {
           //remove
        }
    },
    /**
     * Upgrades a selected stat for the tower if the player has enough money.
     * @param stat
     * @param wealth
     */
    upgrade: function (stat,wealth) {
        var cost=0;
        if (stat == 'HP') {
            cost=this.maxHealth/5;
            if(wealth>=cost){
                wealth-=cost;
                this.maxHealth+=20;
                this.health=this.maxHealth;
            }
        } else if (stat == 'damage') {
            cost=this.damage*30;
            if(wealth>=cost){
                wealth-=cost;
                this.damage+=5;
            }
        } else if (stat == 'range') {
            cost=this.range*20;
            if(wealth>=cost){
                wealth-=cost;
                this.range++;
            }
        }
    }
});