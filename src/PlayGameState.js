STATE_PLAYING = 0;
STATE_GAMEOVER = 1;

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
    ctor:function () {
        this._super();
        this.init();
    },

    init:function () {
        g_playState = this;

        this._state = STATE_PLAYING;
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

        // Create pipe
        MW.CONTAINER.PIPES = [];
        Pipe.preSet();
        this._pipenext_id = 0;
        this._pipeout_id = 0;

        // Score
        MW.SCORE = 0;
        this._lblScore = new cc.LabelTTF("Score: " + MW.SCORE, "Arial", 50);
        this._lblScore.attr({
            anchorX: 0,
            anchorY: 1,
            x: 0,
            y: winSize.height
        })
        this._lblScore.textAlign = cc.TEXT_ALIGNMENT_LEFT;
        this.addChild(this._lblScore, 1000);

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
        this.addChild(this._ground, -5, 1);
        this.addChild(this._bgnext, -10, 1);
        this.addChild(this._groundnext, -5, 1);
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
                this._lblScore.x = this._bird.x- MW.X_BIRD;
            }

            this.checkIsCollide();
            if( this.checkUpdatePipe() ) this.updatePipe();
            if( this.checkUpdateMap() ) this.updateMap();
            this.scoreCounter();

            // print score
            this._lblScore.setString("Score: " + MW.SCORE);
        }
        else if ( this._state == STATE_GAMEOVER){
            if( MW.KEYS[cc.KEY.enter] ){
                MW.KEYS[cc.KEY.enter] = false;
                this.onGameOver();
            }
        }
    },

    checkUpdatePipe: function(){
        console.log(this._pipeout_id)
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
        var y_rand = Math.random()*300 + 75;
        var w_rand = Math.random()*100 + 150;
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

    collide:function(a, b){
        var aRect = a.collideRect();
        var bRect = b.collideRect();

        return this._bird.checkInBox(b.x, b.y);
        return false;
    },

    checkIsCollide:function(){
        // check with pipe
        var pipenext1 = MW.CONTAINER.PIPES[this._pipenext_id];
        var pipenext2 = MW.CONTAINER.PIPES[this._pipenext_id + 1];
        if( this.collide(this._bird, pipenext1)
            || this.collide(this._bird, pipenext2)
            || this.collide(this._bird, this._ground)){
                console.log("collide")
                this._state = STATE_GAMEOVER;
                this._bird.unscheduleUpdate();
        }
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
        console.log("Game over");

        var scene = new cc.Scene();
        scene.addChild(new ScoreState());
        cc.director.runScene(new cc.TransitionFade(1.2, scene));
    }
});

PlayState.scene = function () {
    var scene = new cc.Scene();
    var layer = new PlayState();
    scene.addChild(layer);
    return scene;
};
