STATE_PLAYING = 0;
STATE_GAMEOVER = 1;
STATE_PAUSE = 2;

var g_playState = null;

var PlayState = cc.Layer.extend({
    _state: null,
    _bird: null,
    _lblScore: 0,

    _bg: null,
    _ground: null,
    _bgnext: null,
    _groundnext: null,

    _pipenext_id: null,
    _pipeout_id: null,
    _useSkill: false,
    ctor:function () {
        this._super();
        this.init();
    },

    init:function () {
        g_playState = this;

        this._state = STATE_PLAYING;
        this._useSkill = false;
        winSize = cc.director.getWinSize();

        // Create Background
        this.initBackGround();

        // Create bird
        this._bird = new Bird();
        this._bird.x = 200;
        this._bird.y = 200;
        this.addChild(this._bird, 20, 1);

        // Listener
        this.addKeyboardListener();
        this.addTouchListener();

        // Create pipe
        MW.CONTAINER.PIPES = [];
        Pipe.preSet();
        this._pipenext_id = 0;
        this._pipeout_id = 0;

        // Score
        MW.SCORE = 0;
        // this._lblScore = new cc.LabelTTF("Score: " + MW.SCORE, "Arial", 50);
        // this._lblScore.attr({
        //     anchorX: 0,
        //     anchorY: 1,
        //     x: 0,
        //     y: winSize.height
        // })
        // this._lblScore.textAlign = cc.TEXT_ALIGNMENT_LEFT;
        // this.addChild(this._lblScore, 1000);
        //
        // //Pause
        // cc.MenuItemFont.setFontSize(MW.FONTSIZE2);
        // cc.MenuItemFont.setFontName(res.flappy_ttf);
        // var systemMenu = new cc.MenuItemFont("Pause", this.pause);
        // systemMenu.setColor(cc.color(MW.FONTCOLOR));
        //
        // this._pause = new cc.Menu(systemMenu);
        // this._pause.x = 0;
        // this._pause.y = 0;
        // systemMenu.attr({
        //     x: winSize.width/2,
        //     y: winSize.height/2 - 125,
        // });
        // this.addChild(this._pause, 1, 2);

        // schedule
        this.scheduleUpdate();
    },

    initBackGround:function()
    {
        this._bg = new Background(0, 0);
        this._ground = new Ground(0, 0);

        var x_next = Math.min(this._bg.width, this._ground.width)*MW.BG_SCALE - 10;
        this._bgnext = new Background(x_next, 0);
        this._groundnext = new Ground(x_next, 0);

        this.addChild(this._bg, -10, 1);
        this.addChild(this._ground, 15, 1);
        this.addChild(this._bgnext, -10, 1);
        this.addChild(this._groundnext, 15, 1);
    },

    addTouchListener:function(){
        var self = this;
        cc.eventManager.addListener({
            event: cc.EventListener.MOUSE,
            onMouseDown: function(event){
                MW.CLICK = true;
                // console.log(event.getLocationX(), event.getLocationY())
            },
            onMouseUp: function(event){
                MW.CLICK = false;
            },
        }, this);
    },
    addKeyboardListener:function(){
        //Add code here
        if( cc.sys.capabilities.hasOwnProperty('keyboard')){
            cc.eventManager.addListener({
                event: cc.EventListener.KEYBOARD,
                onKeyPressed: function(key, event){
                    MW.KEYS[key] = true;
                },
                onKeyReleased: function(key, event){
                    MW.KEYS[key] = false;
                }
            }, this);
        }
    },

    update:function (dt) {
        if( this._state == STATE_PLAYING){
            // update camera
            if(this._bird){
                this.x = MW.X_BIRD - this._bird.x;
                // this._lblScore.x = this._bird.x- MW.X_BIRD;
            }


            if( this._bird._skill == 0){
                if( this._useSkill ){
                    MW.SCORE += 1;
                    //update pipe next
                    var length = MW.CONTAINER.PIPES.length;
                    this._pipenext_id = (this._pipenext_id + 2)%length;
                    this._useSkill = false;
                }
                if( this.checkIsCollide()) {
                    console.log("collide")
                    this._bird.unscheduleUpdate();
                    this._state = STATE_GAMEOVER;
                }
            }
            else{
                this._useSkill = true;
            }

            if( this.checkCollideGround()){
                console.log("collide")
                this._bird.unscheduleUpdate();
                this._state = STATE_GAMEOVER;
            }

            // Update Map
            if( this.checkUpdatePipe() ) this.updatePipe();
            if( this.checkUpdateMap() ) this.updateMap();
            this.scoreCounter();
        }
    },

    checkUpdatePipe: function(){
        var pipeout = MW.CONTAINER.PIPES[this._pipeout_id];
        var pipe_limit = pipeout.x + pipeout.width*MW.PIPE_SCALE + 10;
        return pipe_limit < this._bird.x - MW.X_BIRD;
    },

    checkUpdateMap: function(){
        var bg_limit = this._bg.x + Math.min(this._bg.width, this._ground.width)*MW.BG_SCALE - 10;
        return bg_limit < this._bird.x - MW.X_BIRD;
    },

    updateMap:function(){
        console.log("update bg");

        var bg_limit = this._bgnext.x + Math.min(this._bg.width, this._ground.width)*MW.BG_SCALE - 10;
        this._bg.x = bg_limit;
        this._ground.x = bg_limit;

        var bg_temp = this._bgnext, ground_temp = this._groundnext;
        this._bgnext = this._bg;
        this._groundnext = this._ground;
        this._bg = bg_temp;
        this._ground = ground_temp;
    },

    updatePipe:function(){
        console.log("update pipe");
        var length = MW.CONTAINER.PIPES.length;
        var pipeout1 = MW.CONTAINER.PIPES[this._pipeout_id];
        var pipeout2 = MW.CONTAINER.PIPES[(this._pipeout_id + 1)%length];
        var pipere = MW.CONTAINER.PIPES[(this._pipeout_id + length - 2)%length];

        var rand = Math.random()*300 + 200;
        var y_rand = Math.random()*200 + 75;
        var w_rand = Math.random()*150 + 250;
        var arg1 = {
            x: pipere.x + rand,
            y: y_rand,
            width: w_rand
        }
        var arg2 = {
            x: pipere.x + rand,
            y: y_rand,
            width: w_rand
        }
        pipeout1.setArg(arg1);
        pipeout2.setArg(arg2);

        this._pipeout_id = (this._pipeout_id + 2)%length;
    },

    checkCollideGround: function(){
        // var points = this._bird.getPoints();
        // // check with ground
        // if( points[1].y <= this._ground.height * MW.BG_SCALE) return true;
        // return false;

        var aRect = this._bird.collideRect();
        var bRect = this._ground.collideRect();
        return cc.rectIntersectsRect(aRect, bRect);
    },

    checkIsCollide:function(){
        // var points = this._bird.getPoints();
        var pipenext1 = MW.CONTAINER.PIPES[this._pipenext_id];
        var pipenext2 = MW.CONTAINER.PIPES[this._pipenext_id + 1];

        var aRect = this._bird.collideRect();
        var bRect = pipenext1.collideRect();
        var cRect = pipenext2.collideRect();

        return cc.rectIntersectsRect(aRect, bRect) || cc.rectIntersectsRect(aRect, cRect);
        // // check with pipe
        // for(var id in points) {
        //     var p = points[id];
        //     // console.log(pipenext1.checkInPipe(p.x, p.y), pipenext2.checkInPipe(p.x, p.y));
        //     if( pipenext1.checkInPipe(p.x, p.y) || pipenext2.checkInPipe(p.x, p.y) ) return true;
        // }

        //
        // var points_ = [
        //     cc.p(pipenext1.x, pipenext1.y + pipenext1.getHeight()),
        //     cc.p(pipenext1.x + pipenext1.getWidth(), pipenext1.y + pipenext1.getHeight()),
        //     cc.p(pipenext2.x, pipenext2.y),
        //     cc.p(pipenext2.x + pipenext2.getWidth(), pipenext2.y)
        // ]
        // for( var p in points_){
        //     var p = points_[id];
        //     if( this._bird.checkInBird(p.x, p.y) ) return true;
        // }

        return false;

    },

    scoreCounter:function(){
        var pipenext = MW.CONTAINER.PIPES[this._pipenext_id];
        if( this._bird.x > pipenext.x + pipenext.width*MW.PIPE_SCALE){
            MW.SCORE += 1;
            //update pipe next
            var length = MW.CONTAINER.PIPES.length;
            this._pipenext_id = (this._pipenext_id + 2)%length;
        }
    },

    onGameOver:function(){
        cc.log("on game over")
        var scene = new cc.Scene();
        scene.addChild(new ScoreState());
        cc.director.runScene(scene);
    },

    pause: function(){
        this._state = STATE_PAUSE;
    }
});

PlayState.scene = function () {
    var scene = new cc.Scene();
    var layer = new PlayState();
    scene.addChild(layer);
    return scene;
};
