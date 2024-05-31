

var TitleScreenState = cc.Layer.extend({
    _title : null,
    _maxscore: null,
    _best: null,

    ctor:function () {
        this._super();
        this.init();
    },

    init:function () {
        winSize = cc.director.getWinSize();

        this.initBackGround();
        var self = this;
        cc.loader.loadJson('src/config/config.json', function(err, data){
            if( err){
                console.error('Error loading JSON', err);
            }
            self._maxscore = data["HighScore"]
            console.log(data["HighScore"])

        })
        // Title
        this._title = new cc.LabelTTF("Fifty bird ", "res/fonts/font.ttf", MW.FONTSIZE1);
        this._title.x = MW.WIDTH/2;
        this._title.y = MW.HEIGHT/2 + MW.FONTSIZE1;
        this._title.color = cc.color(MW.FONTCOLOR);
        this.addChild(this._title, 10);

        // Best
        this._best = new cc.LabelTTF("Best: ", "res/fonts/font.ttf", MW.FONTSIZE2);
        this._best.x = MW.WIDTH/2;
        this._best.y = MW.HEIGHT/2 - 70;
        this._best.color = cc.color(MW.FONTCOLOR);
        this.addChild(this._best, 10);


        // Play
        cc.MenuItemFont.setFontSize(MW.FONTSIZE2);
        cc.MenuItemFont.setFontName(res.flappy_ttf);
        var systemMenu = new cc.MenuItemFont("Press Enter", this.onNewGame);
        systemMenu.setColor(cc.color(MW.FONTCOLOR));
        var menu = new cc.Menu(systemMenu);
        menu.x = 0;
        menu.y = 0;
        systemMenu.attr({
            x: winSize.width/2,
            y: winSize.height/2 - 125,
        });
        this.addChild(menu, 1, 2);

        this.addKeyboardListener();


        // schedule
        this.scheduleUpdate();

        if( MW.SOUND ){
            cc.audioEngine.setMusicVolume(0.7);
            cc.audioEngine.playMusic(res.marios_way_mp3, true);
        }
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

    onNewGame:function () {
        console.log("To countdownScreen");
        //load resources
        cc.LoaderScene.preload(g_playScreen, function () {
            // cc.audioEngine.stopMusic();
            // cc.audioEngine.stopAllEffects();
            cc.director.runScene(new CountdownState());
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
    update:function () {
        if ( MW.KEYS[cc.KEY.enter] ) {
            MW.KEYS[cc.KEY.enter] = false;
            this.onNewGame();
        }
        this._best.setString("Best: " + this._maxscore)

        var data = {
            "HighScore": 10
        }
        var jsonData = JSON.stringify(data);

        var filePath = "src/config/config.json";

        cc.writeStringToFile()
        if ((jsonData, filePath)) {
            cc.log("Ghi tệp JSON thành công!");
        } else {
            cc.log("Lỗi khi ghi tệp JSON.");
        }

    },
});

TitleScreenState.scene = function () {
    var scene = new cc.Scene();
    var layer = new TitleScreenState();
    scene.addChild(layer);
    return scene;
};
