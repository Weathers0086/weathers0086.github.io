/**
 * 绘制一个ul的走势曲线
 * @obj  <Object>  包含要绘制的元素的clas、需要的线条的颜色color
 * */
function createLine(obj){
  if(!obj.clas) return;
  var frag=$("<div></div>");

  var $elem=$("."+obj.clas);
  //console.log($elem);

  var ballWidth=parseFloat($elem.css("width"))+1;//宽+边框;
  var ballHeight=parseFloat($elem.css("height"))+1;//高+边框

  for(var i=1,lineWidth=0,cvsL=null;i<$elem.length;i++){
    var ballTop=$($elem[i]).offset().top; // 元素相对于窗口的偏移
    var ballLeft=$($elem[i]).offset().left;

    var diffLeft=(parseFloat($($elem[i]).offset().left)-parseFloat($($elem[i-1]).offset().left));   //每个元素的间隔距离
    var cvsYStart=0,cvsYEnd=0;
    if(diffLeft>0){
      lineWidth=diffLeft;
      cvsL=-(diffLeft-ballWidth/2);//canvas向左偏移的距离

      /* 修改Y轴起点、终点 */
      cvsYStart=ballHeight/5;
      cvsYEnd=ballHeight;      //canvasY轴的终点
    }else if(diffLeft<0){
      lineWidth=-diffLeft;
      cvsL=ballWidth/2;
      /* 修改Y轴起点、终点 */
      //cvsYStart=ballHeight;
      cvsYStart=ballHeight*4/5;
      cvsYEnd=ballHeight/5;

    }else if(diffLeft==0){
      lineWidth=2;          //竖直时的线宽
      cvsL=ballWidth/2;
      cvsYEnd=ballHeight;
    }

    var $cvs=$("<canvas width='"+lineWidth+"'height='"+ballHeight+"'></canvas>");
    $cvs.css({
      position:"absolute",
      top:-ballHeight/2+ballTop,    //向上偏移半个格子
      left:cvsL+ballLeft
    });
    var ctx=$cvs[0].getContext("2d");

    if(diffLeft==0){   //竖直时的画法
      ctx.fillStyle = obj.color;
      //ctx.fillRect(0,0,lineWidth,ballHeight);
      ctx.fillRect(0,ballHeight/4,lineWidth,ballHeight/2);
    }else{            //非竖直时的画法
      ctx.lineWidth=2;                //线宽
      ctx.strokeStyle=obj.color;

      //给圆留些位置，不直接接触
      //ctx.lineTo(0,cvsYStart); /* 修改cvsYStart、cvsYEnd的位置 */
      ctx.lineTo(ballWidth/5,cvsYStart);
      //ctx.lineTo(lineWidth,cvsYEnd);
      ctx.lineTo(lineWidth-ballWidth/5,cvsYEnd);
      ctx.stroke();
    }
    frag.append($cvs);
  }
  $("body").append(frag);
}
