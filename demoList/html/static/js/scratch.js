/*
  * 刮刮乐脚本
  *
  * new Scratch({
  *   el: '#bridge',
  *   ratio: 0.6,
  *   coverImg: './static/images/1.jpg',
  *   minRadius: '50',          //最小直径
  *   ratio: '0.3',   //触发回调函数时刮开面积占总面积的比例，超过这个比例回调就触发，取值为0-1
  *   callback: function(){this.clearCanvas()},    //回调函数，清除canvas内容
  * });
  *
  * */
;
(function(window, document, undefined){
  function Scratch(settings){
    this.el = document.querySelector(settings.el);   //canvas的选择器
    this.canvas = this.el.getContext('2d');          //canvas画布
    this.radius = (this.el.width / 100) * 5;
    this.minRadius = this.radius < settings.minRadius ? settings.minRadius : this.radius;
    this.coverImg = new Image();
    this.ratio = settings.ratio || .8;
    this.callback = settings.callback;
    this.coverImg.src = settings.coverImg;
    this.canvasBgImg = settings.bgImg || null;
    this.eventHandler1 = null;
    this.eventHandler2 = null;
    var that = this;

    this.coverImg.onload = function(){
      if(that.canvasBgImg){
        that.el.style.backgroundImage = 'url("'+that.canvasBgImg+'")';
      }
      that.canvas.drawImage(that.coverImg, 0, 0, that.el.width, that.el.height);
    };
    this.addEvent();

  }

  Scratch.prototype.detectLeftButton = function(event){
    if('buttons' in event){
      return event.buttons === 1;
    }else if('which' in event){
      return event.which === 1;
    }else{
      return event.button === 1;
    }
  };

  Scratch.prototype.getBrushPos = function(xRef, yRef){
    var bridgeRect = this.el.getBoundingClientRect();
    return {
      x: Math.floor((xRef - bridgeRect.left) / (bridgeRect.right - bridgeRect.left) * this.el.width),
      y: Math.floor((yRef - bridgeRect.top) / (bridgeRect.bottom - bridgeRect.top) * this.el.height)
    };
  };

  Scratch.prototype.drawDot = function(mouseX, mouseY){
    this.canvas.beginPath();
    this.canvas.arc(mouseX, mouseY, this.radius, 0, 2 * Math.PI, true);
    this.canvas.fillStyle = '#000';
    this.canvas.globalCompositeOperation = "destination-out";
    this.canvas.fill();
  };

  Scratch.prototype.addEvent = function(){
    var that = this;
    if('ontouchstart' in window){    //移动端
      this.events = ['touchstart', 'touchmove', 'touchend'];
      this.eventHandler1 = function(e){
        e.preventDefault();
        var touch = e.targetTouches[0];
        if(touch){
          var brushPos = that.getBrushPos(touch.pageX, touch.pageY);
          that.drawDot(brushPos.x, brushPos.y);
        }

      };

    }else{    //PC端
      this.events = ['mousedown', 'mousemove', 'mouseup'];
      this.eventHandler1 = function(e){
        var brushPos = that.getBrushPos(e.clientX, e.clientY);
        var leftBut = that.detectLeftButton(e);
        if(leftBut == 1){
          that.drawDot(brushPos.x, brushPos.y);
        }
      };
    }
    that.eventHandler2 = function(){
      that.calcArea(that);
    };
    that.el.addEventListener(this.events[1], this.eventHandler1, false);
    that.el.addEventListener(this.events[1], this.eventHandler1, false);
    that.el.addEventListener(this.events[2], this.eventHandler2, false);
  };

  Scratch.prototype.calcArea = function(){
    var pixels = this.canvas.getImageData(0, 0, this.el.width, this.el.height);
    var transPixels = [];
    forEach(pixels.data, function(item, i) {
      var pixel = pixels.data[i + 3];
      if (pixel === 0) {
        transPixels.push(pixel);
      }
    });
    if (transPixels.length / pixels.data.length > this.ratio){
      this.callback && typeof this.callback === 'function' && this.callback();
    }
  };

  function forEach(items, callback) {
    return Array.prototype.forEach.call(items, function(item, idx) {
      callback(item, idx);
    });
  }

  Scratch.prototype.clearCanvas = function(){    //清除canvas
    this.canvas.clearRect(0, 0, this.el.width, this.el.height);
    this.el.removeEventListener(this.events[1], this.eventHandler1);
    this.el.removeEventListener(this.events[2], this.eventHandler2);
  };

  Scratch.prototype.init = function(settings){
    return new Scratch(settings);
  };

  if(typeof define === 'function' && typeof define.amd === 'object' && define.amd){
    define(function(){
      return Scratch;
    });
  }else if(typeof module !== 'undefined' && module.exports){
    module.exports = Scratch.init;
    module.exports.LuckyCard = Scratch;
  }else{
    window.Scratch = Scratch;
  }
})(window, document);