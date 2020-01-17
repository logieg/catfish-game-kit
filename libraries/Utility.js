// CORE UTILITY FUNCTIONS
//  - Update 9 [6/7/18]
//    Added setStyle() - needs testing
//    UPDATE NOT FINISHED
//  - Update 8 [6/8/17]
//    Added chance()
//    Added clone()
//    Removed sigfig functions (honestly they don't have much purpose)

// TODO - add some basic documentation for this mess of functions

function gid(id) {return document.getElementById(id);}
function loadScript(src,callback) {
    var elem = document.createElement("script");
    elem.src = src;
    document.body.appendChild(elem);
	// TODO - investigate whether setting an onload for the elem itself is more plausible
    if (callback != undefined) {document.body.onload = function() {callback.call(); document.body.onload = undefined;};}
}
function loadScriptToHead(src) {
    var elem = document.createElement("script");
    elem.src = src;
    document.getElementsByTagName("head")[0].appendChild(elem);
}
Array.prototype.remove = function(value) {
    var index = this.indexOf(value);
    if (index != -1) {
        return this.splice(index, 1); // returns the removed element if successful
    }
    return false; // if it fails
};
function disableContextMenu() {document.addEventListener("contextmenu",function(e){e.preventDefault();});}
Math.randomRange = function(min, max) {
    if ((min!=undefined) && (max!=undefined)) {
        return (min + Math.floor(Math.random() * (max - min + 1)));
    } else if (min!=undefined) {
        return (Math.floor(Math.random() * min + 1))
    } else {
        return (Math.floor(Math.random() * 101));
    }
};
String.prototype.capitalizeFirstLetter = function(){
    return this.charAt(0).toUpperCase() + this.slice(1);
};
function chance(likelihood){ // returns true if the "dice" was rolled as a 0 (likelihood is out of how much the chance is)
    if(likelihood==undefined){if(Math.floor(Math.random()*2)==0){return true;}else{return false;}} // 50% / 1 in 2 chance (default)
    else{if(Math.floor(Math.random()*likelihood)==0){return true;}else{return false;}}
};
function clone(obj) {
    // code from https://stackoverflow.com/questions/728360/how-do-i-correctly-clone-a-javascript-object
    if (null == obj || "object" != typeof obj) return obj;
    var copy = obj.constructor();
    for (var attr in obj) {
        if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
    }
    return copy;
};
function setStyle(id, styles) {
	// TODO - test this and confirm with that online source (now where'd I put that url...?)
	Object.assign(gid(id).style, styles);
};



//------------------//
// FUNCTION LISTING //
//------------------//

/*
    gid(String id)
    loadScript(String src, function callback)
    loadScriptToHead(String src)
    Array.remove(Object value)
    disableContextMenu()
    Math.randomRange(int min, int max)
    String.capitalizeFirstLetter()
    chance(int likelihood)
    clone(object)
*/
