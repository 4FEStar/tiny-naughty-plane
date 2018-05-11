class Sign{
    constructor(){
        this.hiddenTypes = ['BR','HR'];
        this.ignoredTypes =  ['HTML','HEAD','BODY','SCRIPT','TITLE','META','STYLE','LINK'];
        this.enemies = [];
        this.enemy();        
    }
    enemy(){
        let all = document.body.getElementsByTagName('*');
        let that = this;
        for(let i = 0,el;el = all[i];i++){
            if(this.index(this.ignoredTypes, el.tagName.toUpperCase()) == -1 && el.prefix != 'g_vml_' && this.hasOnlyTextualChildren(el) && el.offsetHeight > 0 ) {
                this.enemies.push(el);
            }
        }
        // this.enemies.forEach(function(el){
        //     that.addClass(el,'blink');
        // })
        // this.addStylesheet('.blink','outline:4px dotted red');
        return this.enemies;
    }
    // addStylesheet(selector,rules){
    //     var stylesheet = document.createElement('style');
    //     stylesheet.type = 'text/css';
    //     stylesheet.rel = 'stylesheet';
    //     stylesheet.id = 'PLANE';
    //     try {
    //         stylesheet.innerHTML = selector + "{" + rules + "}";
    //     } catch ( e ) {
    //         stylesheet.styleSheet.addRule(selector, rules);
    //     }
    //     document.getElementsByTagName("head")[0].appendChild(stylesheet);
    // }
    // addClass(element, className){
    //     if ( element.className.indexOf(className) == -1)
    //         element.className = (element.className + ' ' + className).replace(/\s+/g, ' ').replace(/^\s+|\s+$/g, '');
    // }
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
}
var sign = new Sign();
console.log(sign.enemies);