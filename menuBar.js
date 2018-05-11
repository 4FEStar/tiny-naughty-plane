//菜单栏
	//删除提交模块，Appstore模块
	function Highscores() {
	  
	};
	
	

	/*
		end classes, begin code
	*/

class menu{
	constructor(){
		// navigation wrapper element
		if ( ! document.getElementById('ASTEROIDS-NAVIGATION') ) {
			this.navigation = document.createElement('div');
			this.navigation.id = "ASTEROIDS-NAVIGATION";
			this.navigation.className = "ASTEROIDSYEAH";
			this.navigation.style = 
			`
			font-family: Arial, sans-serif;
			position: fixed;
			z-index: 10001;
			bottom: 0px;
			right: 10px;
			text-align: left;
			background: rgb(255, 255, 255);
			color: pink;
			padding: 2px;
			border: 1px solid rgb(225, 225, 225);
			box-shadow: rgb(51, 51, 51) -2px -2px 15px;
			border-radius: 3px;
			font-size: 70px;
			width: 300px;
			height: 80px;
			`
			// with ( this.navigation.style ) {
			// 	fontFamily = "Arial,sans-serif";
			// 	position = "fixed";
			// 	zIndex = "10001";
			// 	bottom = "0px";
			// 	right = "10px";
			// 	textAlign = "left";
			// 	background = '#fff';
			// 	color = 'pink';
			// 	padding = '2px';
			// 	border = '1px solid #e1e1e1';
			// 	boxShadow = '-2px -2px 15px #333';
			// 	borderRadius = "3px";
			// 	fontSize = "70px";
			// 	width = "300px";
			// 	height = "80px";

			// }
			document.body.appendChild(this.navigation);
			

			// button1
			this.button = document.createElement('button');
			this.button.id = "ASTEROIDS-button1";
			this.button.className = "ASTEROIDSBUTTON"
			with(this.button.style){
				width = "30px";
				height = "30px";
				borderRadius = "15px";
			}
			//在评分条内部添加按钮
			this.button.innerHTML = "11"
			this.navigation.appendChild(this.button);

			// button2
			this.button = document.createElement('button');
			this.button.id = "ASTEROIDS-button2";
			this.button.className = "ASTEROIDSBUTTON"
			with(this.button.style){
				width = "30px";
				height = "30px";
				borderRadius = "15px";
			}
			//在评分条内部添加按钮
			this.button.innerHTML = "22"
			this.navigation.appendChild(this.button);


			// button3
			this.button = document.createElement('button');
			this.button.id = "ASTEROIDS-button3";
			this.button.className = "ASTEROIDSBUTTON"
			with(this.button.style){
				width = "30px";
				height = "30px";
				borderRadius = "15px";
			}
			//在评分条内部添加按钮
			this.button.innerHTML = "33"
			this.navigation.appendChild(this.button);


			// points
			this.points = document.createElement('span');
			this.points.id = 'ASTEROIDS-POINTS';
			with ( this.points.style ) {
				font = '28pt Arial, sans-serif';
				fontWeight = 'bold';
				position = 'relative';
				left = '20px';
			}
			this.points.className = "ASTEROIDSYEAH";
			this.navigation.appendChild(this.points);	
		} 
		else {
			this.navigation = document.getElementById('ASTEROIDS-NAVIGATION');
			this.points = document.getElementById('ASTEROIDS-POINTS');
		}
	}
	setPlane(){
		addEvent(this.button1,"click",function(e){
			e = e || window.event;
			//设置飞机样式改变
		})
		
	}

}
		