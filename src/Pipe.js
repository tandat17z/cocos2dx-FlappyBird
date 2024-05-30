var Pipe = cc.Sprite.extend({
    _rectNode: null,
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

        var w = this.width, h = this.height;
        this._rectNode = new cc.DrawNode();
        var rectPoints = [
            cc.p(0, 0),
            cc.p(0 + w, 0 + h)
        ]
        this._rectNode.drawRect(rectPoints[0], rectPoints[1], null, 1, cc.color(255, 0, 0, 255));
        this.addChild(this._rectNode);

        this.scheduleUpdate();
    },
    setArg:function(arg){
        this.x = arg.x;

        if( this.flippedY ){
            this.y = arg.y + arg.width;
        }
        else{
            this.y = arg.y - this.height*this.scale;
        }
    },
    update:function(dt){
    },
    destroy:function () {

    },
    collideRect:function () {
        var w = this.width*this.scale, h = this.height*this.scale;
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
    // var pipe1 = null, pipe2 = null;
    // for(var i = 0; i < Arg_preset.length; i++){
    //     pipe1 = Pipe.create(Arg_preset[i], false);
    //     pipe2 = Pipe.create(Arg_preset[i], true);
    //
    //     g_playState.addChild(pipe1, 5, 1);
    //     g_playState.addChild(pipe2, 5, 1);
    // }
    var y_rand = Math.random()*300 + 75;
    var w_rand = Math.random()*100 + 150;
    var arg = {
        x: 1000,
        y: y_rand,
        width: w_rand
    };
    var pipe1 = Pipe.create(arg, false);
    var pipe2 = Pipe.create(arg, true);

    g_playState.addChild(pipe1, 5, 1);
    g_playState.addChild(pipe2, 5, 1);

    for( let i = 0; i<10; ++i){
        console.log("add pipe" );
        var pipe = MW.CONTAINER.PIPES[MW.CONTAINER.PIPES.length - 1];
        var rand = Math.random()*300 + 200;
        var y_rand = Math.random()*300 + 75;
        var w_rand = Math.random()*100 + 150;
        var arg = {
            x: pipe.x + rand,
            y: y_rand,
            width: w_rand
        };
        pipe1 = Pipe.create(arg, false);
        pipe2 = Pipe.create(arg, true);

        g_playState.addChild(pipe1, 5, 1);
        g_playState.addChild(pipe2, 5, 1);
    }
}