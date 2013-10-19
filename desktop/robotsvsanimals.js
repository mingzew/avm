pulse.ready(function() {
    // Create an engine.
    var engine = new pulse.Engine({
        size : {
            width:  750,
            height: 450
        },
        gameWindow: 'helloWindow'
    });

    var gameScene = new rva.GameScene();
    var menuScene = new rva.MenuScene();
    menuScene.events.bind('gameStart', function(){
        engine.scenes.deactivateScene(menuScene);
        engine.scenes.activateScene(gameScene);
    });

    engine.scenes.addScene(menuScene);
    engine.scenes.addScene(gameScene);
    engine.scenes.activateScene(menuScene);

    engine.go(30);

});

var rva = {};

rva.MenuScene = pulse.Scene.extend({
    init : function(params) {
        this._super(params);

        var that = this;

        this.layer = new pulse.Layer();
        this.layer.position = { x: 375, y : 225 };
        this.addLayer(this.layer);

        var bg = new pulse.Sprite({
            src: 'img/menu_bg.png',
            size: {
                width: 750,
                height: 450
            }
        });
        bg.position = { x: 375, y: 225 };
        this.layer.addNode(bg);
                                   
       var titlebg = new pulse.Sprite({
                                      src: 'img/title_bg.png',
                                      size: {
                                      width: 1500,
                                      height: 190
                                      }
                                      });
       titlebg.position = { x: 0, y: 155 };
       this.layer.addNode(titlebg);

        var bg = new pulse.Sprite({
            src: 'img/logo.png',
            size: {
                width: 564,
                height: 234
            }
        });
        bg.position = { x: 375, y: 150 };
        this.layer.addNode(bg);
                                   
     

        // Play button
        var play = new pulse.Sprite({
            src: 'img/play_btn.png'
        });
        play.position = { x: 375, y: 350};
        play.events.bind('click', function(e){
            that.events.raiseEvent('gameStart', e);//should lead to the map
        });
                                   
        // cursor pointer on button
        play.events.bind('mouseover', function(e){
            document.body.style.cursor = "pointer";});
        play.events.bind('mouseout', function(e){
            document.body.style.cursor = "default";});
                                   
        play.events.bind('touchEnd', function(e){
            that.events.raiseEvent('gameStart', e);//should lead to the map
        });
        this.layer.addNode(play);
    }
});

/*
 create a map screen
 */

/*
 create a tower select menu which sends selected towers to the gameScene
 */

rva.GameScene = pulse.Scene.extend({
    init : function(params) {
        this._super(params);

        this.layer = new pulse.Layer();
        this.layer.position = { x: 375, y : 225 };
        this.addLayer(this.layer);

        var storeTower=[5];//should be filled directly with selected towers
        /*storeTower[0]=new Tower({//we need art for the towers
            size:{width:50,height:50},
            towerType:SQUIRREL,
            dragDropEnabled:true,
            dragMoveEnabled:false
         });
        /* storeTower[1]=new Tower({
         size:{width:50,height:50},
         towerType:1
         });
         storeTower[2]=new Tower({
         size:{width:50,height:50},
         towerType:2
         });
         storeTower[3]=new Tower({
         size:{width:50,height:50},
         towerType:3
         });
         storeTower[4]=new Tower({
         size:{width:50,height:50},
         towerType:4
         });*/

        var bg = new pulse.Sprite({
            src: 'img/field_bg.png',
            size: {
                width: 750,
                height: 450
            }
        });
        bg.position = { x: 375, y: 225 };
        this.layer.addNode(bg);

        var gridbg = new pulse.Sprite({
            src: 'img/grid.png',
            size: {
                width: 450,
                height: 450
            }
        });
        gridbg.position = { x: 225, y: 225 };
        this.layer.addNode(gridbg);

        var animalShop=new pulse.Layer({size:{x:150,y:150}});
        animalShop.position={x:525,y:225};

        var visibleTowers=[3];
        /* visibleTowers[0]=storeTower[0];
         visibleTowers[1]=storeTower[1];
         visibleTowers[2]=storeTower[2];
         for(var c=0;c<3;c++){
         animalShop.addNode(visibleTowers[c]);
         }*/

        animalShop.events.bind('mouseWheel',function(e){
            //if up then shift tower selection up if possible, work similarly for down
        });
        animalShop.events.bind('touchMove',function(e){
            //if up then shift tower selection up if possible, work similarly for down
        });
        this.addLayer(animalShop);
    }
});
towerTypeEnum={
    SQUIRREL:{name:'Squirrel',texture:'GRAPHICS/Characters/squirrel-without-helmat.png',cost:15,range:2,fireRate:0,damage:5,maxHealth:50,description:''},
    BEAR:{name:'Bear',texture:'GRAPHICS/Characters/bear.png',cost:20,range:1,fireRate:0,damage:10,maxHealth:150,description:''},
    SPIDER:{name:'Spider',cost:5,range:2,fireRate:0,damage:0,effectLength:0,maxHealth:25,description:'',canSlow:true},
    SNAKE:{name:'Snake',cost:10,range:1,fireRate:0,damage:1,damageOverTime:3,effectLength:5,maxHealth:17,description:''},
    SKUNK:{name:'Skunk',cost:10,range:2,fireRate:0,damage:0,effectLength:0,maxHealth:100,description:'',canConfuse:true}
};
Tower=pulse.Sprite.extend({
    init: function(params){
        this.name=null;
        this.cost=null;
        this.range=null;
        this.fireRate=null;
        this.reload=0;
        this.damage=null;
        this.damageOverTime=0;
        this.effectLength=0;
        this.maxHealth=null;
        this.weakTo=null;
        //this=this.towerTypeEnum[params.towerType];
        this.isAlive=true;
        this.health=this.maxHealth;
        this.description=null;
        this.target=null;
        this.canHitAir=true;
        this.canConfuse=false;
        this.canSlow=false;
        this.size={width:50,height:50};
        this._super(params);
    },
    update:function(){
        this.reload--;
    },
    getTarget: function(robotList){
        /*for(var robot in robotList){
            //select robot closest to base that is in range or select weakest robot in range that can actually be hit
        }*/
        //check grid with lowest value, repeat until
        this.target=robot;
    },
    fire:function(){
        this.getTarget();
        if(this.reload==0){
            this.target.takeDamage(this);
            this.reload=this.fireRate;
        }
    },
    takeDamage:function(robot){
        if(robot.robotType==this.weakTo){
            this.health-=2*robot.damage;
        }else{
            this.health-=robot.damage;
        }
        if(this.health<=0){
            //remove
        }
    },
    upgrade:function(stat){
        var cost=0;
        if(stat=='HP'){
            cost=(this.maxHealth/5);
            /*if(coins>=cost){

            }*/
        }else if(stat=='damage'){

        }else if(stat=='range'){

        }
    }
});