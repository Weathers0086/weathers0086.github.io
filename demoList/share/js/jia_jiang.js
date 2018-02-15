var FAtype=1;   // 全局变量，方案类型，FIXME:只有点击生成方案才会更改此值
var payArr=null;// 全局变量，存储方案信息，FIXME:只有changeDom才会调用

var oneMoney    = null,        // 一期中一注的奖金
  getMoneyArr = new Array(),   // 最低和最高获得奖金，getMoneyArr[0]最低奖金，getMoneyArr[1]最高奖金
  oneTouMoney = null;          // 每个订单需要支付的金额
var oneTouCount = null;        // 每个订单投的注数
var data=null;                 // 投注号码信息

$("body").keyup(function(e){
  var $target= $(e.target);
  if($target.is("input[type=tel]")){
    if(keyUp($target)){   // 输入成功
      if($target.closest(".main").length>0){    // 是.main中的input
        var index=$(".main input").index($target);// 记录下输入的是.main中的第几个input
        changeDom(true,nowIssue);
        if(index!=-1){
          var $that_input=$($(".main input").get(index));
          var val=$that_input.val(); // 保存输入框的值
          if(val<1) val=1;
          $that_input.val("").focus().val(val); // 清空,聚焦于此输入框，再赋值，使光标位于文字右侧
        }
      }
    }
  }
});

$("section,.mask").on("click",function(e){
  var $target = $(e.target);
  if($target.is(".icon-less")){       // 减
    if(lessValue($target)){   // 成功减一
      if($target.closest(".main").length>0){
        changePayMoney();
        changeDom(true,nowIssue);
      }
    }
  }else if($target.is(".icon-add")){  // 加

    if(addValue($target)){    // 成功加一
      if($target.closest(".main").length>0){
        changePayMoney();
        changeDom(true,nowIssue);
      }
    }
  }
});

/*
 * 传入：
 * @qi   <Element>  要追的总期数
 * @bei  <Element>  开始的倍数
 * @yingli <Element>  预期最低盈利
 * @isYuan <Element>  是不是确定的**元，若为true，则是**元，反之为百分比
 * @yingliObj <Object>  此时@yingli为false
 *   yingliObj.start= [几期，百分比]：前几期盈利百分比
 *   yingliObj.next = 百分比：       之后的盈利百分比
 * */
var createInfo = function(qi,bei,yingli,isYuan,yingliObj){//'智造'方案信息
  var pay = new Array();  // 所有的投注信息，里面是对象
  var beiSum=bei,     // 投入的总倍数，初始值为bei，没算一期，加上当前期的倍数
    getOneMoney = getMoneyArr[0],  // 当期一倍中奖最低获得的金额
    payOneMoney = oneTouMoney;     // 投一倍需要付的金额

  if(isYuan){  // 如果盈利是**元
    for(var i=0;i<qi;i++){
      pay[i] = new Object();    // 当前的投注信息
      if(i!=0){
        bei=Math.ceil(parseInt(beiSum*payOneMoney+yingli)/(getOneMoney-payOneMoney));
        beiSum+=bei;
      }else {
        bei=Math.ceil(yingli/(getOneMoney-payOneMoney));  // 金额不足反复加
        beiSum=bei;
      }
      pay[i].bei = bei;    // 当期倍数
      pay[i].beiSum=beiSum;// 加上当期倍数的总倍数
      pay[i].payMoney = beiSum*payOneMoney; // 累计投入金额
      pay[i].getMoney = Math.round(bei*getOneMoney-pay[i].payMoney);   // 中奖盈利
      pay[i].lilv = Math.round(100*pay[i].getMoney/pay[i].payMoney); // 盈利率，百分比的格式，中奖盈利pay[i].getMoney/累计投入金额pay[i].payMoney
    }
  }else if(yingli){   // 当前几期盈利与之后的盈利相同时，且预期最低盈利是百分比时

    for(var i=0;i<qi;i++){
      pay[i] = new Object();    // 当前的投注信息
//        console.log(bei);
      if(i!=0){           //分析：第一期若达不到要求，以后都达不到要求单独算
        bei=Math.ceil(((yingli+100)*payOneMoney*beiSum )/(100*getOneMoney-(payOneMoney*(100+yingli))));
        beiSum+=bei;
      }else if(yingli>parseInt(100*(getOneMoney - payOneMoney)/payOneMoney)){       // 计算第一期是否能够符合预期
        bubblePrompt("实际最低盈利低于预期盈利，请重新填写");
        return false;
      }
//        console.log(bei);
      pay[i].bei = bei;    // 当期倍数
      pay[i].beiSum=beiSum;// 加上当期倍数的总倍数
      pay[i].payMoney = beiSum*payOneMoney; // 累计投入金额
      pay[i].getMoney = Math.round(bei*getOneMoney-pay[i].payMoney);        // 中奖盈利
      pay[i].lilv = Math.round(100*pay[i].getMoney/pay[i].payMoney); // 盈利率，百分比的格式，中奖盈利pay[i].getMoney/累计投入金额pay[i].payMoney
    }
  }else if(yingliObj && !yingli){ // 当前几期盈利与之后的盈利不同时，只会是百分比
    for(var i=0;i<qi;i++){
      pay[i] = new Object();    // 当前的投注信息

      if(i<yingliObj.start[0]){    // 如果期号是前几期

        if(i!=0){
          bei=Math.ceil(((yingliObj.start[1]+100)*payOneMoney*beiSum )/(100*getOneMoney-(payOneMoney*(100+yingliObj.start[1]))));
          beiSum+=bei;
        }else if(yingliObj.start[1]>parseInt(100*(getOneMoney - payOneMoney)/payOneMoney)){
          bubblePrompt("实际最低盈利低于预期盈利，请重新填写");
          return false;
        }
      }else{         // 如果是后面的那些期
        if(i==yingliObj.start[0] && yingliObj.next>parseInt(100*(getOneMoney - payOneMoney)/payOneMoney)){// 当为后面的那些期的第一期时
          bubblePrompt("实际最低盈利低于预期盈利，请重新填写");
          return false;
        }
        bei=Math.ceil(((yingliObj.next+100)*payOneMoney*beiSum )/(100*getOneMoney-(payOneMoney*(100+yingliObj.next))));
        beiSum+=bei;
      }
      pay[i].bei = bei;    // 当期倍数
      pay[i].beiSum=beiSum;// 加上当期倍数的总倍数
      pay[i].payMoney = beiSum*payOneMoney; // 累计投入金额
      pay[i].getMoney = Math.round(bei*getOneMoney-pay[i].payMoney);        // 中奖盈利
      pay[i].lilv = Math.round(100*pay[i].getMoney/pay[i].payMoney); // 盈利率，百分比的格式，中奖盈利pay[i].getMoney/累计投入金额pay[i].payMoney
    }
  }else{    // 都不是的话，报错，回到上一页
    location.href="./select.html";
  }
  if(isNaN(pay[i-1].payMoney) || isNaN(pay[i-1].lilv) || pay[0].payMoney<0){
    bubblePrompt("实际最低盈利低于预期盈利，请重新填写");
    return false;
  }

  return pay;
};

var formatIssue=function(issue, max){  // 格式化期号，issue：当前期号，max，最大期号
  var result=issue%Number(max) || max;
  return result>9 ? result : '0'+result;
}

/*
 * 点击加、减时，重新生成DOM
 * @isAddorLess   是否是加、减，是传入true，修改方案传入false
 * 要追的总期数、开始的倍数从 '方案' 获取
 * true直接从DOM中获取当前倍数计算盈利、false从 '方案' 获取应得倍数计算盈利
 * 生成方案结构：
 * 0:{bei: 1, payMoney: 8, getMoney: 11, lilv: 137}
 1:{bei: 2, payMoney: 24, getMoney: 14, lilv: 58}
 2:{bei: 6, payMoney: 72, getMoney: 42, lilv: 58}
 *
 * @issue：下一期期号
 * */
// @fanganInfo：方案信息，createInfo()函数使用  TODO:未用到，可去掉
var changeDom=function(isAddorLess,issue){//改变生成方案时的DOM元素
  if(isAddorLess){    // 是加、减、输入
    getInfo();  // 修正payArr中的新旧倍数
  }else{    // 调用fanganType函数，直接修改方案
    payArr=fanganType();
  }
  var liList = "";
  if(!payArr){       // 不符合预期或计算错误，直接退出
    return;
  }
  if(typeof payArr[0].getMoney === "number" || typeof payArr[0].getMoney === "string"){// 中奖盈利只有一个值，是number类型
    for(var i=0;i<payArr.length;i++){
      liList+='<li class="list-item">'+
      '<span class="num">'+(i+1)+'</span>'+
      '<span class="issue">'+formatIssue(i+Number(issue),maxIssue)+'</span>'+  // 期号
      '<span class="item-bei"><i class="icon-less"></i>'+
      '<input type="tel" class="bei" value="'+payArr[i].bei+'"/>'+
      '<i class="icon-add"></i></span>'+
      '<span class="now_tou">'+oneTouMoney*payArr[i].bei+'</span>'+
      '<span class="money">'+payArr[i].payMoney+'</span>';

      if(getMoneyArr.length>1){        // 每注的盈利是*至*时
        $(".main").addClass("big_li");

        var getMinMoneyClass="font_red";  // 最小盈利颜色
        var getMaxMoneyClass="font_red";  // 最大盈利颜色
        var maxGetMoney = payArr[i].bei*getMoneyArr[1]-payArr[i].payMoney;    // 最大盈利：当期倍数*getMoneyArr[1]每注最高奖金-累计投入
        var maxGetLilv = parseInt(100*maxGetMoney/payArr[i].payMoney);    // 最大盈利利率：最大盈利/累计投入

        if(payArr[i].getMoney<0){  // 如果最小盈利小于0
          getMinMoneyClass="font_green";
          if(maxGetMoney<0){    // 如果最小盈利小于0
            getMaxMoneyClass="font_green";
          }
        }
        liList+='<span class="dis-flex">'+
        '<span class="get-money '+getMinMoneyClass+'">'+payArr[i].getMoney+'</span>' +
        '<span>至</span>'+
        '<span class="'+getMaxMoneyClass+'">'+maxGetMoney+'</span>' +
        '</span>'+
        '<span>' +
        '<span class="lilv '+getMinMoneyClass+'">'+payArr[i].lilv+'%</span>' +
        '<span>至</span>'+
        '<span class="'+getMaxMoneyClass+'">'+maxGetLilv+'%</span>' +
        '</span>'+
        '</li>';

      }else{       // 每注的盈利只有一个数时
        if(payArr[i].getMoney>=0){      // 收益为正
          liList+='<span class="award font_red">'+oneMoney*payArr[i].bei+'</span>'+
          '<span class="get-money font_red">'+payArr[i].getMoney+'</span>'+
          '<span class="lilv font_red">'+payArr[i].lilv+'%</span>'+
          '</li>';
        }else{                  // 收益为负
          liList+='<span class="award font_green">'+oneMoney*payArr[i].bei+'</span>'+
          '<span class="get-money font_green">'+payArr[i].getMoney+'</span>'+
          '<span class="lilv font_green">'+payArr[i].lilv+'%</span>'+
          '</li>';
        }
      }
    }
  }else{     // 生成方案错误，返回选号页面
    location.href="./select.html";
  }
  $(".main>ul .list-item").remove();
  $(".main>ul").append(liList); // 追加到ul中
  changePayMoney();
};

function changePayMoney(){  // 修改追的期数、应付金额
  var lastLi=$(".main .list-item:last-child");
  $("footer .num").text(lastLi.children().first().text());
  $("footer .money").text(lastLi.children(".money").text());
}

$(".mask input[type=radio]").on("click",function(){
  $(".mask .f-a-yingli input[type=tel]").attr("readOnly","readOnly");
  $(this).siblings("label").find("input[readonly]").removeAttr("readOnly");
});

$(".mask .f-a-next>span:first-child").click(function(){  // mask中的取消
  hideMask();
  var issue=$("section .title #add-to-issue").val();  // 共追多少期
  var bei = $(".main .bei").val() || 1;    // 起始倍数

  $(".mask .f-a-qi").val(issue);        // 取消：修改mask中的值
  $(".mask .f-a-bei").val(bei);
  $(".mask .f-a-yingli input[type=tel]").attr("readOnly","readOnly");
  // FAtype:全局变量，方案类型
  $("input#rdoYingli"+FAtype).prop("checked","true")
    .siblings("label")
    .find("input[readonly]").removeAttr("readOnly");    // 修改单选按钮的状态
});

$(".mask").on("click",function(e){
  if($(e.target).is(".mask")){
    $(".mask .f-a-next>span:first-child").click();
  }
});

$(".mask .f-a-yes").click(function(){  // mask中的生成方案
  var tou_ru=$('.input .tou_ru').val();  // 基础投入奖金
  if(tou_ru%2!==0){
    $('.input .tou_ru').val(++tou_ru);
  }
  oneMoney = parseInt($('.input .award').val());  //单注奖金
  oneTouMoney = parseInt(tou_ru);
  oneTouCount = Math.round(oneTouMoney/2);
  getMoneyArr=new Array();
  getMoneyArr[0]=oneMoney;
  if(oneTouCount>0 && oneMoney>0 && oneMoney>1){
    changeDom(false,nowIssue);    // fanganType获取mask的数据，changeDom改变ul信息
    hideMask();
  }else{
    bubblePrompt("请重新填写");
  }
});


function fanganType(){    // 获取方案信息，传给changeDom函数使用
  var issueCount=Number($(".mask .f-a-qi").val());
  var beiStart=Number($(".mask .f-a-bei").val());
  var $check=$("input[name=rdoYingli]:checked");
  FAtype=$check.val();  // 选中的类型，FIXME:只有点击生成方案才会更改此值
  if(FAtype==1){    // 第一种预期盈利方式：百分比
    var yingli=Number($check.next("label").find("input").val());
    var payArr = createInfo(issueCount,beiStart,yingli,false,false);
  }else if(FAtype==2){    // 第二种预期盈利方式：前*期盈利**，之后盈利**
    var yingliObj={start:[
      Number($check.next("label").find("input:nth-child(2)").val()),
      Number($check.next("label").find("input:nth-child(4)").val())],
      next:Number($check.parent().children("label:last-child").find("input").val())};
    var payArr = createInfo(issueCount,beiStart,false,false,yingliObj);

  }else if(FAtype==3){    // 第三种预期盈利方式：最低盈利**元
    var yingli=Number($check.next("label").find("input").val());
    var payArr = createInfo(issueCount,beiStart,yingli,true,false);
  }
  var html=$check.siblings().text();
  html=html.replace(/(^\s+)|(\s+$)/g,"");

  $check.siblings().find("input").each(function(i,elem){
    if(i===2){
      html = html.replace(/(\s+)/, "，");
      html = html.replace(/(\s+)/, $(elem).val());
    }else{
      html = html.replace(/(\s+)/, $(elem).val());
    }
  });
  $("section #add-to-issue").val(issueCount); // 修改ul上面的 .title
  $("section .ying-li-lv").html(html);
  return payArr;
}


$(".changeMethod>a").click(function(){
  showMask();
});

var showMask=function(){  // 显示mask
  $(".mask").addClass("mask_show");
  $("body").css("overflow","hidden");
};
var hideMask=function(){  // 隐藏mask
  $(".mask").removeClass("mask_show");
  $("body").css("overflow","");
};

$("#add-to-issue").change(function(){
  var val=$(this).val();
  if(val<1){   // 防止输入0期
    val=1;
    $(this).val(1);
  }
  $(".mask .f-a-qi").val(val);
  $(".mask .f-a-yes").click();
});

function getInfo(){    // 方案信息，用于加、减之后重新计算方案，被changeDom调用

  $(".main .list-item").each(function(i,elem){
    var oldBei=payArr[i].bei;
    var newBei = Number($(elem).find(".bei").val());
    payArr[i].bei=newBei;    // 将修改后的倍数赋给payArr[i]中的bei

    for(var j=i;j<payArr.length;j++){    // 只修改点击所在的li之后的值
      payArr[j].beiSum-=oldBei;  // 减去旧的倍数
      payArr[j].beiSum+=newBei;  // 加上新的倍数

      payArr[j].payMoney=payArr[j].beiSum*oneTouMoney;  // 累计投入金额
      payArr[j].getMoney=Math.round(payArr[j].bei*getMoneyArr[0]-payArr[j].payMoney);// 中奖盈利
      payArr[j].lilv = Math.round(100*payArr[j].getMoney/payArr[j].payMoney); // 盈利率
    }
  });
  return payArr;
}


$("aside .icon-small_question").click(function(){
  $("#mask_tips").show();
})

$("#mask_tips").click(function(e){
  var $target=$(e.target);
  if($target.is(".know") || !$target.closest('#mask_zhuiqi>div').is("#mask_tips>div")){
    $("#mask_tips").hide();
  }
})

$("#next").click(function(){  // 投注按钮
  $("#mask_pay").show();
})


function changeIssue(nextIssue){   // 修改期号，传入下期期号
  var issue=Number(nextIssue);
  $(".issue").each(function(i,elem){
    $(elem).html(formatIssue(issue+i, maxIssue));
  })
}

var keyUp=function($this){     // 对当前input修改值
  var val=$this.val();
  if(val===""){
    $this.val("");
    return false;         // 不需计算注数、金额
  }else if(isNaN(val) || val.slice(0,1)==="0" || val===" " || val<1){
    val=1;
  }else if(val>maxZhuiQi && $this.closest(".f-a-bei").length>0){  //当是期数时
    val=maxZhuiQi;
  }
  $this.val(parseInt(val));
  return true;
}

