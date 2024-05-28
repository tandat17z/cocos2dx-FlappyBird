

var Bird = cc.Sprite.extend({
    speed:MW.SPEED,
    cur_v: null,
    _start: false,
    ctor:function () {
        this._super(res.bird_png);
        this.scale = MW.BIRD_SCALE;
        this.scheduleUpdate();
    },
    update:function (dt) {
        this.updateMove(dt);

    },
    updateMove:function(dt)
    {
        if(this.cur_v > 0){
            this.setRotation(-45);
        }
        else if(this.cur_v <= 0){
            this.setRotation(45);
        }
        if( this._start ){
            this.x += dt*this.speed;
            this.cur_v -= MW.GRAVITY*dt;
            this.y += this.cur_v*dt;
        }
        if ( MW.KEYS[cc.KEY.space]  ){
            this.cur_v = 600;
            this._start = true;
        }

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
    destroy:function () {

    },
    collideRect:function () {
        var w = this.width, h = this.height;
        return cc.rect(this.x - w / 2, this.y - h / 2, w, h);
    }
});
