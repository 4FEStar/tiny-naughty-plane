 class Plane{
	constructor(type){
		let style = document.createElement('style');
		this.sWidth=document.body.clientWidth;
		this.sHeight=document.body.clientHeight; 
		style.innerHTML=`#svg1{width:${this.sWidth};height:${this.sHeight}} float:left`;
		document.head.appendChild(style);
		this.svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
		this.svg.setAttribute("width",this.sWidth);
		this.svg.setAttribute("height",this.sHeight);
		this.svg.setAttribute("id","svg1")
		this.plane=`<path class=${type} id="svg_10" d="M115.58203401879454,83.58500375350157 C115.25744718529437,83.58500375350157 114.96866549715301,83.71369803542137 114.72500838691455,83.94713854472317 C114.48155733448183,84.18038706752206 114.28018786489227,84.51461345436746 114.11262124158664,84.93202528077225 C113.77753482629544,85.76673333961472 113.57141041675119,86.93930849269088 113.4586614137518,88.34357617324976 C113.34613407899772,89.74514197046723 113.3271705167614,91.37713579768076 113.37392066179328,93.12415265855556 C109.36447599087111,94.71283995977781 101.23257539063991,97.99305298656 100.57933156164266,98.72545535847946 C99.70961256083582,99.70056586038656 99.99061712788249,100.81809717654382 100.34109127400586,101.55996016081669 L113.70969185504265,98.93190517898894 C113.99227411720243,102.35671017627872 114.39406498233926,105.74879906531478 114.74419361739582,108.40676071940644 C113.43682553059782,108.77632166915663 110.996393446114,109.50603421971368 110.49265808369279,109.9585393694387 C109.79871991959955,110.58190245454622 109.79872512307972,112.59503874187212 109.79872512307972,112.59503874187212 L115.2702435831238,112.16521815436428 C115.39910984484052,113.03298005687716 115.47970030121134,113.53931379911671 115.47970030121134,113.53931379911671 L115.48769596846321,113.58500457632987 L115.53086820069898,113.58500457632987 L115.63159820576911,113.58500457632987 L115.67476939730841,113.58500457632987 L115.68276506456041,113.53931379911671 C115.68276506456041,113.53931379911671 115.76320253862188,113.03297101039281 115.89222074195213,112.16521815436428 L121.36533875172492,112.59503874187212 C121.36533875172492,112.59503874187212 121.36534499590098,110.58190245454622 120.67140475041603,109.9585393694387 C120.16748102202195,109.50585932101501 117.72526726601154,108.77449226897737 116.41826966698424,108.40505797000962 C116.76767501833122,105.75525322935246 117.16875716950256,102.37614403510105 117.45117396100034,98.9623727332857 L130.6630852731656,101.55995915565155 C131.01355525650493,100.81809617137873 131.29616665815246,99.70056485522151 130.4264455759536,98.72545435331433 C129.78128275127872,98.00211655876497 121.84588012273184,94.79486041317953 117.78695139842603,93.18506665868507 C117.83544783132035,91.41540644735569 117.81762174979528,89.76117234082557 117.70380707410752,88.34357516808467 L117.70380707410752,88.34019077775369 C117.5910008328296,86.9374720563575 117.38465683643275,85.76603877064562 117.04985036836105,84.93202427560685 C116.88233161707068,84.51472804316974 116.6826012436579,84.18046748071713 116.4390627727619,83.94713753955767 C116.1954035811319,83.7136970302567 115.90662501507859,83.58500274833648 115.58204026297042,83.58500274833648 L115.58203401879454,83.58500375350157 z" fill-opacity="null" stroke-opacity="null" stroke-width="1.5" stroke="#000" fill="#FFAFCC"/>`
		this.svg = document.body.appendChild(this.svg);	
		this.svg.innerHTML=this.plane;
		this.plane=document.getElementById('svg_10')
		this.m=new Snap.Matrix(1,0,0,1,0,0);
		this.line_m=new Snap.Matrix(1,0,0,1,0,0);
		let d=Snap.path.getBBox(Snap('#svg_10').attr('d'));
		this.position={
			x:d.cx,
			y:d.cy
		}
		this.planeX=this.position.x
		this.planeY=this.position.y
		this.do_sign = true;

		this.deg = 0;
		this.line = {
			x: 0,
			y: 0
		}

		Snap('#svg_10').transform(this.m.toTransformString());

	}//画布样式和飞机模型
	createStyle(planeClass,bgColor,border){
		var style = document.createElement('style');
		style.innerHTML=`.${planeClass}{fill:${bgColor}; stroke:${border}}`
		document.head.appendChild(style);
	}//自定义飞机style
	choiceStyle(planeState){

		switch(	planeState){
			case 1:
		plane.createStyle(planeClass,'#cccccc','#000000');
			break;
			case 2:
		plane.createStyle(planeClass,'#AE2323','#BE8D9A');
			break;
			case 3:
		plane.createStyle(planeClass,'#1BEFCF','#680A23');
		break;
			case 4:
		plane.createStyle(planeClass,'#9AF312','#DE1147');
		break;	
			}
	}//固定css class 升级样式
	fly(x,y,x1,y1,speed=0.5){//x,y要去的坐标 x1,y1是要去的坐标向量
			// if(this.timer){clearInterval(this.timer)}
		console.log(Math.atan(x1/y1)*180/Math.PI);
		let v = {
			x: x - this.position.x,
			y: y - this.position.y,
		}
		let last = {
			x: this.position.x,
			y: this.position.y
		}
		let len = Math.sqrt(v.x ** 2 + v.y ** 2);
		// let deg=Math.atan(x1/y1)*180/Math.PI/(len/speed);
		let deg=(Math.atan2(y1,x1) - Math.atan2(-1,0))*180/Math.PI;
		// console.log(Math.acos((x1*0+y1*-1)/(Math.sqrt(x1 ** 2+y1 ** 2)*Math.sqrt(0 ** 2+(-1) ** 2)))*180/Math.PI);
		// console.log((Math.atan2(y1,x1) - Math.atan2(-1,0))*180/Math.PI);
		if(deg>180){
			deg = deg - 360;
		}
		deg = deg/(len/speed);
		let rad=Math.atan2(v.y,v.x) - Math.atan2(0,1)
		
		let sx = this.position.x,sy = this.position.y;
		this.test(this.position.x, this.position.y);
		this.test(x,y);
		var i=0;
			this.timer = setInterval(()=>{
			let color=this.randomHexColor;
			this.p1.attr({opacity:0.8,stroke:color()})
			this.p2.attr({opacity:0.8,stroke:color()})
			this.p3.attr({opacity:0.8,stroke:color()})
			Snap('#svg_10').transform(this.m.toTransformString());
			Snap('#svg1').selectAll('line').forEach((a)=>{
				a.transform(this.line_m.toTransformString());
			});
			this.m.add(1,0,0,1,speed*Math.cos(rad),speed*Math.sin(rad));
			this.line_m.add(1,0,0,1,speed*Math.cos(rad),speed*Math.sin(rad));
			this.position = {
				x: this.position.x + speed*Math.cos(rad),
				y: this.position.y + speed*Math.sin(rad)
			}
			i++;
			let ran=Math.floor(Math.random()*3+1)
			this['p'+ran].attr({opacity:0})

			let str = this.plane.getAttribute('transform')+" rotate("+(deg*i)+", "+this.planeX +" "+this.planeY+")";
			this.plane.setAttribute('transform',str)
			let line=	document.getElementsByTagName('line');
			console.log(last.x,last.y);
			for(let ii =0;ii<line.length;ii++){
				let str1 = line[ii].getAttribute('transform')+" rotate("+(deg*i)+", "+last.x +" "+last.y+")";
				line[ii].setAttribute('transform',str1)
			}
			if(Math.abs(this.position.x-sx)>=Math.abs(v.x)&&Math.abs(this.position.y-sy)>=Math.abs(v.y)){
				this.p1.attr({opacity:0})
				this.p2.attr({opacity:0})
				this.p3.attr({opacity:0})
				this.do_sign = true;
				clearInterval(this.timer);
			}
			
		},10);
		
	}

	flywait(x,y,x1,y1,speed=0.5) {
		let timer = setInterval(()=>{
		if(this.do_sign){
			this.do_sign = false;
			this.fly(x,y,x1,y1,speed);
			clearInterval(timer);
		}
		},10);
	}
	flyFront(){

			let color=this.randomHexColor;
			Snap('#svg1').selectAll('line').forEach((a,i)=>{
				this['p'+i]=a.attr({
					opacity:0.8,
					stroke:color()
				});
			});
			let ran=Math.floor(Math.random()*3)
			Snap('#svg1').selectAll('line')[ran].attr({opacity:0})
		let l = 10;
		let x = l* Math.sin(this.deg/180*Math.PI);
		let y = -l* Math.cos(this.deg/180*Math.PI);
		console.log();
		this.m.add(1,0,0,1,x,y);
		this.line_m.add(1,0,0,1,x,y);
		Snap('#svg_10').transform(this.m.toTransformString());
			Snap('#svg1').selectAll('line').forEach((a)=>{
				a.transform(this.line_m.toTransformString());
			});

			let str = this.plane.getAttribute('transform')+" rotate("+(this.deg)+", "+this.planeX +" "+this.planeY+")";
			this.plane.setAttribute('transform',str)
			let line = document.getElementsByTagName('line');
			// console.log(last.x,last.y);
			for(let ii =0;ii<line.length;ii++){
				let str1 = line[ii].getAttribute('transform')+" rotate("+(this.deg)+", "+this.line.x +" "+this.line.y+")";
				line[ii].setAttribute('transform',str1)
			}

			setTimeout(()=>{
			Snap('#svg1').selectAll('line').forEach((a,i)=>{
				this['p'+i]=a.attr({
					opacity:0
				});
			});
			}, 30);
	}
	flyRight() {

		this.deg += 5;

		Snap('#svg_10').transform(this.m.toTransformString());
			Snap('#svg1').selectAll('line').forEach((a)=>{
				a.transform(this.line_m.toTransformString());
			});

		console.log(this.plane.getAttribute('transform'));
		let str = this.plane.getAttribute('transform')+" rotate("+(this.deg)+", "+this.planeX +" "+this.planeY+")";
		this.plane.setAttribute('transform',str)
		let line=document.getElementsByTagName('line');
		for(let ii =0;ii<line.length;ii++){
			let str1 = line[ii].getAttribute('transform')+" rotate("+(this.deg)+", "+this.line.x +" "+this.line.y+")";
			line[ii].setAttribute('transform',str1)
		}
		console.log(this.deg);
	}

	flyLeft() {


		this.deg -= 5;

		Snap('#svg_10').transform(this.m.toTransformString());
			Snap('#svg1').selectAll('line').forEach((a)=>{
				a.transform(this.line_m.toTransformString());
			});



		let str = this.plane.getAttribute('transform')+" rotate("+(this.deg)+", "+this.planeX +" "+this.planeY+")";
		this.plane.setAttribute('transform',str)
		let line=document.getElementsByTagName('line');
		for(let ii =0;ii<line.length;ii++){
			let str1 = line[ii].getAttribute('transform')+" rotate("+(this.deg)+", "+this.line.x +" "+this.line.y+")";
			line[ii].setAttribute('transform',str1)
		}

		console.log(this.deg);
	}
	
	startLoad(){
		 let d = this.position;
		 	Snap.animate(-150,100,(value)=>{
		 			Snap('#svg_10').transform(new Snap.Matrix(1,0,0,1,value,value))
		 	},1000,mina.easein,()=>{
		 		this.position.x+=Snap('#svg_10').matrix.e;
		 		this.position.y+=Snap('#svg_10').matrix.f;
		 		this.line = {
		 			x: this.position.x,
		 			y: this.position.y
		 		}
		 		this.m=Snap('#svg_10').matrix;
		 		this.p1 = Snap('#svg1').paper.line(d.x, d.y+13,d.x,d.y+30).attr({
			    stroke: "#f00",
			    strokeWidth: 6,
			    opacity: 0
			});
				this.p2 = Snap('#svg1').paper.line(d.x+5,d.y+13,d.x+5,d.y+30).attr({
			    stroke: "#f00",
			    strokeWidth: 6	,
			    opacity: 0

			});
				this.p3=Snap('#svg1').paper.line(d.x-5,d.y+13,d.x-5,d.y+25).attr({
			    stroke: "#f00",
			    strokeWidth: 3,
			    opacity:0	

			});

			this.p1.transform(this.line_m.toTransformString());
			this.p2.transform(this.line_m.toTransformString());
			this.p3.transform(this.line_m.toTransformString());
		 	})

			
		 }

	test(x,y) {
		Snap('#svg1').paper.circle(x, y, 5);
	}
	randomHexColor() { //随机生成十六进制颜色
		    var hex = Math.floor(Math.random() * 16777216).toString(16); //生成ffffff以内16进制数
		    while (hex.length < 6) { //while循环判断hex位数，少于6位前面加0凑够6位
		        hex = '0' + hex;
		    }
		    return '#' + hex; //返回‘#'开头16进制颜色
		}


}
var planeState=1;//state.选择样式
var planeClass='plane1';//定义一个svg class名称
var plane =new Plane(planeClass);
	plane.choiceStyle(planeState);
	plane.startLoad()
	// setTimeout(()=>{
	// 	plane.flywait(350, 15,-10,10,2);
	// 	plane.flywait(800, 600,-10,10,2);
	// 	setTimeout(()=>{plane.flywait(300,500,10,10,2)},1000);
	// },1500);

document.onkeydown =  function(event){
	if (event.keyCode==37)//左 
		plane.flyLeft(); 
	if (event.keyCode==38)//上
		plane.flyFront();
	if (event.keyCode==39)//右 
		plane.flyRight(); 
};
	
	

