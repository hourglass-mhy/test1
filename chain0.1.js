/**
 * Created by Administrator on 2017/2/11.
 */

/*对象:整个图
 * 属性
 * 方法:绘制大圆  绘制小圆  绘制小圆上的文字
 * */

//基本结构
/**
 * @param opts   {
     *               bigX:bigX,
                     bigY:bigY,
                     bigRadius:bigRadius
                 }
 * @constructor
 */

function DrawChain(opts) {
    //将opts中的属性快速拷贝到this中
    for (var key in opts) {
        this[key] = opts[key]
    }

    //绘图
    this.init();

}
//替换原型实现继承
DrawChain.prototype = {
    constustor: DrawChain,

    //入口函数
    init: function () {
        this.drawBigCircle();

        this.drawSmallCircles();
    },
    //绘制大圆
    drawBigCircle: function () {
        //开启新路径
        ctx.beginPath();
        ctx.arc(bigX,bigY,bigRadius,0,2*Math.PI);
        ctx.stroke();
    },
    //绘制单个小圆
    drawSmallCircle: function () {
        //计算小圆在大圆上的位置
        var radian=Math.PI/3;

        var b=this.bigRadius*Math.cos(radian);
        var h=this.bigRadius*Math.sin(radian);
        //绘制小圆
        ctx.save(); //在改变状态之前保存状态

        ctx.beginPath();
        ctx.arc(this.bigX+b,this.bigY+h,this.smallRadius,0,2*Math.PI);
        ctx.fillStyle="red"
        ctx.fill();

        ctx.restore();
    },
    //绘制多个大圆
    drawSmallCircles:function () {

    }

}