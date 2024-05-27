var Ground = cc.Sprite.extend({
    ctor:function(x, y){
        this._super(res.ground_png);
        this.scale = MW.BG_SCALE;
        this.anchorX = 0;
        this.anchorY = 0;
        this.x = x;
        this.y = y;
    },
    destroy:function(){

    },
    collideRect:function(){
        var w = this.width, h = this.height;
        return cc.rect(this.x , this.y, w, h);
    }
});
