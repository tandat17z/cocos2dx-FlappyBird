var Pipe = cc.Sprite.extend({
    ctor:function (arg, flippedY){
        this._super(res.pipe_png);

        this.scale = MW.PIPE_SCALE;
        this.x = arg.x;
        this.flippedY = flippedY;
        this.anchorX = 0;
        this.anchorY = 0;

        if( flippedY ){
            this.y = arg.y + arg.width;
        }
        else{
            this.y = arg.y - this.height*this.scale;
        }

        this.scheduleUpdate();
    },
    update:function(dt){

    },
    destroy:function () {

    },
    collideRect:function () {
        var w = this.width, h = this.height;
        return cc.rect(this.x , this.y, w, h);
    }
});

Pipe.create = function(arg, flippedY){
    var pipe = new Pipe(arg, flippedY);
    MW.CONTAINER.PIPES.push(pipe);
    return pipe;
};

Pipe.preSet = function(){
    console.log("add pipe");
    var pipe1 = null, pipe2 = null;
    for(var i = 0; i < Arg_preset.length; i++){
        pipe1 = Pipe.create(Arg_preset[i], false);
        pipe2 = Pipe.create(Arg_preset[i], true);

        g_playState.addChild(pipe1, 5, 1);
        g_playState.addChild(pipe2, 5, 1);
    }
}