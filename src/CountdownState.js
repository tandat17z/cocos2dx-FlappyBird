var CountdownState = cc.Layer.extend({
    _title : null,
    _count : MW.COUNTDOWN,
    ctor:function () {
        this._super();
        this.init();
    },

    init:function () {
        winSize = cc.director.getWinSize();

        this.initBackGround();

        // Countdown
        this._title = new cc.LabelTTF("", "res/fonts/font.ttf", MW.FONTSIZE1);
        this._title.setString(this._count);
        this._title.x = MW.WIDTH/2;
        this._title.y = MW.HEIGHT/2;
        this._title.color = cc.color(MW.FONTCOLOR);
        this.addChild(this._title, 10);

        // schedule
        this.schedule(this.update, 1);
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
    update:function (dt) {
        this._count -= 1;
        if( this._count < 0){
            cc.LoaderScene.preload(g_countdownScreen, function () {
                // cc.audioEngine.stopMusic();
                // cc.audioEngine.stopAllEffects();
                cc.director.runScene(new PlayState());
            }, this);
        }
        else{
            this._title.setString(this._count);
        }
    },
});

CountdownState.scene = function () {
    var scene = new cc.Scene();
    var layer = new CountdownState();
    scene.addChild(layer);
    return scene;
};
