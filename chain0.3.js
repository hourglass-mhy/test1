/**
 * Created by Administrator on 2017/2/11.
 */

/*对象:整个图
 * 属性
 * 方法:绘制大圆  绘制小圆  绘制小圆上的文字
 * */

//基本结构
//绘制多个小圆
//设置小圆的颜色

/**
 * @param opts   {
     *               bigX:bigX,
                     bigY:bigY,
                     bigRadius:bigRadius
                     smallRadius: smallRadius,
                     num:num
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
        ctx.arc(bigX, bigY, bigRadius, 0, 2 * Math.PI);
        ctx.stroke();
    },
    //绘制单个小圆  必须知道每个小圆的起始弧度
    /**
     * @param startRadian  每一个小圆的起始弧度
     * @param color         每个小圆的颜色
     */
    drawSmallCircle: function (startRadian, color) {
        //计算小圆在大圆上的位置
        var b = this.bigRadius * Math.cos(startRadian);
        var h = this.bigRadius * Math.sin(startRadian);
        //绘制小圆
        ctx.save(); //在改变状态之前保存状态

        ctx.beginPath();
        ctx.arc(this.bigX + b, this.bigY + h, this.smallRadius, 0, 2 * Math.PI);
        ctx.fillStyle = color;
        ctx.fill();

        ctx.restore();
    },
    //绘制多个小圆  根据num的个数绘制
    drawSmallCircles: function () {
        //第一个小圆的起始弧度
        var startRadian = this.startRadian;
        //均分的弧度
        var singleRadian = 2 * Math.PI / this.num;

        //颜色数组
        var colors = (function () {
            return ( "aliceblue,antiquewhite,aqua,aquamarine,azure,beige,bisque,black,blanchedalmond,blue," +
            "blueviolet,brown,burlywood,cadetblue,chartreuse,chocolate,coral,cornflowerblue,cornsilk," +
            "crimson,cyan,darkblue,darkcyan,darkgoldenrod,darkgray,darkgreen,darkgrey,darkkhaki,darkmagenta," +
            "darkolivegreen,darkorange,darkorchid,darkred,darksalmon,darkseagreen,darkslateblue,darkslategray," +
            "darkslategrey,darkturquoise,darkviolet,deeppink,deepskyblue,dimgray,dimgrey,dodgerblue,firebrick," +
            "floralwhite,forestgreen,fuchsia,gainsboro,ghostwhite,gold,goldenrod,gray,green,greenyellow,grey," +
            "honeydew,hotpink,indianred,indigo,ivory,khaki,lavender,lavenderblush,lawngreen,lemonchiffon," +
            "lightblue,lightcoral,lightcyan,lightgoldenrodyellow,lightgray,lightgreen,lightgrey,lightpink," +
            "lightsalmon,lightseagreen,lightskyblue,lightslategray,lightslategrey,lightsteelblue,lightyellow," +
            "lime,limegreen,linen,magenta,maroon,mediumaquamarine,mediumblue,mediumorchid,mediumpurple," +
            "mediumseagreen,mediumslateblue,mediumspringgreen,mediumturquoise,mediumvioletred,midnightblue," +
            "mintcream,mistyrose,moccasin,navajowhite,navy,oldlace,olive,olivedrab,orange,orangered,orchid," +
            "palegoldenrod,palegreen,paleturquoise,palevioletred,papayawhip,peachpuff,peru,pink,plum,powderblue," +
            "purple,rebeccapurple,red,rosybrown,royalblue,saddlebrown,salmon,sandybrown,seagreen,seashell,sienna," +
            "silver,skyblue,slateblue,slategray,slategrey,snow,springgreen,steelblue,tan,teal,thistle,transparent," +
            "tomato,turquoise,violet,wheat,white,whitesmoke,yellow,yellowgreen" ).split(',');
        })();

        //绘制多个小圆
        for (var i = 0; i < this.num; i++) {
            this.drawSmallCircle(startRadian + i * singleRadian, colors[i + 10]);
        }
    }

}