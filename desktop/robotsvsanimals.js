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

        //var storeTower[5];//should be filled directly with selected towers
        /*storeTower[0]=new Tower({//we need art for the towers
            //src:'',
            size:{width:50,height:50}
        });
        storeTower[1]=new Tower({
            //src:'',
            size:{width:50,height:50}
        });
        storeTower[2]=new Tower({
            //src:'',
            size:{width:50,height:50}
        });
        storeTower[3]=new Tower({
            //src:'',
            size:{width:50,height:50}
        });
        storeTower[4]=new Tower({
            //src:'',
            size:{width:50,height:50}
        });*/

        var bg = new pulse.Sprite({
            src: 'img/menu_bg.png',
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
        /*var visibleTowers[3];
        visibleTowers[0]=storeTower[0];
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
/*Tower=pulse.Sprite.extend({
    //towerType
    //cost
    //range
    //fireRate
    //damage
    //description
    init: function(params){

        this._super(params);
    }
});*/