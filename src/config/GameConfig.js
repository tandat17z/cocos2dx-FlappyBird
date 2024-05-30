

var MW = MW || {};

MW.SOUND = true;
MW.btnHEIGHT = 36
MW.btnWIDTH = 123

MW.FONTCOLOR = "#ffffff";
MW.FONTSIZE1 = 75;
MW.FONTSIZE2 = 50

//game state
MW.GAME_STATE = {
    HOME:0,
    COUNTDOWN: 1,
    PLAY:2,
    OVER:3
};

MW.STATE = null;

//keys
MW.KEYS = [];

//level
MW.LEVEL = {
    STAGE1:1,
    STAGE2:2,
    STAGE3:3
};

//score
MW.SCORE = 0;

//sound
MW.SOUND = true;

MW.WIDTH = 1152;
MW.HEIGHT = 576;

MW.BG_WIDTH = 1152;
MW.BG_SCALE = 2;
MW.PIPE_SCALE = 1.5;
MW.BIRD_SCALE = 1.5;
MW.BIRD_POWERSCALE = 3;
MW.BIRD_S1 = 5;
MW.BIRD_S2 = 2;
MW.BIRD_COUNTDOWN_S = 10;
MW.COUNTDOWN = 3

MW.SPEED = 150
MW.X_BIRD = 200
MW.GRAVITY = 1250;

MW.CONTAINER = {
    PIPES: []
}


Arg_preset = [
    {
        x: 1000,
        y: 100,
        width: 400
    }
]