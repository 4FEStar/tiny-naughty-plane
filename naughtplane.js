; (function () {
    const APPNAME = 'NAUGHTY_PLANE';

    // 工具集
    const util = {
        // 给定x,y获取该点是否在某元素的边界
        checkCollision(x, y) {
            var oPoint = document.elementFromPoint(x, y);

            var L = Math.floor(oPoint.getBoundingClientRect().left);
            var T = Math.floor(oPoint.getBoundingClientRect().top);
            var R = Math.floor(oPoint.getBoundingClientRect().right);
            var B = Math.floor(oPoint.getBoundingClientRect().bottom);
            console.log(oPoint, L,T,R,B,x,y )
            if (x == L || x == R || y == T || y == B) {
                return oPoint;
            } else {
                return null;
            }
        },

        // 初始化SVG
        initSVG() {
            let svg = Snap(`#${APPNAME}`);
            if (svg) { return svg; }

            let W = (document.clientWidth || window.innerWidth || document.documentElement.clientWidth);
            let H = (document.clientHeight || window.innerHeight || document.documentElement.clientHeight);

            let svgDom = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            svgDom.id = APPNAME;

            document.body.appendChild(svgDom);

            svg = Snap(`#${APPNAME}`)
                .attr({
                    width: W,
                    height: H,
                    style: 'position:fixed;top:0;left:0;right:0;bottom:0;'
                });

            return svg
        }
    }

    class Plane {
        constructor(type, svg) {
            this.svg = svg;
            this.plane = `<path class=${type} id="svg_10" d="M115.58203401879454,83.58500375350157 C115.25744718529437,83.58500375350157 114.96866549715301,83.71369803542137 114.72500838691455,83.94713854472317 C114.48155733448183,84.18038706752206 114.28018786489227,84.51461345436746 114.11262124158664,84.93202528077225 C113.77753482629544,85.76673333961472 113.57141041675119,86.93930849269088 113.4586614137518,88.34357617324976 C113.34613407899772,89.74514197046723 113.3271705167614,91.37713579768076 113.37392066179328,93.12415265855556 C109.36447599087111,94.71283995977781 101.23257539063991,97.99305298656 100.57933156164266,98.72545535847946 C99.70961256083582,99.70056586038656 99.99061712788249,100.81809717654382 100.34109127400586,101.55996016081669 L113.70969185504265,98.93190517898894 C113.99227411720243,102.35671017627872 114.39406498233926,105.74879906531478 114.74419361739582,108.40676071940644 C113.43682553059782,108.77632166915663 110.996393446114,109.50603421971368 110.49265808369279,109.9585393694387 C109.79871991959955,110.58190245454622 109.79872512307972,112.59503874187212 109.79872512307972,112.59503874187212 L115.2702435831238,112.16521815436428 C115.39910984484052,113.03298005687716 115.47970030121134,113.53931379911671 115.47970030121134,113.53931379911671 L115.48769596846321,113.58500457632987 L115.53086820069898,113.58500457632987 L115.63159820576911,113.58500457632987 L115.67476939730841,113.58500457632987 L115.68276506456041,113.53931379911671 C115.68276506456041,113.53931379911671 115.76320253862188,113.03297101039281 115.89222074195213,112.16521815436428 L121.36533875172492,112.59503874187212 C121.36533875172492,112.59503874187212 121.36534499590098,110.58190245454622 120.67140475041603,109.9585393694387 C120.16748102202195,109.50585932101501 117.72526726601154,108.77449226897737 116.41826966698424,108.40505797000962 C116.76767501833122,105.75525322935246 117.16875716950256,102.37614403510105 117.45117396100034,98.9623727332857 L130.6630852731656,101.55995915565155 C131.01355525650493,100.81809617137873 131.29616665815246,99.70056485522151 130.4264455759536,98.72545435331433 C129.78128275127872,98.00211655876497 121.84588012273184,94.79486041317953 117.78695139842603,93.18506665868507 C117.83544783132035,91.41540644735569 117.81762174979528,89.76117234082557 117.70380707410752,88.34357516808467 L117.70380707410752,88.34019077775369 C117.5910008328296,86.9374720563575 117.38465683643275,85.76603877064562 117.04985036836105,84.93202427560685 C116.88233161707068,84.51472804316974 116.6826012436579,84.18046748071713 116.4390627727619,83.94713753955767 C116.1954035811319,83.7136970302567 115.90662501507859,83.58500274833648 115.58204026297042,83.58500274833648 L115.58203401879454,83.58500375350157 z" fill-opacity="null" stroke-opacity="null" stroke-width="1.5" stroke="#000" fill="#FFAFCC"/>`
            // console.log(svg);
            svg.node.innerHTML = this.plane;

            this.plane = document.getElementById('svg_10')
            this.m = new Snap.Matrix(1, 0, 0, 1, 0, 0);
            let d = Snap.path.getBBox(Snap('#svg_10').attr('d'));
            this.position = {
                x: d.cx,
                y: d.cy
            }
            this.planeX = this.position.x;
            this.planeY = this.position.y;
            this.planeClass = type;
        }//画布样式和飞机模型
        createStyle(planeClass, bgColor, border) {
            var style = document.createElement('style');
            style.innerHTML = `.${planeClass}{fill:${bgColor}; stroke:${border}}`
            document.head.appendChild(style);
        }//自定义飞机style
        choiceStyle(planeState) {

            switch (planeState) {
                case 1:
                    this.createStyle(this.planeClass, '#cccccc', '#000000');
                    break;
                case 2:
                    this.createStyle(this.planeClass, '#AE2323', '#BE8D9A');
                    break;
                case 3:
                    this.createStyle(this.planeClass, '#1BEFCF', '#680A23');
                    break;  
                case 4:
                    this.createStyle(this.planeClass, '#9AF312', '#DE1147');
                    break;
            }
        }//固定css class 升级样式
        fly(x, y, x1, y1, speed = 1) {//x,y要去的坐标 x1,y1是要去的坐标向量

            console.log('fly:',x,y,x1,y1);
            //start
            let v = {
                x: x - this.position.x,
                y: y - this.position.y
            }
            let deg = (Math.atan2(y1, x1) - Math.atan2(-1, 0)) * 180 / Math.PI;
            if (deg > 180) {
                deg = deg - 360;
            }
            let rad = Math.atan2(v.y, v.x) - Math.atan2(0, 1);
            let sx = this.position.x, sy = this.position.y;
            Snap('#svg_10').transform(this.m.toTransformString());
                this.m.add(1, 0, 0, 1, v.x*1.5, v.y*1.5);
                // this.m.add(1, 0, 0, 1, speed * Math.cos(rad), speed * Math.sin(rad));
                // this.position = {
                //     x: this.position.x + speed * Math.cos(rad),
                //     y: this.position.y + speed * Math.sin(rad)
                // }
                this.position = {
                     x: x,
                     y: y
                }
                let str = this.plane.getAttribute('transform') + " rotate(" + (deg) + ", " + this.planeX + " " + this.planeY + ")";
                this.plane.setAttribute('transform', str);
            //end
            /*
            if (this.timer) { clearInterval(this.timer) }
            // console.log(Math.atan(x1 / y1) * 180 / Math.PI);
            let v = {
                x: x - this.position.x,
                y: y - this.position.y,
            }
            let len = Math.sqrt(v.x ** 2 + v.y ** 2);
            // let deg=Math.atan(x1/y1)*180/Math.PI/(len/speed);
            let deg = (Math.atan2(y1, x1) - Math.atan2(-1, 0)) * 180 / Math.PI;
            // console.log(Math.acos((x1*0+y1*-1)/(Math.sqrt(x1 ** 2+y1 ** 2)*Math.sqrt(0 ** 2+(-1) ** 2)))*180/Math.PI);
            // console.log((Math.atan2(y1,x1) - Math.atan2(-1,0))*180/Math.PI);
            if (deg > 180) {
                deg = deg - 360;
            }
            deg = deg / (len / speed);
            let rad = Math.atan2(v.y, v.x) - Math.atan2(0, 1)
            // console.log(rad);
            // console.log(speed * Math.cos(rad));
            let sx = this.position.x, sy = this.position.y;

            var i = 0;
            this.timer = setInterval(() => {
                Snap('#svg_10').transform(this.m.toTransformString());
                this.m.add(1, 0, 0, 1, speed * Math.cos(rad), speed * Math.sin(rad));
                this.position = {
                    x: this.position.x + speed * Math.cos(rad),
                    y: this.position.y + speed * Math.sin(rad)
                }
                i++;
                let str = this.plane.getAttribute('transform') + " rotate(" + (deg * i) + ", " + this.planeX + " " + this.planeY + ")";
                this.plane.setAttribute('transform', str)
                if (Math.abs(this.position.x - sx) >= Math.abs(v.x) && Math.abs(this.position.y - sy) >= Math.abs(v.y))
                    clearInterval(this.timer);

            }, 10); */

        }

        startLoad() {
            let d = this.position;
            Snap.animate(-150, 100, (value) => {
                Snap('#svg_10').transform(new Snap.Matrix(1, 0, 0, 1, value, value))
            }, 1000, mina.easein, () => {

                this.position.x += Snap('#svg_10').matrix.e;
                this.position.y += Snap('#svg_10').matrix.f;
                this.m = Snap('#svg_10').matrix;
            })
        }
    }

    function randomHexColor() { //随机生成十六进制颜色
        var hex = Math.floor(Math.random() * 16777216).toString(16); //生成ffffff以内16进制数
        while (hex.length < 6) { //while循环判断hex位数，少于6位前面加0凑够6位
            hex = '0' + hex;
        }
        return '#' + hex; //返回‘#'开头16进制颜色
    }
    
    //为了部分变量和方法私有创建的闭包
    function bulletClass(bulletType = 'normal') {
        const _svg = Symbol('svg'),
            _x = Symbol('x'),
            _y = Symbol('y'),
            _v = Symbol('v'),
            _m = Symbol('m'),
            _size = Symbol('size'),
            // _bullet = Symbol('bullet'),
            _remove = Symbol('remove'),
            _moveone = Symbol('moveone'),
            _makebreak = Symbol('makebreak'),
            _tobreak = Symbol('tobreak'),
            _destroy = Symbol('destroy');
        // 私有变量和函数，通过 Symbol 创建
    
        // 子弹基础类，不要修改！不要修改！不要修改！
        class bullet {
            constructor(svg, x, y, v = { x: 1, y: 1 }, size = 3) {
                this[_svg] = svg;
                this[_x] = x;
                this[_y] = y;
                this[_v] = [];
                this[_m] = [];
                this[_size] = size;
                v = {
                    x: v.x * 100,
                    y: v.y * 100
                };// 乘数为每秒行进距离
                this[_v][0] = v;
                this.bullet = [];
                this.render();
            }// 构造函数，参数从左到右分别为：svg对象、子弹x坐标、子弹y坐标、子弹速度（水平、竖直速度）
    
            render() {
                this.bullet = this[_svg].paper.circle(this[_x], this[_y], this[_size]).attr({
                    fill: "#000"
                });
                this[_m][0] = new Snap.Matrix(1, 0, 0, 1, this[_v][0].x / 100, this[_v][0].y / 100);
                this[_makebreak]();
            }// 渲染函数，子弹的样式
    
            move(fn = null) {
    
                if (Array.isArray(this.bullet))
                    this.bullet.forEach((x, i) => {
                        console.log(i);
    
                        this[_moveone](x, fn, i);
                    });
                else if (this.bullet.node || this.bullet.type)
                    this[_moveone](this.bullet, fn);
                else
                    console.log('move error, bullet is destroied or undefined.');
    
            }// 子弹向某方向移动
    
            booom() {
                this[_destroy]();
            }// 子弹爆炸并消失
    
            get x() {
                function getx(obj, bb, i = 0) {
                    if (bb.type !== 'path')
                        return bb.getBBox().cx;
                    else if (bb.node || bb.type)
                        return Snap.path.getBBox(bb.attr('d')).cx + obj[_m][i].e;
                    else {
                        console.error('cannot get x, bullet is destroied or undefined.');
                        return undefined;
                    }
                }
                if (Array.isArray(this.bullet))
                    return this.bullet.map((x, i) => {
                        return getx(this, x, i);
                    });
                else
                    return getx(this, this.bullet);
            }// 获取x属性，如果子弹被销毁则不能获取
    
            get y() {
                function gety(obj, bb, i = 0) {
                    if (bb.type !== 'path')
                        return bb.getBBox().cy;
                    else if (bb.node || bb.type)
                        return Snap.path.getBBox(bb.attr('d')).cy + obj[_m][i].f;
                    else {
                        console.error('cannot get y, bullet is destroied or undefined.');
                        return undefined;
                    }
                }
                if (Array.isArray(this.bullet))
                    return this.bullet.map((x, i) => {
                        return gety(this, x, i);
                    });
                else
                    return gety(this, this.bullet);
            }// 获取y属性，如果子弹被销毁则不能获取
    
            set x(val) {
                console.error('WARNING! cannot change position of bullet!');
            }// 不允许通过修改x属性来改变子弹位置
    
            set y(val) {
                console.error('WARNING! cannot change position of bullet!');
            }// 不允许通过修改y属性来改变子弹位置
    
            [_moveone](obj, fn, i = 0) {
    
                if (obj.break === true) {
                    return;
                }
    
                setTimeout(() => {
                    obj.transform(this[_m][i].toTransformString());
                    this[_m][i].add(1, 0, 0, 1, this[_v][i].x / 100, this[_v][i].y / 100);
                    if (fn)
                        fn();
                    this[_moveone](obj, fn, i);
                }, 10);
            }// 单次小距离子弹运动，私有方法，自行递归，当子弹销毁信号（this.break）为false时停止
    
            [_remove]() {
                if (Array.isArray(this.bullet))
                    this.bullet.forEach((x) => {
                        x.remove();
                    });
                else if (this.bullet.node || this.bullet.type)
                    this.bullet.remove();
                else
                    console.log('remove error, bullet is destroied or undefined.');
            }// 移出子弹方法，私有方法
    
            [_makebreak]() {
                if (Array.isArray(this.bullet)) {
    
                    this.bullet.forEach((x) => {
                        x.break = false;
                    });
                }
                else if (this.bullet.node || this.bullet.type)
                    this.bullet.break = false;
                else
                    console.log('remove error, bullet is destroied or undefined.');
            }
    
            [_tobreak]() {
    
                if (this.bullet.node || this.bullet.type)
                    this.bullet.break = true;
                else if (Array.isArray(this.bullet))
                    this.bullet.forEach((x) => {
                        x.break = true;
                    });
                else
                    console.log('remove error, bullet is destroied or undefined.');
            }
    
            [_destroy]() {
                this[_tobreak]();
                this[_remove]();
            }// 销毁子弹方法，发出子弹销毁信号，并通过remove销毁子弹
        }
    
        // 通过继承子弹基础类添加不同子弹样式，可重写方法为render、booom
        class normalBullet extends bullet {
            render() {
    
                var svg = Snap(`#${APPNAME}`);
                this.bullet = svg.circle(this[_x], this[_y], this[_size]).attr({
                    fill: "#000"
                });
                this[_m][0] = new Snap.Matrix(1, 0, 0, 1, this[_v][0].x / 100, this[_v][0].y / 100);
                this[_makebreak]();
    
            }// 重写render渲染方法，生成的每个子弹一定要加上break属性
    
            booom() {
                let bux = this.x,
                    buy = this.y;
    
                this[_destroy]();
    
                this.bullet = Array.from({ length: 10 }).map((a) => {
                    return this[_svg].paper.circle(bux, buy, 3).attr({
                        fill: randomHexColor()
                    });
                });
    
                this.bullet.forEach((e, i) => {
                    let nowx = parseInt(e.getBBox().x + e.getBBox().x2) / 2;
                    let nowy = parseInt(e.getBBox().y + e.getBBox().y2) / 2;
                    let xx = nowx + 50 * Math.cos(Math.PI * 2 / 10 * i);
                    let yy = nowy + 50 * Math.sin(Math.PI * 2 / 10 * i);
                    e.animate({
                        cx: xx,
                        cy: yy
                    }, 100, mina.linear, () => {
                        e.remove();
                    });
                });
    
            }// 重写子弹爆炸时效果、再写样式前一定调用this[_destroy]方法销毁子弹
        }
    
        //一次发射三颗子弹
        class threeBullet extends bullet {
            render() {
    
                this.bullet = Array.from({ length: 3 }).map((a, i) => {
                    this[_v][i] = {
                        /* jshint ignore:start */
                        x: Math.sqrt(this[_v][0].x ** 2 + this[_v][0].y ** 2) * Math.cos(i * Math.PI * 2 / 12),
                        y: Math.sqrt(this[_v][0].x ** 2 + this[_v][0].y ** 2) * Math.sin(i * Math.PI * 2 / 12)
                        /* jshint ignore:end */
                    };
    
                    this[_m][i] = new Snap.Matrix(1, 0, 0, 1, this[_v][0].x / 100, this[_v][0].y / 100);
    
                    console.log(this[_v]);
    
                    return this[_svg].paper.circle(this[_x] + i * 20, this[_y], this[_size]).attr({
                        fill: "#000"
                    });
                });
                this[_makebreak]();
    
            }// 重写render渲染方法，生成的每个子弹一定要加上break属性
    
            booom() {
                let bux = this.x,
                    buy = this.y;
    
                this[_destroy]();
    
                this.bullet = [];
                bux.forEach((x, i) => {
                    this.bullet[i] = Array.from({ length: 10 }).map((a) => {
                        return this[_svg].paper.circle(bux[i], buy[i], 3).attr({
                            fill: randomHexColor()
                        });
                    });
    
                    this.bullet[i].forEach((e, i) => {
                        let nowx = parseInt(e.getBBox().x + e.getBBox().x2) / 2;
                        let nowy = parseInt(e.getBBox().y + e.getBBox().y2) / 2;
                        let xx = nowx + 35 * Math.cos(Math.PI * 2 / 10 * i);
                        let yy = nowy + 35 * Math.sin(Math.PI * 2 / 10 * i);
                        e.animate({
                            cx: xx,
                            cy: yy
                        }, 150, mina.linear, () => {
                            e.remove();
                        });
                    });
                });
    
            }// 重写子弹爆炸时效果、再写样式前一定调用this[_destroy]方法销毁子弹
        }
    
        // 使用 path 元素的子弹
        class pathBullet extends bullet {
            render() {
    
                var svg = Snap("#mysvg");
                this.bullet = svg.paper.path('M115.58203401879454,83.58500375350157 C115.25744718529437,83.58500375350157 114.96866549715301,83.71369803542137 114.72500838691455,83.94713854472317 C114.48155733448183,84.18038706752206 114.28018786489227,84.51461345436746 114.11262124158664,84.93202528077225 C113.77753482629544,85.76673333961472 113.57141041675119,86.93930849269088 113.4586614137518,88.34357617324976 C113.34613407899772,89.74514197046723 113.3271705167614,91.37713579768076 113.37392066179328,93.12415265855556 C109.36447599087111,94.71283995977781 101.23257539063991,97.99305298656 100.57933156164266,98.72545535847946 C99.70961256083582,99.70056586038656 99.99061712788249,100.81809717654382 100.34109127400586,101.55996016081669 L113.70969185504265,98.93190517898894 C113.99227411720243,102.35671017627872 114.39406498233926,105.74879906531478 114.74419361739582,108.40676071940644 C113.43682553059782,108.77632166915663 110.996393446114,109.50603421971368 110.49265808369279,109.9585393694387 C109.79871991959955,110.58190245454622 109.79872512307972,112.59503874187212 109.79872512307972,112.59503874187212 L115.2702435831238,112.16521815436428 C115.39910984484052,113.03298005687716 115.47970030121134,113.53931379911671 115.47970030121134,113.53931379911671 L115.48769596846321,113.58500457632987 L115.53086820069898,113.58500457632987 L115.63159820576911,113.58500457632987 L115.67476939730841,113.58500457632987 L115.68276506456041,113.53931379911671 C115.68276506456041,113.53931379911671 115.76320253862188,113.03297101039281 115.89222074195213,112.16521815436428 L121.36533875172492,112.59503874187212 C121.36533875172492,112.59503874187212 121.36534499590098,110.58190245454622 120.67140475041603,109.9585393694387 C120.16748102202195,109.50585932101501 117.72526726601154,108.77449226897737 116.41826966698424,108.40505797000962 C116.76767501833122,105.75525322935246 117.16875716950256,102.37614403510105 117.45117396100034,98.9623727332857 L130.6630852731656,101.55995915565155 C131.01355525650493,100.81809617137873 131.29616665815246,99.70056485522151 130.4264455759536,98.72545435331433 C129.78128275127872,98.00211655876497 121.84588012273184,94.79486041317953 117.78695139842603,93.18506665868507 C117.83544783132035,91.41540644735569 117.81762174979528,89.76117234082557 117.70380707410752,88.34357516808467 L117.70380707410752,88.34019077775369 C117.5910008328296,86.9374720563575 117.38465683643275,85.76603877064562 117.04985036836105,84.93202427560685 C116.88233161707068,84.51472804316974 116.6826012436579,84.18046748071713 116.4390627727619,83.94713753955767 C116.1954035811319,83.7136970302567 115.90662501507859,83.58500274833648 115.58204026297042,83.58500274833648 L115.58203401879454,83.58500375350157 z');
                this[_m][0] = new Snap.Matrix(1, 0, 0, 1, this[_v][0].x / 100, this[_v][0].y / 100);
                this[_makebreak]();
    
            }// 重写render渲染方法，生成的每个子弹一定要加上break属性
    
            booom() {
                let bux = this.x,
                    buy = this.y;
    
                this[_destroy]();
    
                this.bullet = Array.from({ length: 10 }).map((a) => {
                    return this[_svg].paper.circle(bux, buy, 3).attr({
                        fill: randomHexColor()
                    });
                });
    
                this.bullet.forEach((e, i) => {
                    let nowx = parseInt(e.getBBox().x + e.getBBox().x2) / 2;
                    let nowy = parseInt(e.getBBox().y + e.getBBox().y2) / 2;
                    let xx = nowx + 50 * Math.cos(Math.PI * 2 / 10 * i);
                    let yy = nowy + 50 * Math.sin(Math.PI * 2 / 10 * i);
                    e.animate({
                        cx: xx,
                        cy: yy
                    }, 100, mina.linear, () => {
                        e.remove();
                    });
                });
    
            }// 重写子弹爆炸时效果、再写样式前一定调用this[_destroy]方法销毁子弹
        }
    
        // 添加子弹新样式类时一定要添加类名case，以此方式把类送出闭包
        switch (bulletType) {
            case 'normal':
                return normalBullet;
            case 'three':
                return threeBullet;
            case 'path':
                return pathBullet;
        }
    }

    // 新添加的子弹类要在此注册以供使用
    let normalBullet = bulletClass('normal');

    // 事件处理
    // cbs.pos() 传入位置， cbs.fire()
    function eventBind(pos, cbs) {
        //兼容事件处理
        let EventUtil = {
            addHandler: function (element, type, handler) {
                if (typeof addEventListener == 'function') {
                    element.addEventListener(type, handler, false);
                } else if (typeof attachEvent == 'function') {
                    element.attachEvent('on' + type, handler);
                } else {
                    element['on' + type] = handler;
                }
            },
            removeHandler: function (element, type, handler) {
                if (typeof removeEventListener == 'function') {
                    element.removeEventListener(type, handler, false);
                } else if (typeof detachEvent == 'function') {
                    element.detachEvent('on' + type, handler);
                } else {
                    element['on' + type] = null;
                }
            },
            getEvent: function (event) {
                return event ? event : window.event;
            },
            getTarget: function (event) {
                return event.target || event.srcElement;
            },
            preventDefault: function (event) {
                if (typeof event.preventDefault == 'function') {
                    event.preventDefault();
                } else {
                    event.returnValue = false;
                }
            },
            stopPropagation: function (event) {
                if (typeof event.stopPropagation == 'function') {
                    event.stopPropagation();
                } else {
                    event.cancelBubble = true;
                }
            }
        };

        bindEvents(pos, cbs);

        function bindEvents(o, cbs) {
            var x = o.x,
                y = o.y,
                dir = {},
                vel = { x: 0, y: 0 },
                angle;

            o.keysPressed = {};
            // o.del = { x: 1, y: 1 };

            var acc = 30;
            var maxSpeed = 90;
            var rotSpeed = 360;
            var tDelta = 80 / 1000;

            //事件绑定
            EventUtil.addHandler(document, 'keydown', eventKeydown);
            EventUtil.addHandler(document, 'keypress', eventKeypress);
            EventUtil.addHandler(document, 'keyup', eventKeyup);

            //事件处理函数
            function eventKeydown(event) {
                x = o.x;
                y = o.y;
                dir.x = o.del.x;
                dir.y = o.del.y;

                //处理事件相关
                var event = EventUtil.getEvent(event);
                if (event.ctrlKey || event.shiftKey) {
                    return;
                }
                o.keysPressed[event.keyCode] = true;
                switch (event.keyCode) {
                    case code(' '):
                        // o.firedAt = 1;
                        cbs.fire(x, y, dir, angle);
                        break;
                };
                if (indexOf([code('up'), code('down'), code('right'), code('left'), code(' '), code('B'), code('W'), code('A'), code('S'), code('D')], event.keyCode) != -1) {
                    if (event.ctrlKey || event.shiftKey)
                        return;
                    EventUtil.preventDefault(event);
                    EventUtil.stopPropagation(event);
                }

                //滑动
                if ((o.keysPressed[code('up')]) || o.keysPressed[code('W')]) {
                    //处理速度
                    vel.x += dir.x * acc * tDelta;
                    vel.y += dir.y * acc * tDelta;

                    if (quickerSpeed(vel.x, vel.y) > maxSpeed) {
                        var l = quickerSpeed(vel.x, vel.y);
                        if (l) {
                            vel.x = vel.x * (maxSpeed / l);
                            vel.y = vel.y * (maxSpeed / l);
                        } else {
                            vel.x = vel.y = maxSpeed;
                        }
                    }
                    console.log("press: " + vel.x);
                    x += vel.x * tDelta;
                    y += vel.y * tDelta;
                    // x = x;
                    // y = y;
                } 

                if ((o.keysPressed[code('left')]) || o.keysPressed[code('A')]) {
                    console.log("dir: "+dir.x);
                    angle = radians(rotSpeed * tDelta * -1);
                    dir.x = rotateX(dir.x, dir.y, angle);
                    dir.y = rotateY(dir.x, dir.y, angle);
                }//dir

                if ((o.keysPressed[code('right')]) || o.keysPressed[code('D')]) {
                    angle = radians(rotSpeed * tDelta);
                    dir.x = rotateX(dir.x, dir.y, angle);
                    dir.y = rotateY(dir.x, dir.y, angle);
                    console.log("dir: ")
                }//dir

                cbs.pos(x, y, dir, angle);
            }

            function eventKeypress(event) {
                var event = EventUtil.getEvent(event);
                if (indexOf([code('up'), code('down'), code('right'), code('left'), code(' '), code('W'), code('A'), code('S'), code('D')], event.keyCode || event.which) != -1) {
                    if (event.ctrlKey || event.shiftKey)
                        return;

                    EventUtil.preventDefault(event);
                    EventUtil.stopPropagation(event);
                }
            }

            function eventKeyup(event) {
                // if ((o.keysPressed[code('up')] || (o.keysPressed[code('W')]))) {
                //     var _timer = requestAnimationFrame(() => {
                //         if (vel.x < 0.005 && vel.y < 0.005) {
                //             cancelAnimationFrame(_timer);
                //         }
                //         // x += vel.x * tDelta;
                //         // y += vel.y * tDelta;
                //         x = x;
                //         y = y;
                //         cbs.pos(x, y, dir, angle);
                //         vel.x *= 0.90;
                //         vel.y *= 0.90;
                //         console.log("up: " + vel.x);
                //     });
                // }
                //处理事件
                var event = EventUtil.getEvent(event);
                o.keysPressed[event.keyCode] = false;
                if (indexOf([code('up'), code('down'), code('right'), code('left'), code(' '), code('B'), code('W'), code('A'), code('S'), code('D')], event.keyCode) != -1) {
                    EventUtil.preventDefault(event);
                    EventUtil.stopPropagation(event);
                }
            }
        }

        //辅助函数
        function code(name) {
            var table = { 'up': 38, 'down': 40, 'left': 37, 'right': 39, 'esc': 27 };
            if (table[name]) return table[name];
            return name.charCodeAt(0);
        }

        function indexOf(arr, item, from) {
            return arr.indexOf(item, from);
        }
        function radians(deg) {
            return deg * Math.PI / 180;
        }
        function rotateX(dirX, dirY, angle) {
            return dirX * Math.cos(angle) - Math.sin(angle) * dirY;
        }
        function rotateY(dirX, dirY, angle) {
            return dirX * Math.sin(angle) + Math.cos(angle) * dirY;
        }
        function quickerSpeed(x, y) {
            var l = Math.sqrt(x * x, y * y);
            if (l < 0.005 && l > - 0.005) return 0;
            return l;
        }//某过小范围认为是0
    }

    class Sign{
        constructor(){
            this.hiddenTypes = ['BR','HR'];
            this.ignoredTypes =  ['HTML','HEAD','BODY','SCRIPT','TITLE','META','STYLE','LINK'];
            this.enemies = [];
            this.dying = [];
            this.enemy();        
        }
        enemy(){
            let all = document.body.getElementsByTagName('*');
            for(let i = 0,el;el = all[i];i++){
                if(this.index(this.ignoredTypes, el.tagName.toUpperCase()) == -1  && this.hasOnlyTextualChildren(el) && el.offsetHeight > 0 ) {
                    this.enemies.push(el);
                }
            }
            this.enemies.forEach(function(el){
                el.classList.add('blink');
            })
            // this.addStylesheet('.blink','outline:4px dotted red');
            return this.enemies;
        }
        addStylesheet(selector,rules){
            var stylesheet = document.createElement('style');
            stylesheet.type = 'text/css';
            stylesheet.rel = 'stylesheet';
            stylesheet.id = 'PLANE';
            try {
                stylesheet.innerHTML = selector + "{" + rules + "}";
            } catch ( e ) {
                stylesheet.styleSheet.addRule(selector, rules);
            }
            document.getElementsByTagName("head")[0].appendChild(stylesheet);
        }
        hasOnlyTextualChildren(element){
            if ( element.offsetLeft < -100 && element.offsetWidth > 0 && element.offsetHeight > 0 ) return false;
            if ( this.index(this.hiddenTypes, element.tagName) != -1 ) return true;
            if ( element.offsetWidth == 0 && element.offsetHeight == 0 ) return false;
            for ( var i = 0; i < element.childNodes.length; i++ ) {
                if (
                    this.index(this.hiddenTypes, element.childNodes[i].tagName) == -1
                    && element.childNodes[i].childNodes.length != 0
                ) return false;
            }
            return true;
        }
        index(arr, item, from){
            if ( arr.indexOf ) return arr.indexOf(item, from);
            var len = arr.length;
    
            for (var i = (from < 0) ? Math.max(0, len + from) : from || 0; i < len; i++){
                if (arr[i] === item) return i;
            }
            return -1;
        }
        setDyingInEnemies(murdered){
            murdered.forEach(function(v,i){
                if(v.parentNode){
                    this.dying.push(v.parentNode);//新的待删除dom
                }
                this.enemies.splice(i,0);
            });
            return this.enemies = this.enemies.concat(this.dying);
        }
    }

    class Menu{
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
                document.body.appendChild(this.navigation);
                
    
                // button1
                this.button = document.createElement('button');
                this.button.id = "ASTEROIDS-button1";
                this.button.className = "ASTEROIDSBUTTON"
                this.button.style = `
                    width: 30px;
                    height: 30px;
                    border-radius:15px;
                `
                //在评分条内部添加按钮
                this.button.innerHTML = "P1"
                this.navigation.appendChild(this.button);
    
                // button2
                this.button = document.createElement('button');
                this.button.id = "ASTEROIDS-button2";
                this.button.className = "ASTEROIDSBUTTON"
                this.button.style = `
                    width: 30px;
                    height: 30px;
                    border-radius: 15px;
                `
                //在评分条内部添加按钮
                this.button.innerHTML = "P2"
                this.navigation.appendChild(this.button);
    
    
                // button3
                this.button = document.createElement('button');
                this.button.id = "ASTEROIDS-button3";
                this.button.className = "ASTEROIDSBUTTON"
                this.button.style = `
                    width: 30px;
                    height: 30px;
                    border-radius: 15px;
                `
                //在评分条内部添加按钮
                this.button.innerHTML = "P3"
                this.navigation.appendChild(this.button);
    
    
                // points
                this.points = document.createElement('span');
                this.points.id = 'ASTEROIDS-POINTS';
                this.points.style =`
                    font: 28pt Arial, sans-serif;
                    fontWeight: bold;
                    position: relative;
                    left: 20px;
                `
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

    class TinyNaughtPlane {
        constructor() {
            if (!window[APPNAME]) {
                window[APPNAME] = APPNAME;

                this.svg = util.initSVG();
                this.plane = new Plane('plane1', this.svg);//定义一个飞机 class名称
                this.plane.choiceStyle(1);//state.选择样式
                this.plane.startLoad();
                this.sign = new Sign();

                console.log(this.sign.enemies);
                this.sign.enemies.forEach(e=>{
                    e.style = 'outline:1px solid red;'
                });

                this.menu = new Menu();
                this.init();
            }
        }

        // 初始化依赖库、界面，飞机，绑定事件
        init() {
            let _self = this;
            let planeState = { x: _self.plane.position.x, y: _self.plane.position.y, del:{x: 1, y: 1} };
            console.log('init Plane State:', _self.plane ,planeState);

            eventBind(planeState, {
                pos(x, y, dir, angle) {
                    let newX = (x+dir.x),
                        newY = (y+dir.y);

                    planeState.x = newX;
                    planeState.y = newY;
                    planeState.del.x = dir.x;
                    planeState.del.y = dir.y;

                    console.log('pos', x, y, dir);
                    _self.plane.fly(newX, newY, dir.x, dir.y);

                },
                fire(x, y, dir, angle) {
                    console.log('fire', x, y, dir, angle);
                    let b1 = new normalBullet(_self.svg, x, y, { x: dir.x , y: dir.y });
                    b1.move(()=>{
                        _self.svg.node.style.display = 'none';
                        let cldEle =  util.checkCollision(b1.x, b1.y);
                        // _self.svg.node.style.display = 'initial';

                        // console.log('bullet x y:',b1.x, b1.y, _self.svg.node.style);
                        // console.log('cldEle',cldEle)

                        if( cldEle && _self.sign.enemies.indexOf(cldEle)){
                            b1.booom();
                            cldEle.parentNode.removeChild(cldEle);
                        }
                    });
                    
                }
            });

            
        }

    }

    const snap = document.createElement('script');
    snap.onload = function () {
        console.log('snap load');
        const app = new TinyNaughtPlane();
    }
    snap.src = 'https://cdn.bootcss.com/snap.svg/0.5.1/snap.svg-min.js';
    document.body.appendChild(snap);


}());
