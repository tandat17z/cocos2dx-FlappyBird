var Pipe = cc.Sprite.extend({
    ctor:function (){
        this._super(res.pipe_png);
    },
    update:function(dt){

    },
    destroy:function () {

    },
    collideRect:function (x, y) {
        var w = this.width, h = this.height;
        return cc.rect(x - w / 2, y - h / 2, w, h / 2);
    }
})