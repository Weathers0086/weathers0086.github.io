if(!Function.prototype.bind){
	Function.prototype.bind=function(obj){


		var fun=this;//calcSal(base,bonus,other)
		var args=Array.prototype.slice.call(arguments,1);

		return function(){

			fun.apply(obj,args.concat(
				Array.prototype.slice.call(arguments)
			));
		}
	}
}
function funcGet(id){
	return document.getElementById(id);
}
var game={
	data:[],//保存4x4个单元格中数据的二维数组
	RN:4,//总行数
	CN:4,//总列数
	score:0,
	top:0,//最高分
	state:1,//游戏的状态：进行中:1  结束:0
	RUNNING:1,//运行状态
	GAMEOVER:0,//结束状态
	PLAYING:2,//动画播放中状态
	init:function(){//初始化所有格子div的html代码
		//设置id为gridPanel的宽为: CN*116+16+"px";
		funcGet("gridPanel").style.width=this.CN*116+16+"px";
		//设置id为gridPanel的高为: RN*116+16+"px";
		funcGet("gridPanel").style.height=this.RN*116+16+"px";
		var grids=[];
		var cells=[];

		for(var r=0;r<this.RN;r++){

			for(var c=0;c<this.CN;c++){

				grids.push(
				'<div id="g'+r+c+'" class="grid"></div>'
				);

				cells.push(
				'<div id="c'+r+c+'" class="cell"></div>'
				);
			}
		}

		funcGet("gridPanel").innerHTML=grids.join("")
			                    +cells.join("");
	},
	start:function(){//开始游戏方法
		this.init();//生成游戏界面
		animation.init();


		for(var r=0;r<this.RN;r++){
			this.data.push([]);//在data中压入一个空数组
			//	c从0开始，到<CN结束，遍历行中每个格
			for(var c=0;c<this.CN;c++){
				this.data[r][c]=0;//设置data中当前位置为0
			}
		}
		this.score=0;//初始化分数为0
		funcGet("top").innerHTML=this.getTop();
		this.state=this.RUNNING;//初始化游戏状态为运行
		funcGet("gameOver").style.display="none";
		this.randomNum();//生成1个随机数
		this.randomNum();//再生成1个随机数
		this.updateView();//更新页面元素

/*---------------下面的是移动端，改为滑动事件-----------------*/
		var panel=$('#gridPanel');
		panel.on("swipeLeft",function(){
			console.log("左滑了");
			this.moveLeft();
		}.bind(this)),
		panel.on("swipeRight",function(){
			console.log("右滑了");
			this.moveRight();
		}.bind(this)),
		panel.on("swipeUp",function(){
			console.log("上滑了");
			this.moveUp();
		}.bind(this))
		panel.on("swipeDown",function(){
			console.log("下滑了");
			this.moveDown();
		}.bind(this));


			document.addEventListener("touchmove",function(e){
				e.preventDefault();
			},false);




		//根据当前屏幕实际的宽高，计算小方块、棋盘应该显示的宽、高
		var width=screen.width-16;
		var height=screen.height-16;
		console.log(width+"AND"+height);
		console.log(window.innerWidth-16+"AND"+(window.innerHeight-16));
		$("#gridPanel").css({
			width:width-width/9,
			height:width-width/9,
			marginLeft:width/18,
			marginTop:width/18
		})

		$(".grid").css({
			width:(width-width/9)*4/21,
			height:(width-width/9)*4/21,
			marginLeft:(width-width/9)/21,
			marginTop:(width-width/9)/21
		})

		$(".cell").css({
			width:(width-width/9)*4/21,
			height:(width-width/9)*4/21,
			margin:0,



			fontSize:(width-width/9)*4*6/(21*10),
			lineHeight:(width-width/9)*4/21+"px"
		})


//[id^="c0"]{top:16px}
		for(var i=0;i<4;i++){
			//console.log($("[id^=c"+i+"]"));
			$("[id^=c"+i+"]").css({
				top:(width-width/9)/21+((width-width/9)/21+(width-width/9)*4/21)*i
			})

//[id$="0"]{left:16px}

			//console.log($("[id$="+i+"]"));
			//console.log($(`[id$='${i}']`));  //Android4.4以下不支持
			//console.log($("[id$='"+i+"']"));

			$("[id$='"+i+"']").css({
				left:(width-width/9)/21+((width-width/9)/21+(width-width/9)*4/21)*i
			})

		}


/*------------------上面的是移动端-----------------------*/

		
		document.onkeydown=function(){
			if(this.state==this.RUNNING){
				var e=window.event||arguments[0];
					//  IE8           IE9+或其它

				switch(e.keyCode){
					case 37: this.moveLeft(); break;
					case 38: this.moveUp(); break;
					case 39: this.moveRight(); break;
					case 40: this.moveDown(); break;
				}
			}
		}.bind(this);
	},
	updateView:function(){

		for(var r=0;r<this.RN;r++){
			for(var c=0;c<this.CN;c++){

				var div=funcGet("c"+r+c);

				if(this.data[r][c]==0){

					div.innerHTML="";

					div.className="cell";
				}else{

					div.innerHTML=this.data[r][c];

					div.className="cell n"+this.data[r][c];
				}
			}
		}


		/*-----------------↓-重新设置cell的值-------------*/
		var width=screen.width-16;

		for(var i=0;i<4;i++){
			//console.log($("[id^=c"+i+"]"));
			$("[id^=c"+i+"]").css({
				top:(width-width/9)/21+((width-width/9)/21+(width-width/9)*4/21)*i,

			})

//[id$="0"]{left:16px}
			//console.log($("[id$="+i+"]"));
			//console.log($(`[id$='${i}']`));
			//console.log($("[id$='"+i+"']"));

			$(`[id$='${i}']`).css({
				left:(width-width/9)/21+((width-width/9)/21+(width-width/9)*4/21)*i
			})
		}




		/*------------------↑重新设置cell的值--------------*/





		funcGet("score").innerHTML=this.score;



		if(this.isGameOver()){

			this.state=this.GAMEOVER;

			funcGet("finalScore").innerHTML=this.score;

			funcGet("gameOver").style.display="block";
			if(this.score>this.getTop()){
				this.setTop(this.score);
			}
		}
	},
	setTop:function(value){
		var now=new Date();
		now.setFullYear(now.getFullYear()+1);
		document.cookie="top="+value+";expires="+
			            now.toGMTString();
	},
	getTop:function(){
		var top=parseInt(document.cookie.slice(4));
		return isNaN(top)?0:top;
	},
	isGameOver:function(){
		for(var r=0;r<this.RN;r++){
			for(var c=0;c<this.CN;c++){

				if(this.data[r][c]==0){
					return false;//返回false
				}else if(c!=this.CN-1
				&&this.data[r][c]==this.data[r][c+1]){

					return false;//返回false
				}else if(r!=this.RN-1
				&&this.data[r][c]==this.data[r+1][c]){

					return false;//返回false
				}
			}
		}
		return true;
	},
	randomNum:function(){
		for(;;){//死循环
			
			var r=Math.floor(Math.random()*this.RN);
			//在0~CN-1之间生成一个随机列号，保存在变量c中
			var c=Math.floor(Math.random()*this.CN);

			if(this.data[r][c]==0){
	

	
				this.data[r][c]=Math.random()<0.5?2:4;
			
				break;
			}
		}
	},
	move:function(iterator){
		var before=this.data.toString();
		iterator.call(this);
		var after=this.data.toString();
		if(before!=after){


			this.state=this.PLAYING;




			animation.start(function(){
				this.randomNum();
				this.updateView();
				this.state=this.RUNNING;
			}.bind(this));
		}
	},
	moveLeft:function(){
		this.move(function(){
			for(var r=0;r<this.RN;r++){
				this.moveLeftInRow(r);
			}
		});
	},
	moveLeftInRow:function(r){
		//从0位置开始，到<CN-1结束,遍历r行中每个元素
		for(var c=0;c<this.CN-1;c++){
			var nextc=this.getRightInRow(r,c);
			//console.log(nextc);
		//	如果没找到，就退出循环
			if(nextc==-1){break;}
			else if(this.data[r][c]==0){
				//否则, 如果当前元素是0
		//			将nextc位置的值换到当前位置
				this.data[r][c]=this.data[r][nextc];
		//			将nextc位置设置为0
				this.data[r][nextc]=0;
				animation.addTask(
					funcGet("c"+r+nextc),r,nextc,r,c);
		//          c留在原地(抵消循环中的变化)
				c--;
			}else if(this.data[r][c]
						==this.data[r][nextc]){
			//否则 如果当前元素==nextc位置的元素
		//		    将当前位置*=2
				this.data[r][c]*=2;
		//			将nextc位置设置为0
				this.data[r][nextc]=0;
				//将合并后当前元素的值，计入总分
				this.score+=this.data[r][c];
				animation.addTask(
					funcGet("c"+r+nextc),r,nextc,r,c);
			}
		}
	},
	
	getRightInRow:function(r,c){
		//nextc从c+1开始，遍历r行右侧剩余元素
		for(var nextc=c+1;nextc<this.CN;nextc++){
		//	如果当前位置!=0
			if(this.data[r][nextc]!=0){
		//		返回nextc
				return nextc;
			}
		}//(遍历结束)
		//返回-1
		return -1;
	},
	moveRight:function(){
		this.move(function(){
			for(var r=0;r<this.RN;r++){
			//	每遍历一行，就调用moveRightInRow，传入r
				this.moveRightInRow(r);
			}//(遍历结束)
		});
	},
	moveRightInRow:function(r){//遍历data中r行每个元素
		//c从CN-1开始，到>0结束，每次--，
		for(var c=this.CN-1;c>0;c--){
		//	获得左侧下一个不为0的位置,保存在prevc
			var prevc=this.getLeftInRow(r,c);
		
			if(prevc==-1){break;}
		
			else if(this.data[r][c]==0){

				this.data[r][c]=this.data[r][prevc];

				this.data[r][prevc]=0;
				animation.addTask(
					funcGet("c"+r+prevc),r,prevc,r,c);
		//		c留在原地
				c++;
				
			}else if(this.data[r][c]
						==this.data[r][prevc]){


				this.data[r][c]*=2;

				this.data[r][prevc]=0;

				this.score+=this.data[r][c];
				animation.addTask(
					funcGet("c"+r+prevc),r,prevc,r,c);
			}
		}
	},
	getLeftInRow:function(r,c){

		for(var prevc=c-1;prevc>=0;prevc--){

			if(this.data[r][prevc]!=0){

				return prevc;
			}
		}
		return -1;
	},
	moveUp:function(){
		this.move(function(){
		  for(var c=0;c<this.CN;this.moveUpInCol(c),c++);
		});
	},
	moveUpInCol:function(c){
		for(var r=0;r<this.RN-1;r++){
			var nextr=this.getDownInCol(r,c);
			if(nextr==-1){break;}
			else if(this.data[r][c]==0){
				this.data[r][c]=this.data[nextr][c];
				this.data[nextr][c]=0;
				animation.addTask(
					funcGet("c"+nextr+c),nextr,c,r,c);
				r--;
			}else if(this.data[r][c]
						==this.data[nextr][c]){
				this.data[r][c]*=2;
				this.data[nextr][c]=0;
				//计入总分
				this.score+=this.data[r][c];
				animation.addTask(
					funcGet("c"+nextr+c),nextr,c,r,c);
			}
		}
	},
	getDownInCol:function(r,c){
		for(var nextr=r+1;nextr<this.RN;nextr++){
			if(this.data[nextr][c]!=0){
				return nextr;
			}
		}
		return -1;
	},
	moveDown:function(){
		this.move(function(){
			for(var c=0;c<this.RN;this.moveDownInCol(c),c++);
		});
	},
	moveDownInCol:function(c){
		for(var r=this.RN-1;r>0;r--){
			var prevr=this.getUpInCol(r,c);
			if(prevr==-1){break;}
			else if(this.data[r][c]==0){
				this.data[r][c]=this.data[prevr][c];
				this.data[prevr][c]=0;
				animation.addTask(
					funcGet("c"+prevr+c),prevr,c,r,c);
				r++;
			}else if(this.data[r][c]
						==this.data[prevr][c]){
				this.data[r][c]*=2;
				this.data[prevr][c]=0;
				//将合并后当前元素的值，计入总分
				this.score+=this.data[r][c];
				animation.addTask(
					funcGet("c"+prevr+c),prevr,c,r,c);
			}
		}
	},
	getUpInCol:function(r,c){
		for(var prevr=r-1;prevr>=0;prevr--){
			if(this.data[prevr][c]!=0){
				return prevr;
			}
		}
		return -1;
	}
}

window.onload=function(){
	game.start();

}






