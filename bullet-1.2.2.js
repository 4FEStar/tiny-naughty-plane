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

            var svg = Snap("#mysvg");
            this.bullet = svg.paper.circle(this[_x], this[_y], this[_size]).attr({
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
let threeBullet = bulletClass('three');
let pathBullet = bulletClass('path');


// 子弹调用方法：new子弹对象，调用move()方法，结束时调用booom()方法
// let svg = Snap('#mysvg');

// let b1 = new normalBullet(svg, Math.ceil(Math.random() * 1000 + 30), Math.ceil(Math.random() * 700 + 30), {
//     x: Math.ceil(Math.random() * 600 - 600),
//     y: Math.ceil(Math.random() * 600 - 600)
// });

// b1.move();

// setTimeout(() => {
//     b1.booom();
// }, Math.ceil(Math.random() * 1000 + 500));