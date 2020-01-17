// KEYBOARDER [rev2]
//   - now with better keycode matrix

/*
HTML CUSTOM IMPLEMENTATION SCRIPT:
(doesn't require Keyboard.init)

<script>
window.addEventListener('keyup', function(event) { Keyboard.onKeyup(event); }, false);
window.addEventListener('keydown', function(event) { Keyboard.onKeydown(event); }, false);
window.onload = function() {
    window.setInterval(function() {
        // detect and act on keys here; example:
        if (Keyboard.isDown(keys.Alt)) {alert("You pressed the alt key!");}
    }, 50);
};
</script>
*/

var Keyboard = {
    _pressed: {},
    isDown: function(keyCode) {
        return this._pressed[keyCode];
    },
    onKeydown: function(event) {
        this._pressed[event.keyCode] = true;
    },
    onKeyup: function(event) {
        delete this._pressed[event.keyCode];
    },
    init: function() {
        window.addEventListener('keyup', function(event) {Keyboard.onKeyup(event);}, false);
        window.addEventListener('keydown', function(event) {Keyboard.onKeydown(event);}, false);
    }
};
var key = {
    'backspace': 8,
    'tab': 9,
    'enter': 13,
    'return': 13,
    'shift': 16,
    'ctrl': 17,
    'control': 17,
    'alt': 18,
    'pause': 19,
    'capslock': 20,
    'caps': 20,
    'esc': 27,
    'escape': 27,
    'space': 32,
    'spacebar': 32,
    'pageup': 33,
    'pgup': 33,
    'pagedown': 34,
    'pgdown': 34,
    'end': 35,
    'home': 36,
    'leftarrow': 37,
    'left': 37,
    'uparrow': 38,
    'up': 38,
    'rightarrow': 39,
    'right': 39,
    'downarrow': 40,
    'down': 40,
    'insert': 45,
    'delete': 46,
    'del': 46,
    '0': 48,
    '1': 49,
    '2': 50,
    '3': 51,
    '4': 52,
    '5': 53,
    '6': 54,
    '7': 55,
    '8': 56,
    '9': 57,
    'a': 65,
    'b': 66,
    'c': 67,
    'd': 68,
    'e': 69,
    'f': 70,
    'g': 71,
    'h': 72,
    'i': 73,
    'j': 74,
    'k': 75,
    'l': 76,
    'm': 77,
    'n': 78,
    'o': 79,
    'p': 80,
    'q': 81,
    'r': 82,
    's': 83,
    't': 84,
    'u': 85,
    'v': 86,
    'w': 87,
    'x': 88,
    'y': 89,
    'z': 90,
    '0numpad': 96,
    '1numpad': 97,
    '2numpad': 98,
    '3numpad': 99,
    '4numpad': 100,
    '5numpad': 101,
    '6numpad': 102,
    '7numpad': 103,
    '8numpad': 104,
    '9numpad': 105,
    'num0': 96,
    'num1': 97,
    'num2': 98,
    'num3': 99,
    'num4': 100,
    'num5': 101,
    'num6': 102,
    'num7': 103,
    'num8': 104,
    'num9': 105,
    'multiply': 106,
    'divide':111,
    'mult': 106,
    'div': 111,
    'numplus': 107,
    'numminus': 109,
    'numdot': 110,
    'numperiod': 110,
    'numslash': 111,
    'F1': 112,
    'F2': 113,
    'F3': 114,
    'F4': 115,
    'F5': 116,
    'F6': 117,
    'F7': 118,
    'F8': 119,
    'F9': 120,
    'F10': 121,
    'F11': 122,
    'F12': 123,
    'semicolon': 186,
    'colon': 186,
    'equal': 187,
    'equals': 187,
    'plus': 187,
    'comma': 188,
    'minus': 189,
    'dash': 189,
    'dot': 190,
    'period': 190,
    'slash': 191,
    'console': 192,
    'tilde': 192,
    'leftbracket': 219,
    'rightbracket': 221,
    'backslash': 220,
    'quote': 222,
    'apostrophe': 222
};
var keys = key;
