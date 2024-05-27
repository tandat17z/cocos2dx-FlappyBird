STATE_COUNTDOWN = 0;
STATE_PLAYING = 1;
STATE_GAMEOVER = 2;

var PlayState = cc.Layer.extend({
    _state: 0,
    _bird: null,
    _title : null,
    _lblScore: 0,
    ctor:function () {
        this._super();
        this.init();

        this._bird = new Bird();
        this._bird.x = 200;
        this._bird.y = 200;
        this.addChild(this._bird);
    },

    init:function () {
        winSize = cc.director.getWinSize();

        this.initBackGround();
        this.addKeyboardListener();
        // Countdown
        this._title = new cc.LabelTTF("Play State", res.font_ttf, MW.FONTSIZE1);
        this._title.x = MW.WIDTH/2;
        this._title.y = MW.HEIGHT/2;
        this._title.color = cc.color(MW.FONTCOLOR);
        this.addChild(this._title, 10);

        // schedule
        this.scheduleUpdate();
    },

    initBackGround:function()
    {
        var bg = new cc.Sprite(res.background_png);
        bg.attr({
            anchorX: 0,
            anchorY: 0,
            x: 0,
            y: 0,
            scale: MW.BG_SCALE
        });
        this.addChild(bg, -10, 1);

        var ground = new cc.Sprite(res.ground_png);
        ground.attr({
            anchorX: 0,
            anchorY: 0,
            x: 0,
            y: 0,
            scale: MW.BG_SCALE
        });
        this.addChild(ground, -5, 1);
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
        if(this._bird){
            this.x = 200 - this._bird.x;
        }
        // To Score State
        if ( MW.KEYS[cc.KEY.enter] ) {
            MW.KEYS[cc.KEY.enter] = false;

            console.log("To ScoreState");

            var scene = new cc.Scene();
            scene.addChild(new ScoreState());
            cc.director.runScene(new cc.TransitionFade(1.2, scene));

            // //load resources
            // cc.LoaderScene.preload(g_countdownScreen, function () {
            //     // cc.audioEngine.stopMusic();
            //     // cc.audioEngine.stopAllEffects();
            //     cc.director.runScene(new ScoreState());
            // }, this);
        }
    },
});

PlayState.scene = function () {
    var scene = new cc.Scene();
    var layer = new PlayState();
    scene.addChild(layer);
    return scene;
};
