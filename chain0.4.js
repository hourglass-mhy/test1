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
//绘制小圆上的文字  不传递num,由用户输入的数据决定

/**
 * @param opts   {
     *               bigX:bigX,
                     bigY:bigY,
                     bigRadius:bigRadius
                     smallRadius: smallRadius,
                     data: "前端,java,php,c++,android,ios,电子商务,UI,Python".split(",")
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
        ctx.save();

        ctx.beginPath();
        ctx.arc(bigX, bigY, bigRadius, 0, 2 * Math.PI);
        ctx.strokeStyle = "red"
        ctx.stroke();

        ctx.restore();
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
        //小圆的圆心
        this.smallX = this.bigX + b;
        this.smallY = this.bigY + h;

        //绘制小圆
        ctx.save(); //在改变状态之前保存状态

        ctx.beginPath();
        ctx.arc(this.smallX, this.smallY, this.smallRadius, 0, 2 * Math.PI);
        ctx.fillStyle = color;
        ctx.fill();

        ctx.restore();
    },
    //绘制多个小圆  根据num的个数绘制
    drawSmallCircles: function () {
        //第一个小圆的起始弧度
        var startRadian = this.startRadian;
        //均分的弧度
        var singleRadian = 2 * Math.PI / this.data.length;

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
        for (var i = 0; i < this.data.length; i++) {
            //绘制小圆
            this.drawSmallCircle(startRadian + i * singleRadian, colors[i + 10]);
            //同时绘制文字
            this.drawText(this.data[i]);
        }
    },
    //绘制文字
    drawText: function (text) {
        //绘制文字
        ctx.save();

        ctx.beginPath();
        ctx.font = "20px Alial";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(text, this.smallX, this.smallY);

        ctx.restore();
    }
}