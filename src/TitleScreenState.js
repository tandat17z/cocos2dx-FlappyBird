

var TitleScreenState = cc.Layer.extend({
    _title : null,
    ctor:function () {
        this._super();
        this.init();
    },

    init:function () {
        winSize = cc.director.getWinSize();

        this.initBackGround();

        // Title
        this._title = new cc.LabelTTF("Flappy Bird", "res/fonts/font.ttf", MW.FONTSIZE1);
        this._title.x = MW.WIDTH/2;
        this._title.y = MW.HEIGHT/2 + MW.FONTSIZE1;
        this._title.color = cc.color(MW.FONTCOLOR);
        this.addChild(this._title, 10);

        this._text = new cc.LabelTTF("Press Enter", "res/fonts/font.ttf", MW.FONTSIZE2);
        this._text.x = MW.WIDTH/2;
        this._text.y = MW.HEIGHT/2 ;
        this._text.color = cc.color(MW.FONTCOLOR);
        this.addChild(this._text, 10);

        this.addKeyboardListener();

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

    onNewGame:function (pSender) {

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
    update:function () {
        if ( MW.KEYS[cc.KEY.enter] ) {
            MW.KEYS[cc.KEY.enter] = false;

            console.log("To countdownScreen");

            //load resources
            cc.LoaderScene.preload(g_countdownScreen, function () {
                // cc.audioEngine.stopMusic();
                // cc.audioEngine.stopAllEffects();
                cc.director.runScene(new CountdownState());
            }, this);
        }
    },
});

TitleScreenState.scene = function () {
    var scene = new cc.Scene();
    var layer = new TitleScreenState();
    scene.addChild(layer);
    return scene;
};