

var Bird = cc.Sprite.extend({
    speed:MW.SPEED,
    cur_v: null,
    _start: false,
    _rect: null,
    ctor:function () {
        this._super(res.bird_png);
        this.scale = MW.BIRD_SCALE;

        var w = this.width, h = this.height;
        this._rectNode = new cc.DrawNode();
        var rectPoints = [
            cc.p(0, 0),
            cc.p(w, h)
        ]
        console.log(rectPoints)
        this._rectNode.drawRect(rectPoints[0], rectPoints[1], null, 1, cc.color(255, 0, 0, 255));
        this.addChild(this._rectNode);
        this.scheduleUpdate();
    },
    update:function (dt) {
        if( this._start ) this.updateMove(dt);

        if ( MW.KEYS[cc.KEY.space]  ){
            this.cur_v = 600;
            this._start = true;
        }
    },
    updateMove:function(dt)
    {
        if(this.cur_v > 0){
            this.setRotation(-45);
        }
        else if(this.cur_v <= 0){
            this.setRotation(45);
        }
        this.x += dt*this.speed;
        this.cur_v -= MW.GRAVITY*dt;
        this.y += this.cur_v*dt;

        // this.speed = 1000;
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
        var w = this.width*this.scale, h = this.height*this.scale;
        return cc.rect(this.x - w/2, this.y-h/2, w, h);
    },
    checkInBox:function(x, y){
        console.log("cas")
        var w = this.width*this.scale, h = this.height*this.scale;
        var matP = [ [1/(w*Math.sqrt(2)), 1/(w*Math.sqrt(2))],
                    [-1/(h*Math.sqrt(2)), 1/(h*Math.sqrt(2))] ]

        var coor = math.multiply(matP, [x, y]);

        // check in box
        if( coor[0] <= w && coor[0] >= 0
            && coor[1] <= h && coor[1] >= 0 ) return true;

        return false;
    }
});
