pulse.ready(function () {
    // Create an engine.
    var engine = new pulse.Engine({
        size: {
            width: 750,
            height: 450
        },
        gameWindow: 'helloWindow'
    });

	var splashScene = new rva.SplashScene();
	var mainScene = new rva.MainScene();
	var storeScene1 = new rva.StoreScene1();
	var buythunder = new rva.Buythunder();
	var storeScene2 = new rva.StoreScene2();
	var buylives = new rva.Buylives();
	var storeScene3 = new rva.StoreScene3();
	var buytreats = new rva.Buytreats();
	var leaderboardScene = new rva.LeaderboardScene();
	var levelComplete = new rva.LevelComplete();
	var levelFailed = new rva.LevelFailed();
	var gameScene = new rva.GameScene();
	var mapScene1 = new rva.MapScene();
	var mapScene2 = new rva.MapSceneTwo();
	var pauseScene = new rva.PauseScene();

    splashScene.events.bind('gameStart', function () {
        engine.scenes.deactivateScene(splashScene);
        engine.scenes.activateScene(mainScene);
    });
    mainScene.events.bind('gotoLevelSelect', function () {
        engine.scenes.deactivateScene(mainScene);
        engine.scenes.activateScene(mapScene1);
    });
    mainScene.events.bind('gotoStore', function () {
        engine.scenes.deactivateScene(mainScene);
        engine.scenes.activateScene(storeScene1);
    });
    mainScene.events.bind('gotoLeaderboard', function () {
        engine.scenes.deactivateScene(mainScene);
        engine.scenes.activateScene(leaderboardScene);
    });
    mapScene2.events.bind('gotoLevelSelect', function () {
        engine.scenes.deactivateScene(mapScene2);
        engine.scenes.activateScene(mapScene1);
    });

    mapScene1.events.bind('gotoLevelSelect2', function () {
        engine.scenes.deactivateScene(mapScene1);
        engine.scenes.activateScene(mapScene2);
    });

    mapScene1.events.bind('gotoGamePlay', function () {
	  engine.scenes.deactivateScene(mapScene1);
	  engine.scenes.activateScene(gameScene);
	});
		mapScene1.events.bind('backToMain', function () {
        engine.scenes.deactivateScene(mapScene1);
        engine.scenes.activateScene(mainScene);
    });
	mapScene2.events.bind('backToMain', function () {
        engine.scenes.deactivateScene(mapScene2);
        engine.scenes.activateScene(mainScene);
    });
	storeScene1.events.bind('backToMain', function () {
        engine.scenes.deactivateScene(storeScene1);
        engine.scenes.activateScene(mainScene);
    });
	storeScene1.events.bind('buypowerup', function () {
        engine.scenes.activateScene(buythunder);
    });
	storeScene1.events.bind('toLivesTab', function () {
        engine.scenes.deactivateScene(storeScene1);
        engine.scenes.activateScene(storeScene2);
    });
	storeScene1.events.bind('toTreatsTab', function () {
        engine.scenes.deactivateScene(storeScene1);
        engine.scenes.activateScene(storeScene3);
    });
	buythunder.events.bind('purchase', function () {
        engine.scenes.deactivateScene(buythunder);
    });
	buythunder.events.bind('reject', function () {
        engine.scenes.deactivateScene(buythunder);
    });
	storeScene2.events.bind('backToMain', function () {
        engine.scenes.deactivateScene(storeScene2);
        engine.scenes.activateScene(mainScene);
    });
	storeScene2.events.bind('toPowersTab', function () {
        engine.scenes.deactivateScene(storeScene2);
        engine.scenes.activateScene(storeScene1);
    });
	storeScene2.events.bind('toTreatsTab', function () {
        engine.scenes.deactivateScene(storeScene2);
        engine.scenes.activateScene(storeScene3);
    });
	storeScene2.events.bind('buylives', function () {
        engine.scenes.activateScene(buylives);
    });
	buylives.events.bind('purchase', function () {
        engine.scenes.deactivateScene(buylives);
    });
	buylives.events.bind('reject', function () {
        engine.scenes.deactivateScene(buylives);
    });
	storeScene3.events.bind('backToMain', function () {
        engine.scenes.deactivateScene(storeScene3);
        engine.scenes.activateScene(mainScene);
    });
	storeScene3.events.bind('buytreats', function () {
        engine.scenes.activateScene(buytreats);
    });
	storeScene3.events.bind('toPowersTab', function () {
        engine.scenes.deactivateScene(storeScene3);
        engine.scenes.activateScene(storeScene1);
    });
	storeScene3.events.bind('toLivesTab', function () {
        engine.scenes.deactivateScene(storeScene3);
        engine.scenes.activateScene(storeScene2);
    });
	buytreats.events.bind('purchase', function () {
        engine.scenes.deactivateScene(buytreats);
    });
	buytreats.events.bind('reject', function () {
        engine.scenes.deactivateScene(buytreats);
    });
	leaderboardScene.events.bind('backToMain', function () {
        engine.scenes.deactivateScene(leaderboardScene);
        engine.scenes.activateScene(mainScene);
    });
    leaderboardScene.events.bind('friendInvite', function () {
        alert("Friend invitation sent.");
    });
    leaderboardScene.events.bind('helpSent', function () {
        alert("Help sent!");
    });
    leaderboardScene.events.bind('helpRequest', function () {
        alert("Help requested.");
    });
	gameScene.events.bind('pause', function () {
		engine.scenes.activateScene(pauseScene);
    });
	gameScene.events.bind('normalSpeed', function () {
		//normal speed
    });
	gameScene.events.bind('fastForward', function () {
		//fast forward
    });
	pauseScene.events.bind('resume', function () {
		engine.scenes.deactivateScene(pauseScene);
    });
	pauseScene.events.bind('mainMenu', function () {
		engine.scenes.deactivateScene(pauseScene);
		engine.scenes.deactivateScene(gameScene);
		engine.scenes.activateScene(mainScene);
    });
	levelComplete.events.bind('playagain', function () {
		engine.scenes.deactivateScene(levelComplete);
    });
	levelComplete.events.bind('continue', function () {
		engine.scenes.deactivateScene(levelComplete);
		engine.scenes.deactivateScene(gameScene);
		engine.scenes.activateScene(mapScene1);
    });
	levelFailed.events.bind('playagain', function () {
		engine.scenes.deactivateScene(levelFailed);
    });
	levelFailed.events.bind('continue', function () {
		engine.scenes.deactivateScene(levelFailed);
		engine.scenes.deactivateScene(gameScene);
		engine.scenes.activateScene(mapScene1);
    });
	

    engine.scenes.addScene(splashScene);
	engine.scenes.addScene(mainScene);
	engine.scenes.addScene(storeScene1);
	engine.scenes.addScene(storeScene2);
	engine.scenes.addScene(storeScene3);
	engine.scenes.addScene(buythunder);
	engine.scenes.addScene(buytreats);
	engine.scenes.addScene(buylives);
	engine.scenes.addScene(leaderboardScene);
	engine.scenes.addScene(gameScene);
	engine.scenes.addScene(mapScene1);
	engine.scenes.addScene(mapScene2);
	engine.scenes.addScene(pauseScene);
	engine.scenes.addScene(levelComplete);
	engine.scenes.addScene(levelFailed);
    engine.scenes.activateScene(splashScene);

    engine.go(30);

});

var clone = (function(){
    return function (obj) { Clone.prototype=obj; return new Clone() };
    function Clone(){}
}());

var rva = {};

rva.SplashScene = pulse.Scene.extend({
    init: function (params) {
        this._super(params);

        var that = this;

        this.layer = new pulse.Layer();
        this.layer.position = { x: 375, y: 225 };
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
        play.events.bind('click', function (e) {
            that.events.raiseEvent('gameStart', e);//should lead to the map
        });

        // cursor pointer on button
        play.events.bind('mouseover', function (e) {
            document.body.style.cursor = "pointer";
        });
        play.events.bind('mouseout', function (e) {
            document.body.style.cursor = "default";
        });

        play.events.bind('touchEnd', function (e) {
            that.events.raiseEvent('gameStart', e);//should lead to the map
        });
        this.layer.addNode(play);
    }
});

rva.MainScene = pulse.Scene.extend({
    init: function (params) {
        this._super(params);

        var that = this;

        this.layer = new pulse.Layer();
        this.layer.position = { x: 375, y: 225 };
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
                height: 170
            }
        });
        titlebg.position = { x: 375, y: 100 };
        this.layer.addNode(titlebg);

        var bg = new pulse.Sprite({
            src: 'img/logo.png',
            size: {
                width: 564,
                height: 234
            }
        });
        bg.position = { x: 375, y: 90 };
        this.layer.addNode(bg);
        var play = buttonMaker('img/Real Play.png', 'gotoLevelSelect', 375, 250, that);
        this.layer.addNode(play);
        var store = buttonMaker('img/Real Store.png', 'gotoStore', 375, 325, that);
        this.layer.addNode(store);
        var leader = buttonMaker('img/Real Leader.png', 'gotoLeaderboard', 375, 400, that);
        this.layer.addNode(leader);
    }
});

rva.StoreScene1 = pulse.Scene.extend({
    init: function (params) {
        this._super(params);

               var that = this;

        this.layer = new pulse.Layer();
        this.layer.position = { x: 375, y: 225 };
        this.addLayer(this.layer);


        var bg = new pulse.Sprite({
            src: 'img/menu_bg.png',
            size: {
        
            }
        });
        bg.position = { x: 375, y: 225 };
        this.layer.addNode(bg);
		
		var bg = new pulse.Sprite({
            src: 'img/poweruptable.png',
        });
        bg.position = { x: 375, y: 225 };
        this.layer.addNode(bg);
		
		var bg = new pulse.Sprite({
            src: 'img/storetext.png',
			size: {width: 350, height: 75}
        });
        bg.position = { x: 375, y: 50 };
        this.layer.addNode(bg);
		
		for (var i = 0; i < 4; i++)
		{
			var bg = buttonMaker('img/buybuttonsmall.png', 'buypowerup', 525, 180+(42*i), that);
			this.layer.addNode(bg);
		}
		
		
		var mainMenu = buttonMaker('img/powers_active.png', '', 186, 111, that);
        this.layer.addNode(mainMenu);
		var mainMenu = buttonMaker('img/lives_not.png', 'toLivesTab', 284, 111, that);
        this.layer.addNode(mainMenu);
		var mainMenu = buttonMaker('img/treats_not.png', 'toTreatsTab', 382, 111, that);
        this.layer.addNode(mainMenu);
		var mainMenu = buttonMaker('img/MAIN.png', 'backToMain', 100, 410, that);
        this.layer.addNode(mainMenu);
    }
});

rva.Buythunder = pulse.Scene.extend({
    init: function (params) {
        this._super(params);

        var that = this;

        this.layer = new pulse.Layer();
        this.layer.position = { x: 375, y: 225 };
        this.addLayer(this.layer);

        var bg = new pulse.Sprite({
            src: 'img/buythunder.png',
        });
		bg.position = { x: 375, y: 225 };
        this.layer.addNode(bg);
		
		var bg = buttonMaker('img/buybuttonlarge.png', 'purchase', 332, 244, that);
		this.layer.addNode(bg);
		var bg = buttonMaker('img/nobutton.png', 'reject', 422,  244, that);
		this.layer.addNode(bg);
       
    }
});

rva.StoreScene2 = pulse.Scene.extend({
    init: function (params) {
        this._super(params);

               var that = this;

        this.layer = new pulse.Layer();
        this.layer.position = { x: 375, y: 225 };
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
            src: 'img/storetext.png',
			size: {width: 350, height: 75}
        });
        bg.position = { x: 375, y: 50 };
        this.layer.addNode(bg);
		
		var bg = new pulse.Sprite({
            src: 'img/livestable.png',
        });
        bg.position = { x: 375, y: 225 };
        this.layer.addNode(bg);
		
		for (var i = 0; i < 4; i++)
		{
			var bg = buttonMaker('img/buybuttonsmall.png', 'buylives', 525, 180+(42*i), that);
			this.layer.addNode(bg);
		}
		
		var mainMenu = buttonMaker('img/powers_not.png', 'toPowersTab', 186, 111, that);
        this.layer.addNode(mainMenu);
		var mainMenu = buttonMaker('img/lives_active.png', '', 284, 111, that);
        this.layer.addNode(mainMenu);
		var mainMenu = buttonMaker('img/treats_not.png', 'toTreatsTab', 382, 111, that);
        this.layer.addNode(mainMenu);
		var mainMenu = buttonMaker('img/MAIN.png', 'backToMain', 100, 410, that);
        this.layer.addNode(mainMenu);
    }
});

rva.Buylives = pulse.Scene.extend({
    init: function (params) {
        this._super(params);

        var that = this;

        this.layer = new pulse.Layer();
        this.layer.position = { x: 375, y: 225 };
        this.addLayer(this.layer);

        var bg = new pulse.Sprite({
            src: 'img/buylives.png',
        });
		bg.position = { x: 375, y: 225 };
        this.layer.addNode(bg);
		
		var bg = buttonMaker('img/buybuttonlarge.png', 'purchase', 332, 244, that);
		this.layer.addNode(bg);
		var bg = buttonMaker('img/nobutton.png', 'reject', 422,  244, that);
		this.layer.addNode(bg);
       
    }
});

rva.StoreScene3 = pulse.Scene.extend({
    init: function (params) {
        this._super(params);

        var that = this;

        this.layer = new pulse.Layer();
        this.layer.position = { x: 375, y: 225 };
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
            src: 'img/storetext.png',
			size: {width: 350, height: 75}
        });
        bg.position = { x: 375, y: 50 };
        this.layer.addNode(bg);
		
		var bg = new pulse.Sprite({
            src: 'img/treatstable.png',
        });
        bg.position = { x: 375, y: 225 };
        this.layer.addNode(bg);
		
		for (var i = 0; i < 4; i++)
		{
			var bg = buttonMaker('img/buybuttonsmall.png', 'buytreats', 525, 180+(42*i), that);
			this.layer.addNode(bg);
		}
		
		var mainMenu = buttonMaker('img/powers_not.png', 'toPowersTab', 186, 111, that);
        this.layer.addNode(mainMenu);
		var mainMenu = buttonMaker('img/lives_not.png', 'toLivesTab', 284, 111, that);
        this.layer.addNode(mainMenu);
		var mainMenu = buttonMaker('img/treats_active.png', '', 382, 111, that);
        this.layer.addNode(mainMenu);
		var mainMenu = buttonMaker('img/MAIN.png', 'backToMain', 100, 410, that);
        this.layer.addNode(mainMenu);
    }
});

rva.Buytreats = pulse.Scene.extend({
    init: function (params) {
        this._super(params);

        var that = this;

        this.layer = new pulse.Layer();
        this.layer.position = { x: 375, y: 225 };
        this.addLayer(this.layer);

        var bg = new pulse.Sprite({
            src: 'img/buytreats.png',
        });
		bg.position = { x: 375, y: 225 };
        this.layer.addNode(bg);
		
		var bg = buttonMaker('img/buybuttonlarge.png', 'purchase', 332, 244, that);
		this.layer.addNode(bg);
		var bg = buttonMaker('img/nobutton.png', 'reject', 422,  244, that);
		this.layer.addNode(bg);
       
    }
});

rva.LeaderboardScene = pulse.Scene.extend({
    init: function (params) {
        this._super(params);

        var that = this;

        this.layer = new pulse.Layer();
        this.layer.position = { x: 375, y: 225 };
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
            src: 'GRAPHICS/LeaderboardScreen/Select Map.png',
            size: {
            width: 200,
                height: 350
            }
        });
        bg.position = { x: 110, y: 200 };
        this.layer.addNode(bg);

        var bg = new pulse.Sprite({
            src: 'GRAPHICS/LeaderboardScreen/Leaderboard.png',
            size: {
                width: 400,
                height: 250
            }
        });
        bg.position = { x: 450, y: 175 };
        this.layer.addNode(bg);
        var bg = new pulse.Sprite({
            src: 'img/leaderboard.png',
            size: {
                
            }
        });
        bg.position = { x: 455, y: 190 };
        this.layer.addNode(bg);

        var bg = new pulse.Sprite({
            src: 'GRAPHICS/LeaderboardScreen/Invite Friends.png',
            size: {
                width: 400,
                height: 100
            }
        });
        bg.position = { x: 450, y: 375 };
        this.layer.addNode(bg);

                               
      var bg = new pulse.Sprite({
                                src: 'img/orange.png',
                                size: {
                                width: 70,
                                height: 70
                                }
                                });
      bg.position = { x: 70, y: 95 };
      this.layer.addNode(bg);
                                          
        for (var i = 1; i <= 8; i++)
        {
            var bg = new pulse.Sprite({
                src: 'img/stages/Tree1-'+i+'.png',
                size: {
                    width: 60,
                    height: 60
                }
            });
            bg.position = { x: 70 + 70 * ((i-1)%2), y: 95 + 70 * (Math.floor((i-1)/2)) };
            this.layer.addNode(bg);
        }

        for (var i = 1; i <= 5; i++)
        {
            var bg = buttonMaker('img/friend'+i+'.jpg', 'friendInvite', 225 + 75*i, 385, that);
            bg.size =  {
              
            }
            this.layer.addNode(bg);
        }

        for (var i = 1; i < 4; i++)
        {
            var bg = buttonMaker('img/gethelp.png', 'helpRequest', 445, 87 + (50*i), that);
            bg.size =  {
                width: 30,
                height: 30
            }
            this.layer.addNode(bg);
            var bg = buttonMaker('img/help.png', 'helpSent', 475, 87 + (50*i), that);
            bg.size =  {
                width: 30,
                height: 30
            }
            this.layer.addNode(bg);
        }

        var mainMenu = buttonMaker('img/MAIN.png', 'backToMain', 100, 410, that);
        this.layer.addNode(mainMenu);
                                          
                                          
          var bg = new pulse.Sprite({
                                    src: 'img/stages/Tree1-1rot.png',
                                    size:{
                                    width: 90, height: 90
                                    }
                                    });
          bg.position = { x: 650, y: 100 };
          this.layer.addNode(bg);
    }
});

rva.PauseScene = pulse.Scene.extend({
    init: function (params) {
        this._super(params);

        var that = this;

        this.layer = new pulse.Layer();
        this.layer.position = { x: 375, y: 225 };
        this.addLayer(this.layer);
                                    
        var bg = new pulse.Sprite({
                                  src: 'img/black.png',
                                  size: {
                                  width: 1500,
                                  height: 1000
                                  }
                                  });
        bg.position = { x: 0, y: 0 };
        this.layer.addNode(bg);
        

        var bg = new pulse.Sprite({
            src: 'img/pauseimage.png',
        });
		bg.position = { x: 375, y: 225 };
        this.layer.addNode(bg);
		
		var bg = buttonMaker('img/RESUME.png', 'resume', 370, 220, that);
		this.layer.addNode(bg);
		var bg = buttonMaker('img/QUIT.png', 'mainMenu', 370,  310, that);
		this.layer.addNode(bg);
    }
});


rva.MapScene = pulse.Scene.extend({
init: function (params) {
this._super(params);

var that = this;

this.layer = new pulse.Layer();
this.layer.position = { x: 375, y: 225 };
this.addLayer(this.layer);
	  
	  
	var bg = new pulse.Sprite({
		src: 'img/stages/parkbg.png',
		size: {
		width: 750,
		height: 450
		}
	});
	  bg.position = { x: 375, y: 225 };
	  this.layer.addNode(bg);

var l11 = buttonMaker('img/stages/Tree1-1.png', 'gotoGamePlay', 100, 400, that);
var l12 = buttonMaker('img/stages/Tree1-2.png', 'gotoGamePlay', 225, 370, that);
var l13 = buttonMaker('img/stages/Tree1-3.png', 'gotoGamePlay', 350, 360, that);
var l14 = buttonMaker('img/stages/Tree1-4.png', 'gotoGamePlay', 475, 370, that);
var l15 = buttonMaker('img/stages/Tree1-5.png', 'gotoGamePlay', 550, 270, that);
var l16 = buttonMaker('img/stages/Tree1-6.png', 'gotoGamePlay', 450, 210, that);
var l17 = buttonMaker('img/stages/Tree1-7.png', 'gotoGamePlay', 350, 180, that);
var l18 = buttonMaker('img/stages/Tree1-8.png', 'gotoGamePlay', 300, 80, that);
var l19 = buttonMaker('img/stages/Tree1-9.png', 'gotoGamePlay', 410, 40, that);
var l110 = buttonMaker('img/stages/Tree1-10.png', 'gotoGamePlay', 640, 50, that);
	  
	  
	  var bg = new pulse.Sprite({
			src: 'img/stages/stage1title.png'
		});
	  bg.position = { x: 100, y: 75 };
	  this.layer.addNode(bg);
	  
	  	  var bg = new pulse.Sprite({
			src: 'img/hearts.png',
					size: {
					width: 200,
					height: 75
					}
		});
    bg.position = { x: 640, y: 160 };
	  this.layer.addNode(bg);
	  
	  
	  var nextlevel = buttonMaker('img/stages/nextlevel.png', 'gotoLevelSelect2', 660, 380, that);
	  this.layer.addNode(nextlevel);
	  
	var mainMenu = buttonMaker('img/MAIN.png', 'backToMain', 100, 260, that);
    this.layer.addNode(mainMenu);


this.layer.addNode(l11);
this.layer.addNode(l12);
this.layer.addNode(l13);
this.layer.addNode(l14);
this.layer.addNode(l15);
this.layer.addNode(l16);
this.layer.addNode(l17);
this.layer.addNode(l18);
this.layer.addNode(l19);
this.layer.addNode(l110);

	   }
	   });


rva.MapSceneTwo = pulse.Scene.extend({
	  init: function (params) {
	  this._super(params);
	  
	  var that = this;
	  
	  this.layer = new pulse.Layer();
	  this.layer.position = { x: 375, y: 225 };
	  this.addLayer(this.layer);
	  
	  
	  var bg = new pulse.Sprite({
			src: 'img/stages/arcticbg.png',
			size: {
			width: 750,
			height: 450
			}
		});
	  bg.position = { x: 375, y: 225 };
	  this.layer.addNode(bg);
	  
	  var l11 = buttonMaker('img/stages/Igloo1-1.png', 'gotoGamePlay', 100, 400, that);
	  var l12 = buttonMaker('img/stages/Igloo1-2.png', 'gotoGamePlay', 225, 380, that);
	  var l13 = buttonMaker('img/stages/Igloo1-3.png', 'gotoGamePlay', 350, 360, that);
	  var l14 = buttonMaker('img/stages/Igloo1-4.png', 'gotoGamePlay', 475, 370, that);
	  var l15 = buttonMaker('img/stages/Igloo1-5.png', 'gotoGamePlay', 550, 290, that);
	  var l16 = buttonMaker('img/stages/Igloo1-6.png', 'gotoGamePlay', 430, 250, that);
	  var l17 = buttonMaker('img/stages/Igloo1-7.png', 'gotoGamePlay', 315, 220, that);
	  var l18 = buttonMaker('img/stages/Igloo1-8.png', 'gotoGamePlay', 220, 150, that);
	  var l19 = buttonMaker('img/stages/Igloo1-9.png', 'gotoGamePlay', 340, 90, that);
	  var l110 = buttonMaker('img/stages/Igloo1-10.png', 'gotoGamePlay', 470, 60, that);
	  
	  
	  var bg = new pulse.Sprite({
			src: 'img/stages/stage2title.png'
		});
	  bg.position = { x: 100, y: 75 };
	  this.layer.addNode(bg);
	  
	  	  	  var bg = new pulse.Sprite({
			src: 'img/hearts.png',
					size: {
					width: 200,
					height: 75
					}
		});
	  bg.position = { x: 640, y: 160 };
	  this.layer.addNode(bg);
	  
	  
	  var nextlevel = buttonMaker('img/stages/prevlevel.png', 'gotoLevelSelect', 660, 380, that);
	  this.layer.addNode(nextlevel);
    
	var mainMenu = buttonMaker('img/MAIN.png', 'backToMain', 100, 260, that);
    this.layer.addNode(mainMenu);
	  
	  this.layer.addNode(l11);
	  this.layer.addNode(l12);
	  this.layer.addNode(l13);
	  this.layer.addNode(l14);
	  this.layer.addNode(l15);
	  this.layer.addNode(l16);
	  this.layer.addNode(l17);
	  this.layer.addNode(l18);
	  this.layer.addNode(l19);
	  this.layer.addNode(l110);
	  
	  }
	  });
	  
rva.LevelComplete = pulse.Scene.extend({
    init: function (params) {
        this._super(params);

        var that = this;

        this.layer = new pulse.Layer();
        this.layer.position = { x: 375, y: 225 };
        this.addLayer(this.layer);

        var bg = new pulse.Sprite({
            src: 'img/levelcomplete.png',
        });
		bg.position = { x: 375, y: 225 };
        this.layer.addNode(bg);
		
		var bg = buttonMaker('img/playagain.png', 'playagain', 280, 265, that);
		this.layer.addNode(bg);
		var bg = buttonMaker('img/continue.png', 'continue', 465,  265, that);
		this.layer.addNode(bg);
    }
});

rva.LevelFailed = pulse.Scene.extend({
    init: function (params) {
        this._super(params);

        var that = this;

        this.layer = new pulse.Layer();
        this.layer.position = { x: 375, y: 225 };
        this.addLayer(this.layer);

        var bg = new pulse.Sprite({
            src: 'img/gameover.png',
        });
		bg.position = { x: 375, y: 225 };
        this.layer.addNode(bg);
		
		var bg = buttonMaker('img/playagain.png', 'playagain', 280, 265, that);
		this.layer.addNode(bg);
		var bg = buttonMaker('img/continue.png', 'continue', 465,  265, that);
		this.layer.addNode(bg);
    }
});



/*
 create a map screen
 */

/*
 create a tower select menu which sends selected towers to the gameScene
 */

rva.GameScene = pulse.Scene.extend({
    init: function (params) {
        this._super(params);

        this.layer = new pulse.Layer();
        this.layer.position = { x: 375, y: 225 };
        this.addLayer(this.layer);
		var that = this;
        /*
         var storeTower = [5];//should be filled directly with selected towers
         storeTower[0] = new Tower({//we need art for the towers
         size: {width: 50, height: 50},
         towerType: 0,
         dragDropEnabled: true,
         dragMoveEnabled: false

         var storeTower=[5];//should be filled directly with selected towers
         /*storeTower[0]=new Tower({//we need art for the towers
         size:{width:50,height:50},
         towerType:SQUIRREL,
         dragDropEnabled:true,
         dragMoveEnabled:false
         });
         storeTower[1]=new Tower({
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
		
		var playButton = buttonMaker('GRAPHICS/Pause(In-Game)/pause_botton.png', 'pause', 545, 420, that);
		playButton.size = {width: 30, height:30};
		this.layer.addNode(playButton);
		var playButton = buttonMaker('GRAPHICS/Pause(In-Game)/play_botton.png', 'normalSpeed', 595, 420, that);
		playButton.size = {width: 30, height:30};
		this.layer.addNode(playButton);
		var playButton = buttonMaker('GRAPHICS/Pause(In-Game)/fastfoward_botton.png', 'fastForward', 645, 420, that);
		playButton.size = {width: 30, height:30};
		this.layer.addNode(playButton);

        var animalShop = new pulse.Layer({size: {x: 150, y: 150}});
        animalShop.position = {x: 525, y: 225};
		

        var visibleTowers = [3];
        /* visibleTowers[0]=storeTower[0];
         visibleTowers[1]=storeTower[1];
         visibleTowers[2]=storeTower[2];
         for(var c=0;c<3;c++){
         animalShop.addNode(visibleTowers[c]);
         }*/

        animalShop.events.bind('mouseWheel', function (e) {
            //if up then shift tower selection up if possible, work similarly for down
        });
        animalShop.events.bind('touchMove', function (e) {
            //if up then shift tower selection up if possible, work similarly for down
        });
        this.addLayer(animalShop);
		
				 
		 var testtower = new Tower();
		 testtower.position = {x: 220, y: 220};
		 testtower.size = { width: 50, height:50};
		 this.layer.addNode(testtower);
		 console.log(testtower);
    }
});
towerTypeEnum={
    SQUIRREL:{name:'Squirrel',texture:'GRAPHICS/Characters/squirrel-without-helmat.png',cost:15,range:2,damage:5,maxHealth:50,description:''},
    BEAR:{name:'Bear',texture:'GRAPHICS/Characters/bear.png',cost:20,range:1,damage:10,maxHealth:150,description:''},
    SPIDER:{name:'Spider',cost:5,range:2,damage:0,effectLength:0,maxHealth:25,description:'',canSlow:true},
    SNAKE:{name:'Snake',cost:10,range:1,damage:1,damageOverTime:3,effectLength:5,maxHealth:17,description:''},
    SKUNK:{name:'Skunk',cost:10,range:2,damage:0,effectLength:0,maxHealth:100,description:'',canConfuse:true}
};
Tower=pulse.Sprite.extend({
    init: function(params){
		params = params || {};
        this.name=null;
        this.cost=null;
        this.range=null;
        this.fireRate=30;
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
		params.src = 'GRAPHICS/Characters/squirrel.png';
        this._super(params);
    },
    /**
     *  Should be called in every game loop for each tower.
     */
    // update:function(){
        // if(this.reload==0){
            // this.fire();
        // }else{
            // this.reload--;
        // }
    // },
    /**
     * Searches through the map for the closest robot in range.
     * @param logicalMap
     */
   // getTarget: function(logicalMap){
        //this.target=logicalMap.prototype.getNearestToGoalCellContainingRobot(this.range);
    //},
    /**
     * Takes a shot at the robot after targeting it.
     * @param logicalMap
     */
    // fire:function(logicalMap){
        // this.getTarget(logicalMap);
        // if(this.reload==0){
           // this.target.takeDamage(this);
            // this.reload = this.fireRate;
        // }
    // },
    /**
     * Causes the tower to take damage from the robot attacking it.
     * @param robot
     */
    // takeDamage:function(robot){
        // if(robot.robotType==this.weakTo){
            // this.health-=2*robot.damage;
        // }else{
            // this.health-=robot.damage;
        // }
        // if (this.health <= 0) {
           // remove
        // }
    // },
    // /**
     // * Upgrades a selected stat for the tower if the player has enough money.
     // * @param stat
     // * @param wealth
     // */
    // upgrade: function (stat,wealth) {
        // var cost=0;
        // if (stat == 'HP') {
            // cost=this.maxHealth/5;
            // if(wealth>=cost){
                // wealth-=cost;
                // this.maxHealth+=20;
                // this.health=this.maxHealth;
            // }
        // } else if (stat == 'damage') {
            // cost=this.damage*30;
            // if(wealth>=cost){
                // wealth-=cost;
                // this.damage+=5;
            // }
        // } else if (stat == 'range') {
            // cost=this.range*20;
            // if(wealth>=cost){
                // wealth-=cost;
                // this.range++;
            // }
        // }
    // }
});
//Begin map and map cell code
function GridCell(tower, isgoal, x, y) {
    if (tower)
        this.Tower = tower;
    if (isgoal) {
        this.DistanceFromGoal = 0;
        this.DirectDistanceFromGoal = 0;
    }
    else {
        this.DistanceFromGoal = 99999999;
        this.DirectDistanceFromGoal = 99999999;
    }
    if (x || x == 0) {
        this.x = x;
    }
    if (y || y == 0) {
        this.y = y;
    }
    this.Robot = [];
}
GridCell.prototype.getTower = function () {
    return this.Tower;
};
GridCell.prototype.getDistanceFromGoal = function () {
    return this.DistanceFromGoal;
};
GridCell.prototype.getDirectDistanceFromGoal = function () {
    return this.DirectDistanceFromGoal;
};
GridCell.prototype.setDistanceFromGoal = function (newdistance) {
    this.DistanceFromGoal = newdistance;
};
GridCell.prototype.setDirectDistanceFromGoal = function (newdistance) {
    this.DirectDistanceFromGoal = newdistance;
};
GridCell.prototype.setTower = function (tower) {
    this.Tower = tower;
};
GridCell.prototype.getRobot = function () {
    return this.Robot;
};
GridCell.prototype.setRobot = function (robots) {
    this.Robot = robots;
};
GridCell.prototype.addRobot = function (robot) {
    this.Robot.push(robot);
};
GridCell.prototype.removeRobot = function (robot) {
    var index = this.Robot.indexOf(robot);
    this.Robot = this.Robot.splice(0, index).concat(this.Robot.splice(index + 1, this.Robot.length));
};
GridCell.prototype.removeAllRobots = function () {
    this.Robot = [];
};
GridCell.prototype.isTowerPresent = function () {
    return !(this.Tower == undefined);
};
GridCell.prototype.isRobotPresent = function () {
    return this.Robot.length == 0;
};
GridCell.prototype.isgoal = function () {
    return this.DistanceFromGoal == 0;
};
GridCell.prototype.makegoal = function () {
    this.DistanceFromGoal = 0;
    this.DirectDistanceFromGoal = 0;
};
function LogicalMap(goalx, goaly) {
    this.Map = new Array();
    for (var k = 0; k < this.MAP_WIDTH; k++) {
        this.Map[k] = [];
    }
    for (var i = 0; i < this.MAP_HEIGHT; i++) {
        for (var j = 0; j < this.MAP_WIDTH; j++) {
            this.Map[j][i] = new GridCell(null, 0, j, i);
        }
    }
    if ((goalx || goalx == 0) && (goaly || goaly == 0)) {
        this.Map[goalx][goaly].makegoal();
        this.updateDistancesFromGoal();
        this.updateDirectDistancesFromGoal();
    }
}
LogicalMap.prototype.MAP_HEIGHT = 9 ;
LogicalMap.prototype.MAP_WIDTH = 18;
LogicalMap.prototype.getMap = function () {
    return this.Map;
};
LogicalMap.prototype.setMap = function (map) {
    this.Map = map;
};
LogicalMap.prototype.getMAP_HEIGHT = function () {
    return this.MAP_HEIGHT;
};
LogicalMap.prototype.getMAP_WIDTH = function () {
    return this.MAP_WIDTH;
};
LogicalMap.prototype.setTowerUpdateDistances = function (x, y, tower) {
    this.Map[x][y].setTower(tower);
    this.updateDistancesFromGoal();
}
//input: the tower which the cell needs to be in range of
LogicalMap.prototype.getNearestToGoalCellContainingRobot = function (tower) {
    if (!tower || !tower.range) {
        //caller didn't provide a tower
        return null;
    }
    var qeue = [];
    var cell;
    //find the cell containing the given tower
    for (var i = 0; i < this.MAP_WIDTH; i++) {
        for (var j = 0; j < this.MAP_HEIGHT; j++) {
            if (this.Map[i][j].getTower() == tower) {
                cell = this.Map[i][j];
            }
        }
    }
    //qeue up every cell in range
    qeue = this.helper(cell, qeue, tower.range);
    //starting with the closest to the goal
    qeue.sort(function (a, b) {
        return a.getDistanceFromGoal() - b.getDistanceFromGoal()
    });
    //check the qeue for a cell containing a robot
    for (var m = 0; m < qeue.length; m++) {
        if (qeue[m].getRobot().length > 0) return qeue[m];
    }
    //no cells in range contain a robot
    return null;
};
LogicalMap.prototype.helper = function (cell, qeue, range) {
    qeue.push(cell);
    if (range <= 0) {
        return qeue;
    }
    if (cell.y - 1 >= 0) {
        if (qeue.indexOf(this.Map[cell.x][cell.y - 1]) == -1) {
            qeue = this.helper(this.Map[cell.x][cell.y - 1], qeue, range - 1);
        }
    }
    if (cell.y + 1 <= this.MAP_HEIGHT) {
        if (qeue.indexOf(this.Map[cell.x][cell.y + 1]) == -1) {
            qeue = this.helper(this.Map[cell.x][cell.y + 1], qeue, range - 1);
        }
    }
    if (cell.x - 1 >= 0) {
        if (qeue.indexOf(this.Map[cell.x - 1][cell.y]) == -1) {
            qeue = this.helper(this.Map[cell.x - 1][cell.y], qeue, range - 1);
        }
    }
    if (cell.x + 1 <= this.MAP_WIDTH) {
        if (qeue.indexOf(this.Map[cell.x + 1][cell.y]) == -1) {
            qeue = this.helper(this.Map[cell.x + 1][cell.y], qeue, range - 1);
        }
    }
    return qeue;
}
LogicalMap.prototype.updateDistancesFromGoal = function () {
    var hasupdated = true;
    while (hasupdated) {
        hasupdated = false;
        for (var i = 0; i < this.MAP_WIDTH; i++) {
            for (var j = 0; j < this.MAP_HEIGHT; j++) {
                var currentlowest = this.Map[i][j].getDistanceFromGoal();
                var temp;
                if (i > 0) {
                    temp = this.Map[i - 1][j].getDistanceFromGoal();
                    if (temp < currentlowest) {
                        currentlowest = temp;
                    }
                }
                if (i < this.MAP_WIDTH - 1) {
                    temp = this.Map[i + 1][j].getDistanceFromGoal();
                    if (temp < currentlowest) {
                        currentlowest = temp;
                    }
                }
                if (j > 0) {
                    temp = this.Map[i][j - 1].getDistanceFromGoal();
                    if (temp < currentlowest) {
                        currentlowest = temp;
                    }
                }
                if (j < this.MAP_HEIGHT - 1) {
                    temp = this.Map[i][j + 1].getDistanceFromGoal();
                    if (temp < currentlowest) {
                        currentlowest = temp;
                    }
                }

                if (this.Map[i][j].isTowerPresent() && (currentlowest + this.Map[i][j].Tower.health) < this.Map[i][j].getDistanceFromGoal()) {
                    this.Map[i][j].DistanceFromGoal = currentlowest + this.Map[i][j].Tower.health;
                    hasupdated = true;
                }
                if ((!this.Map[i][j].isTowerPresent()) && ((currentlowest + 1) < this.Map[i][j].getDistanceFromGoal())) {
                    this.Map[i][j].setDistanceFromGoal(currentlowest + 1);
                    hasupdated = true;

                }

            }
        }
    }
    ;
//updateDirectDistancesFromGoal could probably be made much faster by implementing the logic in the flowchart, but should only need to run once per map creation so it's efficiency is a low priority
    LogicalMap.prototype.updateDirectDistancesFromGoal = function () {
        var hasupdated = true;
        while (hasupdated) {
            hasupdated = false;
            for (var i = 0; i < this.MAP_WIDTH; i++) {
                for (var j = 0; j < this.MAP_HEIGHT; j++) {
                    var currentlowest = this.Map[i][j].getDirectDistanceFromGoal();
                    var temp;
                    if (i > 0) {
                        temp = this.Map[i - 1][j].getDirectDistanceFromGoal();
                        if (temp < currentlowest) {
                            currentlowest = temp;
                        }
                    }
                    if (i < this.MAP_WIDTH - 1) {
                        temp = this.Map[i + 1][j].getDirectDistanceFromGoal();
                        if (temp < currentlowest) {
                            currentlowest = temp;
                        }
                    }
                    if (j > 0) {
                        temp = this.Map[i][j - 1].getDirectDistanceFromGoal();
                        if (temp < currentlowest) {
                            currentlowest = temp;
                        }
                    }
                    if (j < this.MAP_HEIGHT - 1) {
                        temp = this.Map[i][j + 1].getDirectDistanceFromGoal();
                        if (temp < currentlowest) {
                            currentlowest = temp;
                        }
                    }
                    if (((currentlowest + 1) < this.Map[i][j].getDirectDistanceFromGoal())) {
                        this.Map[i][j].setDirectDistanceFromGoal(currentlowest + 1);
                        hasupdated = true;

                    }

                }

            }
        }
    };
}
//End map and map cell code

function buttonMaker(imgSrc, eventName, xPos, yPos, screen)
{
	var play = new pulse.Sprite({
		src: imgSrc
	});

	play.position = { x: xPos, y: yPos};

	play.events.bind('click', function (e) {
		screen.events.raiseEvent(eventName, e);//should lead to the map
	});
	play.events.bind('mouseover', function (e) {
		document.body.style.cursor = "pointer";
	});
	play.events.bind('mouseout', function (e) {
		document.body.style.cursor = "default";
	});
	play.events.bind('touchEnd', function (e) {
		screen.events.raiseEvent(eventName, e);//should lead to the map
	});

	return play;
}