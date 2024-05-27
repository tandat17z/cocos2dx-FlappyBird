var Background = cc.Sprite.extend({
    ctor:function(x, y){
        this._super(res.background_png);
        this.scale = MW.BG_SCALE;
        this.anchorX = 0;
        this.anchorY = 0;
        this.x = x;
        this.y = y;
    },
    destroy:function(){

    }
});
