// 定义公共的数据、玩法
// 每注奖金金额、显示哪个ul、最多胆码数(0表示没有胆码)、每注最少选几个球
var ballData={
  "rx2":{
    name:"任选二",// 名称
    oneAward:6,  // 单注奖金
    maxAward:60, // 一期最大奖金
    ul:1,        // 显示哪个ul
    danMax:0,    // 最多胆码数
    ballMin:2    // 最少选几个球
  },
  "rx3":{
    name:"任选三",// 名称
    oneAward:19, // 单注奖金
    maxAward:190,// 一期最大奖金
    ul:1,        // 显示哪个ul
    danMax:0,    // 最多胆码数
    ballMin:3    // 最少选几个球
  },
  "rx4":{
    name:"任选四",// 名称
    oneAward:78,  // 单注奖金
    maxAward:390, // 一期最大奖金
    ul:1,        // 显示哪个ul
    danMax:0,    // 最多胆码数
    ballMin:4    // 最少选几个球
  },
  "rx5":{
    name:"任选五",// 名称
    oneAward:540,// 单注奖金
    maxAward:540,// 一期最大奖金
    ul:1,        // 显示哪个ul
    danMax:0,    // 最多胆码数
    ballMin:5    // 最少选几个球
  },
  "rx6":{
    name:"任选六",// 名称
    oneAward:90, // 单注奖金
    maxAward:540,// 一期最大奖金
    ul:1,        // 显示哪个ul
    danMax:0,    // 最多胆码数
    ballMin:6    // 最少选几个球
  },
  "rx7":{
    name:"任选七",// 名称
    oneAward:26, // 单注奖金
    maxAward:390,// 一期最大奖金
    ul:1,        // 显示哪个ul
    danMax:0,    // 最多胆码数
    ballMin:7    // 最少选几个球
  },
  "rx8":{
    name:"任选八",// 名称
    oneAward:9,  // 单注奖金
    maxAward:180,// 一期最大奖金
    ul:1,        // 显示哪个ul
    danMax:0,    // 最多胆码数
    ballMin:8    // 最少选几个球
  },
  "qyzhi":{
    name:"前一直选",// 名称
    oneAward:13,   // 单注奖金
    maxAward:13,   // 一期最大奖金
    ul:1,          // 显示哪个ul
    danMax:0,      // 最多胆码数
    ballMin:1      // 最少选几个球
  },
  "qezhi":{
    name:"前二直选",// 名称
    oneAward:130,  // 单注奖金
    maxAward:130,  // 一期最大奖金
    ul:2,          // 显示哪个ul
    danMax:0,      // 最多胆码数
    ballMin:2      // 最少选几个球
  },
  "qezu":{
    name:"前二组选",// 名称
    oneAward:65,   // 单注奖金
    maxAward:65,   // 一期最大奖金
    ul:1,          // 显示哪个ul
    danMax:0,      // 最多胆码数
    ballMin:2      // 最少选几个球
  },
  "qszhi":{
    name:"前三直选",// 名称
    oneAward:1170, // 单注奖金
    maxAward:1170, // 一期最大奖金
    ul:3,          // 显示哪个ul
    danMax:0,      // 最多胆码数
    ballMin:3      // 最少选几个球
  },
  "qszu":{
    name:"前三组选",// 名称
    oneAward:195,  // 单注奖金
    maxAward:195,  // 一期最大奖金
    ul:1,          // 显示哪个ul
    danMax:0,      // 最多胆码数
    ballMin:3      // 最少选几个球
  },

  // 以下为胆拖投注
  "dan_rx2":{
    name:"任选二",// 名称
    oneAward:6,  // 单注奖金
    maxAward:24, // 一期最大奖金
    ul:2,        // 显示哪个ul
    danMax:1,    // 最多胆码数
    ballMin:2    // 最少选几个球
  },
  "dan_rx3":{
    name:"任选三",// 名称
    oneAward:19, // 单注奖金
    maxAward:114,// 一期最大奖金
    ul:2,        // 显示哪个ul
    danMax:2,    // 最多胆码数
    ballMin:3    // 最少选几个球
  },
  "dan_rx4":{
    name:"任选四",// 名称
    oneAward:78,  // 单注奖金
    maxAward:312,// 一期最大奖金
    ul:2,        // 显示哪个ul
    danMax:3,    // 最多胆码数
    ballMin:4    // 最少选几个球
  },
  "dan_rx5":{
    name:"任选五",// 名称
    oneAward:540,// 单注奖金
    maxAward:540,// 一期最大奖金
    ul:2,        // 显示哪个ul
    danMax:4,    // 最多胆码数
    ballMin:5    // 最少选几个球
  },
  "dan_rx6":{
    name:"任选六",// 名称
    oneAward:90, // 单注奖金
    maxAward:540,// 一期最大奖金
    ul:2,        // 显示哪个ul
    danMax:5,    // 最多胆码数
    ballMin:6    // 最少选几个球
  },
  "dan_rx7":{
    name:"任选七",// 名称
    oneAward:26, // 单注奖金
    maxAward:390,// 一期最大奖金
    ul:2,        // 显示哪个ul
    danMax:6,    // 最多胆码数
    ballMin:7    // 最少选几个球
  },
  "dan_rx8":{
    name:"任选八",// 名称
    oneAward:9,  // 单注奖金
    maxAward:180,// 一期最大奖金
    ul:2,        // 显示哪个ul
    danMax:7,    // 最多胆码数
    ballMin:8    // 最少选几个球
  },
  "dan_qezu":{
    name:"前二组选",// 名称
    oneAward:65,   // 单注奖金
    maxAward:65,   // 一期最大奖金
    ul:2,          // 显示哪个ul
    danMax:1,      // 最多胆码数
    ballMin:2      // 最少选几个球
  },
  "dan_qszu":{
    name:"前三组选",// 名称
    oneAward:195,  // 单注奖金
    maxAward:195,  // 一期最大奖金
    ul:2,          // 显示哪个ul
    danMax:2,      // 最多胆码数
    ballMin:3      // 最少选几个球
  }
}

var touNameFormat={  // 将投注类型与后台一一对应
  'qyzhi': 'qz1',      //前一直选
  'qezhi': 'qz2',      //前二直选
  'qezu': 'zu2',       //前二组选单式
  'qszhi': 'qz3',      //前三直选单式
  'qszu': 'zu3',       //前三组选单式
  'rx2': 'rx2',        //任二
  'rx3': 'rx3',        //任三
  'rx4': 'rx4',        //任四
  'rx5': 'rx5',        //任五
  'rx6': 'rx6',        //任六
  'rx7': 'rx7',        //任七
  'rx8': 'rx8',         //任八
  'dan_rx2': 'rx2dt',   //任二胆拖
  'dan_rx3': 'rx3dt',   //任三胆拖
  'dan_rx4': 'rx4dt',   //任四胆拖
  'dan_rx5': 'rx5dt',   //任五胆拖
  'dan_rx6': 'rx6dt',   //任六胆拖
  'dan_rx7': 'rx7dt',   //任七胆拖
  'dan_rx8': 'rx8dt',   //任八胆拖
  'dan_qezu': 'zu2dt',  //前二组选胆拖
  'dan_qszu': 'zu3dt'  //前三组选胆拖
}



var ksType={     //快三
  "hz":{
    name:"和值", // 名称
    tips:'单注奖金9-240元',//提示文字
    oneAward:{  // 单注奖金
      3:240,
      4:80,
      5:40,
      6:25,
      7:16,
      8:12,
      9:10,
      10:9,
      11:9,
      12:10,
      13:12,
      14:16,
      15:25,
      16:40,
      17:80,
      18:240
    },
    ul:1,        // 显示哪个ul
    ballMin:1,   // 最少选几个号
    balls:['3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18']           // 可选的号码
  },
  "stt":{
    name:"三同号通选",// 名称
    tips:'单注奖金40元', //提示文字
    oneAward:40,   // 单注奖金
    ul:2,        // 显示哪个ul
    ballMin:6,    // 最少选几个号
    balls:['111','222','333','444','555','666']  // 可选的号码
  },
  "std":{
    name:"三同号单选",// 名称
    tips:'单注奖金240元', //提示文字
    oneAward:240,   // 单注奖金
    ul:2,        // 显示哪个ul
    ballMin:1,   // 最少选几个号
    balls:['111','222','333','444','555','666']  // 可选的号码
  },
  "sbt":{
    name:"三不同号",// 名称
    tips:'单注奖金40元', //提示文字
    oneAward:40,   // 单注奖金
    ul:3,        // 显示哪个ul
    ballMin:3,    // 最少选几个号
    balls:['1','2','3','4','5','6']  // 可选的号码
  },
  "slt":{
    name:"三连号通选",// 名称
    tips:'单注奖金10元', //提示文字
    oneAward:10,   // 单注奖金
    ul:4,        // 显示哪个ul
    ballMin:4,    // 最少选几个号
    balls:['123','234','345','456']  // 可选的号码
  },
  "etf":{
    name:"二同号复选",// 名称
    tips:'单注奖金15元', //提示文字
    oneAward:15,   // 单注奖金
    ul:5,        // 显示哪个ul
    ballMin:1,    // 最少选几个号
    balls:['11','22','33','44','55','66']  // 可选的号码
  },
  "etd":{
    name:"二同号单选",// 名称
    tips:'单注奖金80元', //提示文字
    oneAward:80,   // 单注奖金
    ul:6,        // 显示哪个ul
    ballMin:1,    // 最少选几个号（各一个号）
    balls:[['11','22','33','44','55','66'],['1','2','3','4','5','6']]//可选的号码
  },
  "ebt":{
    name:"二不同号",// 名称
    tips:'单注奖金8元', //提示文字
    oneAward:8,   // 单注奖金
    ul:3,        // 显示哪个ul
    ballMin:2,    // 最少选几个号
    balls:['1','2','3','4','5','6']  // 可选的号码
  }
}

var ksNameFormat={  // 将快三的投注类型与后台一一对应
  'hz': '10071018',      //和值
  'stt': '10074036',     //三同号通选，值为7,7,7
  'std': '10071036',     //三同号单选
  'sbt': '10071035',     //三不同号
  'slt': '10074037',     //三连号通选，值为7,8,9
  'etf': '10074014',     //二同号复选
  'etd': '10071034',     //二同号单选
  'ebt': '10071025'      //二不同号
}

var lotidList = {  // 彩种id
  '10101': '黑龙江11选5',
  '10102': '吉林11选5',
  '10103': '辽宁11选5',
  '10104': '广东11选5',
  '10105': '山东11选5',
  '10106': '江西11选5',
  '10108': '河北11选5',
  '10109': '天津11选5',
  '10110': '北京11选5',
  '10111': '四川11选5',
  '10112': '陕西11选5',
  '10113': '河南11选5',
  '10114': '青海11选5',
  '10115': '江苏11选5',
  '10116': '上海11选5',
  '10117': '安徽11选5',
  '10118': '湖北11选5',
  '10119': '新疆11选5',
  '10120': '云南11选5',
  '10121': '内蒙11选5',
  '10122': '广西11选5',
  '10123': '浙江11选5',
  '10124': '甘肃11选5',
  '10125': '福建11选5',
  '10126': '贵州11选5',
  '10127': '山西11选5',
  '10128': '西藏11选5',
  '10129': '宁夏11选5',
  '10201': '辽宁快乐12',
  '10202': '浙江快乐彩',
  '10203': '四川快乐12',
  '10301': '黑龙江快乐十分',
  '10302': '广东快乐十分',
  '10303': '重庆快乐十分',
  '10304': '天津快乐十分',
  '10305': '陕西快乐十分',
  '10306': '云南快乐十分',
  '10307': '广西快乐十分',
  '10308': '山西快乐十分',
  '10401': '吉林快3',
  '10402': '江苏快3',
  '10403': '河北快3',
  '10404': '内蒙快3',
  '10405': '安徽快3',
  '10406': '北京快3',
  '10407': '河南快3',
  '10408': '宁夏快3',
  '10409': '上海快3',
  '10410': '湖北快3',
  '10411': '广西快3',
  '10412': '江西快3',
  '10413': '甘肃快3',
  '10414': '青海快3',
  '10416': '贵州快3',
  '10417': '福建快3',
  '10602': '新疆时时彩',
  '10701': '河南481',
  '10702': '河南幸运彩',
  '10703': '江苏e球彩',
  '10704': '甘肃泳坛夺金',
  '10705': '江苏e球彩胜平负',
  '10801': '山东群英会',
  '10802': '湖南幸运赛车',
  '10803': '江苏七位数',
  '10804': '北京PK拾',
  '10901': '四川金七乐'
};

var setTimer1=null,setTimer2=null;
var bubblePrompt=function(str){  //提示,str是提示文字
  $(".bubble").remove();    // 先移除之前的
  clearTimeout(setTimer1);    // 清除定时器
  clearTimeout(setTimer2);

  $("body").append("<div class='bubble opa'>" +
  "<div>" +
  "<span>"+str+"</span>" +
  "</div>" +
  "</div>");
  setTimer1=setTimeout(function(){    //2秒之后是此元素变为透明
    $(".bubble").removeClass("opa");
    setTimer2=setTimeout(function(){    //0.5秒之后删除此元素
      $(".bubble").remove();
    },500)
  },2000)
};

function stopMove(select){   // 传入选择器，当显示此元素时，阻止滑动
  document.addEventListener("touchmove", function(e){  // 有弹出层时禁止滑动
    if($(select).css("display")!="none"){
      e.preventDefault();
    }
  }, false);
}

function changeHeader(str){   // 修改header的标题、地区
  $("header>a:first-child>span:last-child").html(str);
}

/*
* 当成功加减、输入时返回true，否则返回false
* */
var lessValue=function($this){  // 减，对$this后的input[type=tel]减一
  var input=$this.next("input[type=tel]");
  var val=input.val();
  if(val>1){
    input.val(--val);
    return true;
  }else{
    return false;
  }
}

var addValue=function($this){  // 加，对$this前的input[type=tel]加一
  var input=$this.prev("input[type=tel]");
  var val=input.val();
  if(val>=maxZhuiQi && $this.closest(".list-item").length<=0 && $this.prev('input').closest(".f-a-bei").length<=0 && $this.closest(".beiCount").length<=0) return false;
  input.val(++val);
  return true;
}

var keyUp=function($this){     // 对当前input修改值
  var val=$this.val();
  if(val===""){
    $this.val("");
    return false;         // 不需计算注数、金额
  }else if(isNaN(val) || val.slice(0,1)==="0" || val===" " || val<1){
    val=1;
  }else if(val>maxZhuiQi && $this.closest(".list-item").length<=0 && $this.closest(".beiCount").length<=0 && $this.closest(".f-a-bei").length<=0 && $this.closest(".f-a-yingli").length<=0){  // 不是倍数，仅期数
    val=maxZhuiQi;
  }
  $this.val(parseInt(val));
  return true;
}


$("body").on("change",function(e){
  var $target=$(e.target);
  if($target.is("input[type=tel]")){
    if($target.val() <= 0){
      $target.val(1);
    }else{
      $target.val(parseInt($target.val()));
    }
  }
})


var fillTime=function(time){ return time>=10?time:"0"+time; };
/**
 * issue：期号， time：倒计时， url：倒计时完毕请求的url
 * */
var countdown=function(issue,time,url){
  if(typeof changeIssue === 'function'){
    changeIssue(issue);  //每次重新开始倒计时前都需要重新修改期号(追期投注页面)
  }
  $("#issue").html(issue);
  var minutes=fillTime(parseInt(time/60));
  var seconds=fillTime(parseInt(time%60));
  $("#countdown").html(minutes+":"+seconds);
  clearInterval(timerCountdown);
  var timerCountdown=setInterval(function(){
    time--;
    if(time>=0){
      minutes=fillTime(parseInt(time/60));
      seconds=fillTime(parseInt(time%60));
      $("#countdown").html(minutes+":"+seconds);
    }else{
      clearInterval(timerCountdown);
      getIssue(url);
      bubblePrompt('期号已更新，请注意核对');
    }
  },1000)
}


function getIssue(url){  // 获取期号及倒计时
  $.ajax({
    url:url,
    dataType:'jsonp',
    jsonp:'jsonp_callback',
    success:function(data){
      if(typeof data !== 'object'){    //判断是不是对象，是否需要从json转换为对象
        data = $.parseJSON(data);         //或 data = JSON.parse(data);
      }
      //console.log(data);
      if(data.ret==0){
        ajaxIssue=data.data.issueTime.nextIssue;
        nowIssue=ajaxIssue.slice(-2);
        maxIssue=Number(data.data.issueTime.endIssueTody.slice(-2));  // 最大期号
        countdown(nowIssue, data.data.issueTime.recentDrawTime, url);
      }else{
        bubblePrompt(data.msg);
      }
    }
  })
}

function syxwCodeStr(data){   // 输出codeStr，用于投注
  var codestr='';
  for(var i=0;i<data.length;i++){
    if(i!==0) codestr+='_';
    codestr+=touNameFormat[data[i].ballData_type]+isFushi(data[i])+'-'+data[i].selBall[0].join(',');
    if(data[i].ballData_type==='qszhi'){    //前三直
      codestr+='*'+data[i].selBall[1].join(",")+'*'+data[i].selBall[2].join(",");
    }else if(data[i].ballData_type==='qezhi'){   //前二直
      codestr+='*'+data[i].selBall[1].join(",");
    }else if(data[i].selBall[1]){  // 胆拖投注
      codestr+='@'+data[i].selBall[1].join(",");
    }
  }
  return codestr
}

function ksCodeStr(data){   // 输出快3的codeStr，用于投注
  //console.log(data);
  var codestr='';
  for(var i=0;i<data.length;i++){
    if(i!==0) codestr+='_';
    var ksType=ksNameFormat[data[i].dataKsType];  // 投注类型
    if(ksType==='10074036'){   // 三同号通选
      codestr+=ksType+'-7,7,7';
    }else if(ksType==='10074037'){  // 三连号通选
      codestr+=ksType+'-7,8,9';
    }else{
      codestr+=ksNameFormat[data[i].dataKsType]+'-'+data[i][0].join(',');
      if(data[i][1]){
        codestr+='*'+data[i][1].join(',');
      }
    }
  }
  return codestr
}

function isFushi(info){  //判断是否复式
  if(info.ballData_type.substr(0,3)!=='dan' && info.payInfo.zhuNum>1){
    return '2';  //非胆拖复式
  }else{
    return '';   //胆拖或单式
  }
}
function touZhu(url,param, localt){    // 投注，localt：投注成功跳转的地址
  //console.log(param);
  $.ajax({
    url:url,
    data:param,
    dataType:"json",
    success:function(json){
      if(typeof json !== 'object'){
        json = $.parseJSON(json);
      }
      //console.log(json);
      if(json.ret===0){
        bubblePrompt('投注成功');
        if(typeof clearBallList === 'function'){  // 号码列表页面
          clearBallList(true);  // 清空投注信息
        }else if(data){     // 追期页面
          data=new Array();   // 清空号码
          localStorage.removeItem('ballList');  // 删除号码列表
          localStorage.removeItem('ksBallList');
        }
        setTimeout(function(){
          window.location.replace(localt);  // 投注成功
        },1000)
      }else if(json.ret===1){
        bubblePrompt(json.data);
      }else{
        bubblePrompt('投注失败');
      }
    }.bind(window),
    error:function(){
      bubblePrompt('投注失败');
    }
  })
}


var nowIssue='01';    // 期号，changeDom使用
var ajaxIssue=null;   // 完整期号，用于投注
var maxIssue=88;      // 初始化此彩种的最大期号
var maxZhuiQi=240;    // 最多追240期
var maxMoney=990000;  // 单张订单最大99万

function isLimit(qi,money){   // 判断是否超期/金额
  if(qi>maxZhuiQi){
    bubblePrompt('最多追期：'+maxZhuiQi+"期");
  }else if(money>maxMoney){
    bubblePrompt('最大投注金额：'+maxMoney+"元");
  }else if(!qi || !money){
    bubblePrompt('请重新选择');
  }else{
    return true;
  }
}
