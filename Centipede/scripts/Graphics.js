// ------------------------------------------------------------------
//
// This namespace provides the rendering code for the game.
//
// ------------------------------------------------------------------
Brickout.graphics = (function() {
    'use strict';

    var canvas = document.getElementById('id-canvas'),
        context = canvas.getContext('2d');

    //
    // Place a 'clear' function on the Canvas prototype, this makes it a part
    // of the canvas, rather than making a function that calls and does it.
    CanvasRenderingContext2D.prototype.clear = function() {
        this.save();
        this.setTransform(1, 0, 0, 1, 0, 0);
        this.clearRect(0, 0, canvas.width, canvas.height);
        this.restore();
    };

    //------------------------------------------------------------------
    //
    // Public method that allows the client code to clear the canvas.
    //
    //------------------------------------------------------------------
    function clear() {
        context.clearRect(0, 0, canvas.width, canvas.height);
    }

    // --------------------------------------------------------------
    //
    // Draws a texture to the canvas with the following specification:
    //    image: Image
    //    center: {x: , y: }
    //    rotation: radians
    //    size: { x: , y: }
    //
    // --------------------------------------------------------------
    function drawTexture(image, center, rotation, size) {
        context.save();

        context.translate(center.x, center.y);
        context.rotate(rotation);
        context.translate(-center.x, -center.y);

        context.drawImage(
            image,
            center.x - size.x / 2,
            center.y - size.y / 2,
            size.x, size.y);

        context.restore();
    }

    // --------------------------------------------------------------
    //
    // Draws a sub-texture to the canvas with the following specification:
    //    image: Image
    //    index: index of sub-texture to draw
    //    subTextureWidth: pixel width of the sub-texture to draw
    //    center: {x: , y: }
    //    rotation: radians
    //    size: { x: , y: } // Size (in pixels) to render the sub-texture
    //
    // --------------------------------------------------------------
    function drawSubTexture(image, index, subTextureWidth, center, rotation, size) {
        context.save();

        context.translate(center.x, center.y);
        context.rotate(rotation);
        context.translate(-center.x, -center.y);

        //
        // Pick the selected sprite from the sprite sheet to render
        context.drawImage(
            image,
            subTextureWidth * index, 0,      // Which sub-texture to pick out
            subTextureWidth, image.height,   // The size of the sub-texture
            center.x - size.x / 2,           // Where to draw the sub-texture
            center.y - size.y / 2,
            size.x, size.y);

        context.restore();
    }

    // --------------------------------------------------------------
    //
    // Draw a rectangle to the canvas with the following attributes:
    //      center: { x: , y: },
    //      size: { x: , y: },
    //      rotation:       // radians
    //
    // --------------------------------------------------------------
    function drawRectangle(rect, fillStyle, strokeStyle) {
        context.save();
        context.translate(rect.center.x, rect.center.y );
        context.rotate(rect.rotation);
        context.translate(-rect.center.x, -rect.center.y);
        
        context.fillStyle = fillStyle;
        context.fillRect(rect.center.x - rect.size.x / 2, rect.center.y - rect.size.y / 2, rect.size.x, rect.size.y);
        
        context.strokeStyle = strokeStyle;
        context.strokeRect(rect.center.x - rect.size.x / 2, rect.center.y - rect.size.y / 2, rect.size.x, rect.size.y);

        context.restore();
    }

    //------------------------------------------------------------------
    //
    // Draws a rectangle
    //
    //------------------------------------------------------------------
    function drawRectangle(spec) {
        context.fillStyle = spec.fill;
        context.fillRect(spec.x, spec.y, spec.width, spec.height);

        context.strokeStyle = spec.stroke;
        context.strokeRect(spec.x, spec.y, spec.width, spec.height);
    }

    //------------------------------------------------------------------
    //
    // Returns the width of the specified text, in pixels.
    //
    //------------------------------------------------------------------
    function measureTextWidth(spec) {
        context.save();

        context.font = spec.font;
        context.fillStyle = spec.fill;
        if (spec.hasOwnProperty('stroke')) {
            context.strokeStyle = spec.stroke;
        }
        var width = context.measureText(spec.text).width;

        context.restore();

        return width;
    }

    //------------------------------------------------------------------
    //
    // Returns the height of the specified text, in pixels.
    //
    //------------------------------------------------------------------
    function measureTextHeight(spec) {
        var saveText = spec.text;

        spec.text = 'm';    // Clever trick to get font height
        context.save();

        context.font = spec.font;
        context.fillStyle = spec.fill;
        if (spec.hasOwnProperty('stroke')) {
            context.strokeStyle = spec.stroke;
        }
        var width = context.measureText(spec.text).width;
        spec.text = saveText;

        context.restore();

        return width;
    }

    //------------------------------------------------------------------
    //
    // Draw some text to the screen
    //
    //------------------------------------------------------------------
    function drawText(spec) {
        context.save();
        context.font = spec.font,
        context.fillStyle = spec.fill;
        if (spec.hasOwnProperty('stroke')) {
            context.strokeStyle = spec.stroke;
        }
        context.textBaseline = 'top';
        context.fillText(spec.text, spec.position.x, spec.position.y);
        context.strokeText(spec.text, spec.position.x, spec.position.y);
        context.restore();
    }

    //------------------------------------------------------------------
    //
    // Expose an ability to draw an image/texture on the canvas.
    //
    //------------------------------------------------------------------
    function drawImage(spec) {
        context.save();
        context.translate(spec.center.x, spec.center.y);
        context.rotate(spec.rotation);
        context.translate(-spec.center.x, -spec.center.y);
        context.drawImage(
            spec.image,
            spec.center.x - spec.size/2,
            spec.center.y - spec.size/2,
            spec.size, spec.size);

        context.restore();
    }

    return {
        clear : clear,
        drawRectangle : drawRectangle,
        drawText: drawText,
        drawImage: drawImage,
        measureTextWidth: measureTextWidth,
        measureTextHeight: measureTextHeight,
        drawTexture : drawTexture,
        drawSubTexture : drawSubTexture,
        

    };
}());
