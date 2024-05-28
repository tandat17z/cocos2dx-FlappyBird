STATE_PLAYING = 0;
STATE_GAMEOVER = 1;

var g_playState = null;

var PlayState = cc.Layer.extend({
    _state: null,
    _bird: null,
    _lblScore: 0,
    _score: 0,

    _bg: null,
    _ground: null,
    _bgre: null,
    _groundre: null,

    _nextpipe: null,

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

        this.addKeyboardListener();

        // Create pipe
        MW.CONTAINER.PIPES = [];
        Pipe.preSet();
        this._nextpipe = MW.CONTAINER.PIPES[0];

        // Score
        this._score = 0;
        this._lblScore = new cc.LabelTTF("Score: " + this._score, "Arial", 50);
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
        this.addChild(this._bg, -10, 1);
        this.addChild(this._ground, -5, 1);
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
            if(this._bird){
                this.x = MW.X_BIRD - this._bird.x;
                this._lblScore.x = this._bird.x- MW.X_BIRD;
            }
            this.addPipe();
            this.checkIsCollide();
            this.updateMap(dt);
            this.scoreCounter();

            // print score
            this._lblScore.setString("Score: " + this._score);
        }
        else if ( this._state == STATE_GAMEOVER){
            if( MW.KEYS[cc.KEY.enter] ){
                MW.KEYS[cc.KEY.enter] = false;
                this.onGameOver();
            }
        }
    },
    collide:function(a, b){
        var aRect = a.collideRect();
        var bRect = b.collideRect();
        return cc.rectIntersectsRect(aRect, bRect);
    },
    updateMap:function(dt){
        var bg_limit = this._bg.x + MW.BG_WIDTH*MW.BG_SCALE - 120;
        if(  bg_limit <= this._bird.x + MW.WIDTH - MW.X_BIRD){
            console.log("add bg")
            this._bgre = this._bg;
            this._groundre = this._ground;

            this._bg = new Background(bg_limit, 0);
            this._ground = new Ground(bg_limit, 0);
            this.addChild(this._bg, -10, 1);
            this.addChild(this._ground, -5, 1);
        }

        if( this._bgre && this._groundre){
            var bgre_limit = this._bgre.x + MW.BG_WIDTH*MW.BG_SCALE;
            if( bgre_limit <= this._bird.x - MW.X_BIRD){
                console.log("remove bg")
                this.RemovePipe();
                this.removeChild(this._bgre);
                this.removeChild(this._groundre);
                this._bgre = null;
                this._groundre = null;
            }
        }
    },
    addPipe:function(){
        let length = MW.CONTAINER.PIPES.length;
        let pipe = MW.CONTAINER.PIPES[length - 1];

        let rand = Math.random()*300 + 200;
        let y_rand = Math.random()*300 + 75;
        let w_rand = Math.random()*100 + 150;

        if( pipe.x + rand < this._bg.x + MW.BG_WIDTH*MW.BG_SCALE){
            console.log("add pipe" );
            arg = {
                x: pipe.x + rand,
                y: y_rand,
                width: w_rand
            };
            let pipe1 = Pipe.create(arg, false);
            let pipe2 = Pipe.create(arg, true);

            g_playState.addChild(pipe1, 5, 1);
            g_playState.addChild(pipe2, 5, 1);
        }
    },
    RemovePipe: function(){
        while(MW.CONTAINER.PIPES.length > 0){
            let pipe = MW.CONTAINER.PIPES[0];
            if( pipe.x + pipe.width < this._bgre.x + MW.BG_WIDTH*MW.BG_SCALE){
                console.log("remove pipe" + MW.CONTAINER.PIPES.length);
                MW.CONTAINER.PIPES.shift();
                this.removeChild(pipe);
            }

            else
                break;
        }
    },
    checkIsCollide:function(){
        let idx = MW.CONTAINER.PIPES.indexOf(this._nextpipe);

        // check with pipe
        if( this.collide(this._bird, MW.CONTAINER.PIPES[idx])
            || this.collide(this._bird, MW.CONTAINER.PIPES[idx + 1])
            || this._bird.y <= this._ground.height ||  this._bird.y >= MW.HEIGHT ){
                this._state = STATE_GAMEOVER;
                this._bird.unscheduleUpdate();
        }
    },
    scoreCounter:function(){
        let idx = MW.CONTAINER.PIPES.indexOf(this._nextpipe);
        if( this._bird.x > this._nextpipe.x + this._nextpipe.width){
            this._score += 1;
            this._nextpipe = MW.CONTAINER.PIPES[idx + 2];
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
