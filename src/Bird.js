

var Bird = cc.Sprite.extend({
    speed:MW.SPEED,
    cur_v: null,
    _start: false,
    _rect: null,
    _skill: 0,
    _timeS1: 0,
    _timeS2: 0,
    _cdtimeS1: 0,
    _cdtimeS2: 0,
    ctor:function () {
        this._super(res.bird_png);
        this.init();
    },
    init:function(){
        this.scale = MW.BIRD_SCALE;
        this.anchorX = 1;
        this.anchorY = 0.5;
        this._cdtimeS1 = 0;
        this._cdtimeS2 = 0;
        this.scheduleUpdate();
    },
    update:function (dt) {
        // count down skill
        this._cdtimeS1 -= dt;
        this._cdtimeS2 -= dt;
        if( this._cdtimeS1 < 0){
            this._cdtimeS1 = 0;
        }
        if( this._cdtimeS2 < 0){
            this._cdtimeS2 = 0;
        }

        // time skill
        this._timeS1 -= dt;
        this._timeS2 -= dt;
        if( this._timeS1 < 0 ){
            this.scale = MW.BIRD_SCALE;
            this._timeS1 = 0;
        }

        if( this._timeS2 < 0 ){
            this.speed = MW.SPEED;
            this._timeS2 = 0;
        }
        if( this._timeS1 == 0 &&  this._timeS2 == 0 ) this._skill = 0;


        if ( MW.KEYS[cc.KEY.space]  ){
            this.cur_v = MW.SPEED*2;
            this._start = true;
        }

        if( this._start && g_playState._state == STATE_PLAYING) this.updateMove(dt);

        // set rotation
        var angle = Math.atan(this.cur_v/(this.speed))/Math.PI*180;
        // if(angle > 45) angle = 45;
        this.setRotation(-angle);

        //--------------------------------------------------
        if ( MW.KEYS[cc.KEY.q] && this._cdtimeS1 == 0 ){
            this._cdtimeS1 = MW.BIRD_COUNTDOWN_S;
            this._timeS1 = MW.BIRD_S1;
            this._skill = 1;
            this.scale = MW.BIRD_POWERSCALE;
        }
        else if( MW.KEYS[cc.KEY.w]  && this._cdtimeS2 == 0 ){
            this._cdtimeS2 = MW.BIRD_COUNTDOWN_S;
            this._timeS2 = MW.BIRD_S2;
            this.speed = MW.SPEED*3;
            this._skill = 2;
        }

        //
        // if ((MW.KEYS[cc.KEY.w] || MW.KEYS[cc.KEY.up]) && this.y <= winSize.height) {
        //     this.y += dt * this.speed;
        // }
        // if ((MW.KEYS[cc.KEY.s] || MW.KEYS[cc.KEY.down]) && this.y >= 0) {
        //     this.y -= dt * this.speed;
        // }
        // if ((MW.KEYS[cc.KEY.a] || MW.KEYS[cc.KEY.left]) && this.x - MW.X_BIRD >= 0) {
        //     this.x -= dt * this.speed*5;
        // }
        // if ((MW.KEYS[cc.KEY.d] || MW.KEYS[cc.KEY.right])) {
        //     this.x += dt * this.speed;
        // }
    },

    updateMove:function(dt)
    {
        this.x += dt*this.speed;
        this.cur_v -= MW.GRAVITY*dt;
        this.y += this.cur_v*dt;
    },

    destroy:function () {

    },

    collideRect:function () {
        var w = this.width*this.scale, h = this.height*this.scale;
        return cc.rect(this.x - w/2, this.y-h/2, w, h);
    },

    checkInBird:function(x, y){
        var points = this.getPoints();
        var chk1 = ((points[0].y - points[1].y)*(x - points[0].x) + (points[0].x - points[1].x)*(y - points[0].y) ) * ((points[2].y - points[3].y)*(x - points[2].x) + (points[2].x - points[3].x)*(y - points[2].y) ) <= 0;
        var chk2 = ((points[0].y - points[3].y)*(x - points[0].x) + (points[0].x - points[3].x)*(y - points[0].y) ) * ((points[1].y - points[2].y)*(x - points[1].x) + (points[1].x - points[2].x)*(y - points[1].y) ) <= 0;

        return (chk1 && chk2);
    },

    getPoints: function(){
        var w = this.width * this.scale, h = this.height * this.scale;
        var r = Math.PI*(-this.rotation/180);
        var x = this.x - w, y = this.y - h/2;
        var p1 = cc.p(x, y),
            p2 = cc.p(x + w*Math.cos(r), y + w*Math.sin(r) ),
            p4 = cc.p(x - h*Math.sin(r), y +  h*Math.cos(r) );
        var p3 = cc.p(p2.x + p4.x - p1.x, p2.y + p4.y - p1.y);
        return [p1, p2, p3, p4];
    }
});
