/**
 * 1. 利用闭包在循环中直接找到对应元素的索引
 * */
var list = document.getElementsByTagName("li");
for (var i = 0; i < list.length; i++){
  (function (i){
    list[i].onclick = function (){
      console.log(i);
    };
  })(i);
}



/**
 * 2. 二维数组降维
 * */
var result=[].concat.apply([],data);


/**
 * 3. 多维数组降维
 * */
var result=[];
function printArray(arr){
  for (var key in arr){
    if (arr[key] instanceof Array){
      printArray(arr[key]);
    } else{
      result.push(arr[key]);
    }
  }
  return result;
}


/**
 * 4. 反向引用与忽略分组(不希望捕获某些分组，只需要在分组内加上 ?: 即可)
 * */
var str = '2017-07-29'.replace(/(\d{4})-(\d{2})-(\d{2})/g, '$2/$3/$1');  // str: 07/29/2017
var str = '2017-07-29'.replace(/(?:\d{4})-(\d{2})-(\d{2})/g,'$2/$1');    // str: 29/07




