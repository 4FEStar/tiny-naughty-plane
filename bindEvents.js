//希望得到的状态、以及时间改变的状态
// var o = {change:1};
//建议使用方式
// final.bind(o);
/*
	1、希望操作
	var o = {
		keysPressed: {},//记录对应键值的状态
		fireAt: false //是否开火
	}
	2、使用方式
	bindEvents.bind(o);
	3、处理输出：主要考虑keysPressed对应键值状态，参考最末注释
	4、暂未处理：
	- 兼容性、
	- 封装方式（工具函数和部分函数在外面。不清楚其他模块运行方式，暂时这样）
	- resize还未处理，原因同上
	- 解绑
*/

function bindEvents(o) {
	//事件绑定
	document.addEventListener('keydown',eventKeydown);
	document.addEventListener('keypress',eventKeypress);
	document.addEventListener('keyup',eventKeyup);

	//事件处理函数
	function eventKeydown(event){
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
			if ( event.preventDefault )
				event.preventDefault();
			if ( event.stopPropagation)
				event.stopPropagation();
			event.returnValue = false;
			event.cancelBubble = true;
			return false;
		}
	}

	function eventKeypress(event){
		if ( indexOf([code('up'), code('down'), code('right'), code('left'), code(' '), code('W'), code('A'), code('S'), code('D')], event.keyCode || event.which) != -1 ) {
			if ( event.ctrlKey || event.shiftKey )
				return;
			
			if ( event.preventDefault )
				event.preventDefault();
			if ( event.stopPropagation )
				event.stopPropagation();
			event.returnValue = false;
			event.cancelBubble = true;
			return false;
		}
	}

	function eventKeyup(event){
		o.keysPressed[event.keyCode] = false;
		if ( indexOf([code('up'), code('down'), code('right'), code('left'), code(' '), code('B'), code('W'), code('A'), code('S'), code('D')], event.keyCode) != -1 ) {
			if ( event.preventDefault )
				event.preventDefault();
			if ( event.stopPropagation )
				event.stopPropagation();
			event.returnValue = false;
			event.cancelBubble = true;
			return false;
		}
	}
}

//兼容性处理函数




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

//mousedown先放外面
document.addEventListener('mousedown',mouseDown);
function mouseDown(event){
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

//bindEvents.bind(container);
//container.timer = setInterval(()=>update(), 1000/50);

function update(){
	if(container.keysPressed[code('up')] || container.keysPressed[code('W')]) {
		console.log("上键")；
	}
	if(container.keysPressed[code('down')] || container.keysPressed[code('S')]) {
		console.log("下键")；
	}
	if(container.keysPressed[code('left')] || container.keysPressed[code('A')]) {
		console.log("左键")；
	}
	if(container.keysPressed[code('right')] || container.keysPressed[code('D')]) {
		console.log("右键")；
	}
	if(container.keysPressed[code(' ')] && container.firedAt === 1){
		console.log('fire');
		container.fireAt = false;
	}
	if(container.keysPressed[code('esc')]){
		console.log('exit');
	}
}

*/