

var MW = MW || {};

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

MW.BG_SCALE = 2;
MW.FONTCOLOR = "#ffffff";
MW.FONTSIZE1 = 75;
MW.FONTSIZE2 = 50

MW.COUNTDOWN = 5

MW.CONTAINER = {
    PIPES: []
}