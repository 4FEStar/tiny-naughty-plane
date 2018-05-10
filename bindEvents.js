/*
1.期望输入对象o，有如下属性
var o = {
	x: 100,
	y: 100,
	del: {
		x:1,
		y:1
	}
	keysPressed:{}//用来记录按键状态
}
2.建议使用方式
bindEvents(o,callback);
3.callback函数必须有参数：x/y/dir，对应处理对象的x，y，del属性。
*/
function bindEvents(o,callback) {
	var x = o.x,
		y = o.y,
		dir = {},
		scrollPos = {},
		vel = {x:0,y:0};
	var acc	= 30;
	var maxSpeed = 90;
	var rotSpeed = 360;
	var tDelta = 80/1000;

	//事件绑定
	EventUtil.addHandler(document, 'keydown',eventKeydown);
	EventUtil.addHandler(document, 'keypress',eventKeypress);
	EventUtil.addHandler(document, 'keyup',eventKeyup);

	//事件处理函数
	function eventKeydown(event){
		x = o.x;
		y = o.y;
		dir.x = o.del.x;
		dir.y = o.del.y;
		scrollPos.x = window.pageXOffset || document.documentElement.scrollLeft;
		scrollPos.y = window.pageYOffset || document.documentElement.scrollTop;

		//处理事件相关
		var event = EventUtil.getEvent(event);
		if(event.ctrlKey || event.shiftKey){
			return;
		}
		o.keysPressed[event.keyCode] = true;
		switch( event.keyCode) {
			case code(' '):
				o.firedAt = 1;
				break;
		};
		if ( indexOf([code('up'), code('down'), code('right'), code('left'), code(' '), code('B'), code('W'), code('A'), code('S'), code('D')], event.keyCode) != -1 ) {
			if ( event.ctrlKey || event.shiftKey )
				return;
			EventUtil.preventDefault(event);
			EventUtil.stopPropagation(event);
		}

		//滑动
		if((o.keysPressed[code('up')]) || o.keysPressed[code('W')]){
			//处理速度
			vel.x += dir.x * acc * tDelta;
			vel.y += dir.y * acc * tDelta;

			if(quickerSpeed(vel.x,vel.y) > maxSpeed){
				var l = quickerSpeed(vel.x,vel.y);
				if(l){
					vel.x = vel.x * (maxSpeed / l);
					vel.y = vel.y * (maxSpeed / l);
				}else{
					vel.x = vel.y = maxSpeed;
				}
			}
			console.log("press: "+vel.x);
			x += vel.x * tDelta;
			y += vel.y * tDelta;
		}else{
			vel.x *= 0.96;
			vel.y *= 0.96;
		}

		if((o.keysPressed[code('left')]) || o.keysPressed[code('A')]){
			var angle = radians(rotSpeed * tDelta * -1);
			dir.x = rotateX(dir.x,dir.y,angle);
			dir.y = rotateY(dir.x,dir.y,angle);
		}//dir

		if((o.keysPressed[code('right')]) || o.keysPressed[code('D')]){
			var angle = radians(rotSpeed * tDelta);
			dir.x = rotateX(dir.x,dir.y,angle);
			dir.y = rotateY(dir.x,dir.y,angle);
		}//dir

		if(x > w){
			window.scrollTo(scrollPos.x + 50, scrollPos.y);
			x = 0;
		}else if ( x < 0){
			window.scrollTo(scrollPos.x - 50, scrollPos.y);
			x = w;
		}

		if(y > h){
			window.scrollTo(scrollPos.x, scrollPos.y + h * 0.75);
			y = 0;
		}else if (y < 0 ){
			window.scrollTo(scrollPos.x, scrollPos.y - h * 0.75);
			y = h;
		}

		callback(x,y,dir);
	}

	function eventKeypress(event){
		var event = EventUtil.getEvent(event);
		if ( indexOf([code('up'), code('down'), code('right'), code('left'), code(' '), code('W'), code('A'), code('S'), code('D')], event.keyCode || event.which) != -1 ) {
			if ( event.ctrlKey || event.shiftKey )
				return;
			
			EventUtil.preventDefault(event);
			EventUtil.stopPropagation(event);
		}
	}

	function eventKeyup(event){
		if((o.keysPressed[code('up')] || (o.keysPressed[code('W')]))){
			var _timer = setInterval(()=>{
				if(vel.x < 0.005 && vel.y < 0.005){
					clearInterval(_timer);
				}
				x += vel.x * tDelta;
				y += vel.y * tDelta;
				if(x > w){
					window.scrollTo(scrollPos.x + 50, scrollPos.y);
					x = 0;
				}else if ( x < 0){
					window.scrollTo(scrollPos.x - 50, scrollPos.y);
					x = w;
				}

				if(y > h){
					window.scrollTo(scrollPos.x, scrollPos.y + h * 0.75);
					y = 0;
				}else if (y < 0 ){
					window.scrollTo(scrollPos.x, scrollPos.y - h * 0.75);
					y = h;
				}
				callback(x,y,dir);
				vel.x *= 0.90;
				vel.y *= 0.90;
				console.log("up: "+vel.x);
			},1000/60);
		}
		//处理事件
		var event = EventUtil.getEvent(event);
		o.keysPressed[event.keyCode] = false;
		if ( indexOf([code('up'), code('down'), code('right'), code('left'), code(' '), code('B'), code('W'), code('A'), code('S'), code('D')], event.keyCode) != -1 ) {
			EventUtil.preventDefault(event);
			EventUtil.stopPropagation(event);
		}
	}
}

//辅助函数
function code(name){
	var table = {'up': 38, 'down': 40, 'left':37,'right':39, 'esc':27};
	if(table[name]) return table[name];
	return name.charCodeAt(0);
}

function indexOf(arr, item, from){
	if ( arr.indexOf ) return arr.indexOf(item, from);
	var len = arr.length;
	for (var i = (from < 0) ? Math.max(0, len + from) : from || 0; i < len; i++){
		if (arr[i] === item) return i;
	}
	return -1;
}

function radians(deg) {
	return deg * Math.PI / 180;
}

function rotateX(dirX,dirY,angle){
	var test =  dirX * Math.cos(angle) - Math.sin(angle) * dirY;
	return test;
}
function rotateY(dirX,dirY,angle){
	return dirX * Math.sin(angle) + Math.cos(angle) * dirY;
}

function getAngle(x,y,dir){
	var dietY = dir.y - y;
	var dietX = dir.x - x;
	return Math.atan(dietX,dietY) / Math.PI * 180;
}

function quickerSpeed(x,y){
	var l = Math.sqrt(x * x, y * y);
	if(l < 0.005 && l > - 0.005) return 0;
	return l;
}//某过小范围认为是0

function throttle(fn, time = 500){
  let timer;
  return function(...args){
    if(timer == null){
      fn.apply(this,  args);
      timer = setTimeout(() => {
        timer = null;
      }, time)
    }
  }
}

//兼容事件处理
var EventUtil = {
	addHandler: function(element,type,handler){
		if(typeof addEventListener == 'function'){
			element.addEventListener(type,handler,false);
		} else if(typeof attachEvent == 'function'){
			element.attachEvent('on'+type,handler);
		}else{
			element['on'+type] = handler;
		}
	},
	removeHandler: function(element,type,handler){
		if(typeof removeEventListener == 'function'){
			element.removeEventListener(type,handler,false);
		}else if(typeof detachEvent == 'function'){
			element.detachEvent('on'+type,handler);
		}else{
			element['on'+type] = null;
		}
	},
	getEvent: function(event){
		return event?event:window.event;
	},
	getTarget: function(event){
		return event.target || event.srcElement;
	},
	preventDefault: function(event){
		if(typeof event.preventDefault == 'function'){
			event.preventDefault();
		}else{
			event.returnValue = false;
		}
	},
	stopPropagation: function(event){
		if(typeof event.stopPropagation == 'function'){
			event.stopPropagation();
		}else{
			event.cancelBubble = true;
		}
	}
};

//mousedown先放外面
EventUtil.addHandler(document,'mousedown',eventMousedown);
function eventMousedown(event){
	var event = EventUtil.getEvent(event);
	var message = document.createElement('span');

	message.style.position = 'absolute';
	message.style.border = '1px solid #999';
	message.style.background = 'white';
	message.style.color = "black";
	message.innerHTML = 'Press Esc to quit';
	document.body.appendChild(message);

	var x = event.pageX || (event.clientX + document.documentElement.scrollLeft);
	var y = event.pageY || (event.clientY + document.documentElement.scrollTop);
	message.style.left = x - message.offsetWidth/2 + 'px';
	message.style.top = y - message.offsetHeight/2 + 'px';

	setTimeout(function(){
		try{
			message.parentNode.removeChild(message);
		} catch(e){}
	},1000);
}



//考虑keysPressed状态
//如需要处理对象container

var container = document.getElementById('container');
var w = (document.clientWidth || window.innerWidth || document.documentElement.clientWidth);
var h = (document.clientHeight || window.innerHeight || document.documentElement.clientHeight);
container.keysPressed = {};
container.firedAt = false;

container.x = 0;
container.y = 0;
container.del = {
	x: 1,
	y: 1
}; //container.dir是dom的特殊用值？
bindEvents(container,callback);

function callback(x,y,del){
	container.x = x;
	container.y = y;
	container.del.x = del.x;
	container.del.y = del.y;
	console.log("x: "+x,"y: "+y,"del: "+ del.x+ ", "+del.y);
	container.style.top = y + 'px';
	container.style.left = x + 'px';
}

setInterval(()=>{
	callback(container.x,container.y,container.del);
},1000/60);


