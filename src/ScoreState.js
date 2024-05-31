var g_scoreState = null;

var ScoreState = cc.Layer.extend({
    _title : null,
    ctor:function () {
        this._super();
        this.init();
    },

    init:function () {
        g_scoreState = this;
        winSize = cc.director.getWinSize();

        this.initBackGround();
        this.addKeyboardListener();

        // Score
        this._title = new cc.LabelTTF("Score: " + MW.SCORE, res.font_ttf, MW.FONTSIZE2);
        this._title.x = MW.WIDTH/2;
        this._title.y = MW.HEIGHT/2 + 25;
        this._title.color = cc.color(MW.FONTCOLOR);
        this.addChild(this._title, 10);

        // bestScore
        this._best = new cc.LabelTTF("Best: " + MW.BEST_SCORE, res.font_ttf, MW.FONTSIZE2);
        this._best.x = MW.WIDTH/2;
        this._best.y = MW.HEIGHT/2 - 50;
        this._best.color = cc.color(MW.FONTCOLOR);
        this.addChild(this._best, 10);

        // Play
        cc.MenuItemFont.setFontSize(MW.FONTSIZE2);
        cc.MenuItemFont.setFontName(res.flappy_ttf);
        var systemMenu = new cc.MenuItemFont("Play", this.toPlayState);
        systemMenu.setColor(cc.color(MW.FONTCOLOR));
        var menu = new cc.Menu(systemMenu);
        menu.x = 0;
        menu.y = 0;
        systemMenu.attr({
            x: winSize.width/2,
            y: winSize.height/2 - 125,
        });
        this.addChild(menu, 1, 2);

        // schedule
        this.scheduleUpdate();
    },

    onEnter: function (){
        this._super();
    },

    onExit: function(){
        //TODO

      this._super();
    },

    initBackGround:function() {
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

    update:function () {
        if ( MW.KEYS[cc.KEY.enter] ) {
            MW.KEYS[cc.KEY.enter] = false;

            console.log("Game over To countdownScreen");

            //load resources
            // cc.LoaderScene.preload(g_playScreen, function () {
                // cc.audioEngine.stopMusic();
                // cc.audioEngine.stopAllEffects();

            var scene = new cc.Scene();
            scene.addChild(new CountdownState())
            cc.director.runScene(scene);
            console.log("after runScene CountdownState");
            // }, this);
        }
    },
    toPlayState:function(){
        console.log("Game over To countdownScreen");

        var scene = new cc.Scene();
        scene.addChild(new CountdownState())
        cc.director.runScene(scene);
        console.log("after runScene CountdownState");
    }
});

ScoreState.scene = function () {
    var scene = new cc.Scene();
    var layer = new ScoreState();
    scene.addChild(layer);
    return scene;
};
