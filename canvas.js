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
		let d=Snap.path.getBBox(Snap('#svg_10').attr('d'));
		this.position={
			x:d.cx,
			y:d.cy
		}
		this.planeX=this.position.x
		this.planeY=this.position.y
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
			if(this.timer){clearInterval(this.timer)}
		console.log(Math.atan(x1/y1)*180/Math.PI);
		let v = {
			x: x - this.position.x,
			y: y - this.position.y,
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
		console.log(rad);
		console.log(speed*Math.cos(rad));
		let sx = this.position.x,sy = this.position.y;
		this.test(this.position.x, this.position.y);
		this.test(x,y);
		var i=0;
			this.timer = setInterval(()=>{
			Snap('#svg_10').transform(this.m.toTransformString());
			this.m.add(1,0,0,1,speed*Math.cos(rad),speed*Math.sin(rad));
			this.position = {
				x: this.position.x + speed*Math.cos(rad),
				y: this.position.y + speed*Math.sin(rad)
			}
			i++;
			let str = this.plane.getAttribute('transform')+" rotate("+(deg*i)+", "+this.planeX +" "+this.planeY+")";
			this.plane.setAttribute('transform',str)
			if(Math.abs(this.position.x-sx)>=Math.abs(v.x)&&Math.abs(this.position.y-sy)>=Math.abs(v.y))
				clearInterval(this.timer);
			
		},10);
		
	}
	
	startLoad(){
		 let d = this.position;
		 	Snap.animate(-150,100,(value)=>{
		 			Snap('#svg_10').transform(new Snap.Matrix(1,0,0,1,value,value))
		 	},1000,mina.easein,()=>{

		 		this.position.x+=Snap('#svg_10').matrix.e;
		 		this.position.y+=Snap('#svg_10').matrix.f;
		 		this.m=Snap('#svg_10').matrix;
		 	})
		 }

	test(x,y) {
		Snap('#svg1').paper.circle(x, y, 5);
	}


}
var planeState=1;//state.选择样式
var planeClass='plane1';//定义一个svg class名称
var plane =new Plane(planeClass);
	plane.choiceStyle(planeState);
	plane.startLoad()
	setTimeout(()=>{
		plane.fly(350, 115,1,-3,1);
		plane.fly(100,100,1,1,1);
	},1500);


	
	
	

