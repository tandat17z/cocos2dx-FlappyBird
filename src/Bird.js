

var Bird = cc.Sprite.extend({
    speed:220,
    ctor:function () {
        this._super(res.bird_png);
        this.scheduleUpdate();
    },
    update:function (dt) {
        this.updateMove(dt);

    },
    updateMove:function(dt)
    {
        if ((MW.KEYS[cc.KEY.w] || MW.KEYS[cc.KEY.up]) && this.y <= winSize.height) {
            this.y += dt * this.speed;
        }
        if ((MW.KEYS[cc.KEY.s] || MW.KEYS[cc.KEY.down]) && this.y >= 0) {
            this.y -= dt * this.speed;
        }
        if ((MW.KEYS[cc.KEY.a] || MW.KEYS[cc.KEY.left]) && this.x >= 0) {
            this.x -= dt * this.speed;
        }
        if ((MW.KEYS[cc.KEY.d] || MW.KEYS[cc.KEY.right]) && this.x <= winSize.width) {
            this.x += dt * this.speed;
        }
    },
    destroy:function () {

    },
    collideRect:function (x, y) {
        var w = this.width, h = this.height;
        return cc.rect(x - w / 2, y - h / 2, w, h / 2);
    }
});
