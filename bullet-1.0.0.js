//为了部分变量和方法私有创建的闭包
function bulletClass(bulletType = 'normal') {
    const _svg = Symbol('svg'),
        _x = Symbol('x'),
        _y = Symbol('y'),
        _v = Symbol('v'),
        _break = Symbol('break'),
        _bullet = Symbol('bullet'),
        _remove = Symbol('remove'),
        _moveone = Symbol('moveone'),
        _destroy = Symbol('destroy');
    // 私有变量和函数，通过 Symbol 创建

    // 子弹基础类，不要修改！不要修改！不要修改！
    class bullet {
        constructor(svg, x, y, v = { x: 300, y: 300 }) {
            this[_svg] = svg;
            this[_x] = x;
            this[_y] = y;
            this[_v] = v;
            this[_bullet] = [];
            this[_bullet][_break] = false;
            this.render();
        }// 构造函数，参数从左到右分别为：svg对象、子弹x坐标、子弹y坐标、子弹速度（水平、竖直速度）

        render() {
            this[_bullet] = this[_svg].paper.circle(this[_x], this[_y], 5).attr({
                fill: "#000"
            });
            console.log('done');
        }// 渲染函数，子弹的样式

        move(fn = null) {

            if (Array.isArray(this[_bullet]))
                this[_bullet].forEach((x) => {
                    this[_moveone](x, fn);
                });
            else if (this[_bullet].node || this[_bullet].type)
                this[_moveone](this[_bullet], fn);
            else
                console.log('move error, bullet is destroied or undefined.');

        }// 子弹向某方向移动

        booom() {
            this[_destroy]();
        }// 子弹爆炸并消失

        get x() {
            if (Array.isArray(this[_bullet]))
                return this[_bullet].map((x) => {
                    x.attr('cx');
                });
            else if (this[_bullet].node || this[_bullet].type)
                return this[_bullet].attr('cx');
            else
                console.error('cannot get x, bullet is destroied or undefined.');
        }// 获取x属性，如果子弹被销毁则不能获取

        get y() {
            if (Array.isArray(this[_bullet]))
                return this[_bullet].map((x) => {
                    x.attr('cy');
                });
            else if (this[_bullet].node || this[_bullet].type)
                return this[_bullet].attr('cy');
            else
                console.error('cannot get y, bullet is destroied or undefined.');
        }// 获取y属性，如果子弹被销毁则不能获取

        set x(val) {
            console.error('WARNING! cannot change position of bullet!');
        }// 不允许通过修改x属性来改变子弹位置

        set y(val) {
            console.error('WARNING! cannot change position of bullet!');
        }// 不允许通过修改y属性来改变子弹位置

        [_moveone](obj, fn) {
            let now = this;

            if (this[_break] === true) {
                return;
            }

            obj.animate({
                cx: now[_x] = now[_x] + now[_v].x / 100,
                cy: now[_y] = now[_y] + now[_v].y / 100
            }, 10, mina.linear, () => {
                if (fn)
                    fn();
                this[_moveone](obj, fn);
            });
        }// 单次小距离子弹运动，私有方法，自行递归，当子弹销毁信号（this[_break]）为false时停止

        [_remove]() {
            if (Array.isArray(this[_bullet]))
                this[_bullet].forEach((x) => {
                    x.remove();
                });
            else if (this[_bullet].node || this[_bullet].type)
                this[_bullet].remove();
            else
                console.log('remove error, bullet is destroied or undefined.');
        }// 移出子弹方法，私有方法

        [_destroy]() {
            this[_break] = true;
            this[_remove]();
        }// 销毁子弹方法，发出子弹销毁信号，并通过remove销毁子弹
    }

    // 通过继承子弹基础类添加不同子弹样式，可重写方法为render、booom
    class normalBullet extends bullet {
        render() {
            this[_bullet] = this[_svg].paper.circle(this[_x], this[_y], 5).attr({
                fill: "#000"
            });
        }// 重写render渲染方法

        booom() {
            this[_destroy]();
            this[_bullet] = Array.from({ length: 10 }).map((a) => {
                return this[_svg].paper.circle(this[_x], this[_y], 3).attr({
                    fill: "#000"
                });
            });
            this[_bullet].forEach((e, i) => {
                let xx = parseInt(e.attr('cx')) + 50 * Math.cos(Math.PI * 2 / 10 * i);
                let yy = parseInt(e.attr('cy')) + 50 * Math.sin(Math.PI * 2 / 10 * i);
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
    }
}

// 新添加的子弹类要在此注册以供使用
let normalBullet = bulletClass('normal');


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