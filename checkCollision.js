function checkCollision(x, y) {
    var oPoint = document.elementFromPoint(x, y);
    var L = Math.floor(oPoint.getBoundingClientRect().left);
    var T = Math.floor(oPoint.getBoundingClientRect().top);
    var R = Math.floor(oPoint.getBoundingClientRect().right);
    var B = Math.floor(oPoint.getBoundingClientRect().bottom);
    if (x == L || x == R || y == T || y == B) {
        return oPoint;
    } else {
        return null;
    }
}