var g_gameController = null

var GameController = cc.Layer.extend({
    _lblScore: 0,
    _pause: null,
    _pauseitem: null,
    ctor: function(){
        this._super();
        this.init();
    },
    init: function(){
        g_gameController = this;
        // Score
        this._lblScore = new cc.LabelTTF("Score: " + MW.SCORE, "Arial", 50);
        this._lblScore.attr({
            anchorX: 0,
            anchorY: 1,
            x: 0,
            y: winSize.height
        })
        this._lblScore.textAlign = cc.TEXT_ALIGNMENT_LEFT;
        this.addChild(this._lblScore, 1000);

        // Skill 1
        this._lblSkill1 = new cc.LabelTTF("skill 1: " + MW.SCORE, "Arial", 25);
        this._lblSkill1.attr({
            anchorX: 0,
            anchorY: 1,
            x: 0,
            y: winSize.height - 75
        })
        this._lblSkill1.textAlign = cc.TEXT_ALIGNMENT_LEFT;
        this.addChild(this._lblSkill1, 1000);

        // Skill 2
        this._lblSkill2 = new cc.LabelTTF("skill 2: " + MW.SCORE, "Arial", 25);
        this._lblSkill2.attr({
            anchorX: 0,
            anchorY: 1,
            x: 0,
            y: winSize.height - 125
        })
        this._lblSkill2.textAlign = cc.TEXT_ALIGNMENT_LEFT;
        this.addChild(this._lblSkill2, 1000);

        //Pause
        cc.MenuItemFont.setFontSize(MW.FONTSIZE2);
        cc.MenuItemFont.setFontName(res.flappy_ttf);
        this._pauseitem = new cc.MenuItemFont("Pause", this.pause);
        this._pauseitem.setColor(cc.color(MW.FONTCOLOR));

        this._pause = new cc.Menu(this._pauseitem);
        this._pause.x = 0;
        this._pause.y = 0;
        this._pauseitem.attr({
            x: winSize.width - 100,
            y: winSize.height - 100,
        });
        this.addChild(this._pause, 1, 2);

        this.scheduleUpdate();
    },
    update: function(){
        MW.BEST_SCORE = Math.max(MW.BEST_SCORE, MW.SCORE);
        this._lblScore.setString("Score: " + MW.SCORE);
        this._lblSkill1.setString("Skill1: " + Math.round(g_playState._bird._timeS1) + " / " + Math.round(g_playState._bird._cdtimeS1));
        this._lblSkill2.setString("Skill2: " + Math.round(g_playState._bird._timeS2) + " / " + Math.round(g_playState._bird._cdtimeS2));

        if(g_playState._state == STATE_GAMEOVER){
            g_gameController._pauseitem.x = winSize.width/2;
            g_gameController._pauseitem.y = winSize.height/2;

            g_gameController._pauseitem.setString("Game Over");
        }
    },
    pause: function(){
        if( g_playState._state == STATE_PAUSE ) {
            g_playState._state = STATE_PLAYING;
            g_gameController._pauseitem.x = winSize.width - 100;
            g_gameController._pauseitem.y = winSize.height - 100;

            g_gameController._pauseitem.setString("Pause");
        }
        else if(g_playState._state == STATE_PLAYING) {
            g_playState._state = STATE_PAUSE;
            g_gameController._pauseitem.x = winSize.width/2;
            g_gameController._pauseitem.y = winSize.height/2;

            g_gameController._pauseitem.setString("Resume");
        }
        else if( g_playState._state == STATE_GAMEOVER){
            console.log("pause")
            g_playState.onGameOver();
        }
    }
})