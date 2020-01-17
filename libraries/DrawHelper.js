// -----------------
// HTML5 Draw Helper
// by Logan G.
// -----------------
//
// NOTE: Requires Utility.js (update 8 or higher)
//
// Version 1.1
//  - Improved documentation significantly
//  - Integrated global "C" canvas object and added setCanvas functions
//  - Made DrawHelper independent and self-contained (no reliance on outside variables or functions aside from Utility.js and "C")
//  - Added additional functions for making a new canvas, getting canvas dimensions, etc.
//  - Added text drawing function
//  - Reworked default parameters for some functions using the method introduced in ES2015
//  - Added a multitude of image drawing and other image related functions
//  - Added circle drawing functions
//  - FIRST "COMPLETE" VERSION (ready for use in a project)
//
//
// HOW TO USE:
//   Simply load the script in your HTML5 game, then call DrawHelper.setCanvasByID(id) in your setup function
//   In your game loop or draw function, call any of the included drawing functions
//   Don't forget to clear the canvas before drawing each frame with DrawHelper.clear()
//
//
// For all functions:
//   The parameter "c" is any CSS-recognized color string, in quotes
//   Example: "rgb(0,0,255)" or "rgba(0,128,128,0.65)" or "purple"

var C; // The currently active canvas context

var DrawHelper = {
    
    // Set the active canvas context by reference to an existing canvas context
    setCanvas: function(canvasContext) {C = canvasContext;},
    // Set the active canvas context by the canvas element's ID
    setCanvasByID: function(id) {C = gid(id).getContext('2d');},
    
    // Create a new canvas element with the specified ID and style object, but don't add it to the page (returns the canvas context)
    createCanvas: function(id, styling) {
        var canvas = document.createElement("canvas");
        canvas.id = id;
        // Copy all properties from styling object to canvas.style
        for (var attr in styling) {
            if (styling.hasOwnProperty(attr)) canvas.style[attr] = styling[attr];
        }
        return canvas.getContext('2d');
    },
    
    // Get the active canvas context's width
    canvasWidth: function() {return C.canvas.width;},
    // Get the active canvas context's height
    canvasHeight: function() {return C.canvas.height;},
    
    // Rectangle with position, size, fill/stroke (boolean), color, and thickness
    rect: function(x,y,w,h,fill,c,thick = "1px") {
        if (fill) {
            if (c!=undefined) C.fillStyle = c;
            C.fillRect(x,y,w,h);
        } else {
            if (c!=undefined) C.strokeStyle = c;
            C.lineWidth = thick;
            C.strokeRect(x,y,w,h);
        }
    },
    
    // Rectangle with fixed coordinates, fill/stroke (boolean), color, and thickness
    fixedRect: function(x,y,x2,y2,fill,c,thick) {
        this.rect(x,y,x2-x,y2-y,fill,c,thick);
    },
    
    // Line from (x,y) to (x2,y2) with color and thickness
    line: function(x,y,x2,y2,c,thick = "1px") {
        if (c!=undefined) C.strokeStyle = c;
        C.lineWidth = thick;
        C.beginPath();
        C.moveTo(x,y);
        C.lineTo(x2,y2);
        C.closePath();
        C.stroke();
    },
    
    // Vertical line at (x,y) with length (+len = down, -len = up), color, and thickness
    vertLine: function(x,y,len,c,thick) {DrawHelper.line(x,y,x,y+len,c,thick);},
    
    // Horizontal line at (x,y) with length (+len = right, -len = left), color, and thickness
    horLine: function(x,y,len,c,thick) {DrawHelper.line(x,y,x+len,y,c,thick);},
    
    // Circle centered at (x,y) with the specified radius, fill/stroke (boolean), color, and thickness
    circle: function(x,y,radius,fill,c,thick = "1px") {
        C.beginPath();
        C.arc(x,y,radius,0,2 * Math.PI);
        C.closePath();
        C.lineWidth = thick;
        if (fill) {
            if (c!=undefined) C.fillStyle = c;
            C.fill();
        } else {
            if (c!=undefined) C.strokeStyle = c;
            C.stroke();
        }
    },
    
    // Circle with fixed coordinates, fill/stroke (boolean), color, and thickness (circle will be drawn in the box from (x,y) to (x2,y2))
    fixedCircle: function(x,y,x2,y2,fill,c,thick = "1px") {
        var radius = (x2 - x) / 2;
        this.circle(x + radius, y + radius, radius, fill, c, thick);
    },
    
    // Fixed vector vert-shape with vert array of exact coordinates, fill/stroke (boolean), color, and thickness
    //   Draws a path through all verts in the provided array
    //   Array example: var v = [[20,40],[40,40],[40,20]]; // (makes right triangle)
    fixedShape: function(verts,fill,c,thick = "1px") {
        C.beginPath();
        for(var i=0; i<verts.length; i++){
            if(i==0){
                C.moveTo(verts[i][0],verts[i][1]);
            }
            else{
                C.lineTo(verts[i][0],verts[i][1]);
            }
        }
        C.closePath();
        if(fill){
            if(c!=undefined){C.fillStyle = c;}
            C.fill();
        }else{
            if(c!=undefined){C.strokeStyle = c;}
            C.lineWidth = thick;
            C.stroke();
        }
    },
    
    // Vector vert-shape at (x,y) with vert array of relative coordinates, fill/stroke (boolean), color, and thickness
    //   Draws a path through all verts in the provided array, relative to (x,y)
    //   Array example: var v = [[0,20],[20,20],[20,0]]; // (makes right triangle)
    shape: function(x,y,verts,fill,c,thick = "1px") {
        var v = clone(verts);
        // Apparently cloning a 2D array doesn't change references to nested/sub arrays (must clone each manually)
        for(var i=0; i<v.length; i++){
            v[i] = clone(verts[i]);
            v[i][0] = v[i][0] + x;
            v[i][1] = v[i][1] + y;
        }
        DrawHelper.fixedShape(v,fill,c,thick);
    },
    
    // Rotate a vert-shape array clockwise by the specified angle (returns the rotated vert-shape array)
    rotateVerts: function(verts,degrees) {
        // (Formula found online)
        var rad = degrees * Math.PI/180;
        var cos = Math.cos(rad), sin = Math.sin(rad);
        var v = clone(verts);
        for(var i=0; i<v.length; i++){
            v[i] = clone(verts[i]);
            var x = v[i][0];
            var y = v[i][1];
            v[i][0] = x*cos - y*sin;
            v[i][1] = x*sin + y*cos;
        }
        return v;
    },
    
    // Scale a vert-shape array by the specified x and y scale (returns the scaled vert-shape array)
    //   If yscale is undefined, xscale will be used for both dimensions
    scaleVerts: function(verts,xscale,yscale) {
        if (yscale == undefined) {yscale = xscale;}
        var v = clone(verts);
        for(var i=0; i<v.length; i++){
            v[i] = clone(verts[i]);
            v[i][0] = v[i][0]*xscale;
            v[i][1] = v[i][1]*yscale;
        }
        return v;
    },
    
    // Clears a box on the canvas, or the entire canvas if no box is specified
    clear: function(x,y,w,h) {
        if(x != undefined){
            C.clearRect(x,y,w,h);
        } else {
            C.clearRect(0,0,C.canvas.width,C.canvas.height);
        }
    },
    
    // Draw the specified text string at (x,y) with the specified size, font, fill/stroke (boolean), color, and alignment
    //   Ex: DrawHelper.text("Hello world!", 10, 40, "20px", "Arial", true, "rgb(128,0,255)", "center")
    text: function(text,x,y,size = "16px",font = "Arial",fill = true,c = "black",align = "left") {
        C.font = size+" "+font;
        C.textAlign = align;
        if (fill) {
            C.fillStyle = c;
            C.fillText(text,x,y);
        } else {
            C.strokeStyle = c;
            C.strokeText(text,x,y);
        }
    },
    
    // Get data for a single pixel on the canvas at (x,y), including imageData and color
    //   Returns an object with .data (the captured imageData) and .color (a string in the form of "rgba(r,g,b,a)")
    getPixel: function(x,y) {
        var pix = {};
        pix.data = C.getImageData(x,y,1,1);
        pix.color = "rgba("+pix.data.data[0]+","+pix.data.data[1]+","+pix.data.data[2]+","+(pix.data.data[3]/255)+")";
        return pix;
    },
    
    // Copy an area of the canvas with the specified position and dimensions to (x2,y2)
    copyArea: function(x,y,w,h,x2,y2) {
        var a = C.getImageData(x,y,w,h);
        C.putImageData(a,x2,y2);
        // TODO - allow scaling of the copied area (for something like a security monitor effect)
    },
    
    // Create and return an Image object from the specified source URL, with an optional callback function executed when the image loads
    createImage: function(url, callback) {
        var img = new Image();
        img.src = url;
        if (callback != undefined) img.onload = callback;
        return img;
    },
    
    // Capture an image from a canvas context (defaults to current canvas) at the specified position and with the specified dimensions, returning the resulting ImageData object
    captureImage: function(x, y, w, h, canvas = C) {
        return canvas.getImageData(x, y, w, h); // Just a shortcut
    },
    
    // Convert an ImageData object into an Image object by making a temporary canvas, returning the resulting Image object
    convertImageData: function(imgData) {
        var tempCanvas = document.createElement('canvas');
        tempCanvas.width = imgData.width;
        tempCanvas.height = imgData.height;
        tempCanvas.getContext('2d').putImageData(imgData, 0, 0);
        return this.createImage(tempCanvas.toDataURL('image/png')); // NOTE - This function is currently untested
    },
    
    // Draw an image from an existing Image object or canvas at (x,y) with the specified width and height
    image: function(img, x, y, w, h) {
        C.drawImage(img, x, y, w, h); // Just a shortcut
    },
    
    // Draw an image from an existing Image object or canvas from (x,y) to (x2,y2)
    fixedImage: function(img, x, y, x2, y2) {
        C.drawImage(img, x, y, x2 - x, y2 - y);
    },
    
    // Draw a cropped image from an existing Image object or canvas, cropping from (sx,sy) and drawing at (x,y)
    imageCropped: function(img, sx, sy, sw, sh, x, y, w, h) {
        C.drawImage(img, sx, sy, sw, sh, x, y, w, h); // Just a shortcut
    },
    
    // Set whether image smoothing (antialiasing) is enabled or disabled for the currently active canvas context (defaults to true)
    setAntialias: function(enable = true) {
        C.imageSmoothingEnabled = enable;
    }
    
	// TODO - spritesheets via cropped drawing of an image or canvas
    
    // TODO - make separate webapp to create/draw vert-shapes and export as copiable vert arrays
    
};

// TO READ/TRY:
//   http://www.w3resource.com/html5-canvas/html5-canvas-translation-rotation-scaling.php
//   http://tutorials.jenkov.com/html5-canvas/transformation.html
