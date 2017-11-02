class Painter extends PaintFunction {
    constructor(contextReal, contextDraft, colorFill) {
        super();
        this.contextReal = contextReal;
        this.contextDraft = contextDraft;
        this.colorFill = colorFill;
    }

    changeStrokeColor(newStrokeColor) {
    }
    changeFillColor(newFillColor) { // Added to avoid error
        this.colorFill = newFillColor;
    }
    changeStrokeWidth(newStrokeWidth) {
    }
    changeStrokeDash(newStrokeDash) {
    }

    onMouseDown(coord, e) {
        let color = this.colorFill.substring(4, this.colorFill.length-1).replace(/ /g, '').split(',');
        let canvasWidth = canvasReal.width;
        let canvasHeight = canvasReal.height;
        let colorLayer = this.contextReal.getImageData(x, y, canvasWidth, canvasHeight);
        let startPixel = this.contextReal.getImageData(coord[0], coord[1], 1, 1);
        let startR = startPixel.data[0];
        let startG = startPixel.data[1];
        let startB = startPixel.data[2];
        let startA = startPixel.data[3];
        let maxLoop = 10000000;
        let loop = 0;

        let pixelStack = [
            [coord[0], coord[1]]
        ];

        while (pixelStack.length && loop < maxLoop) {
            var newPos, x, y, pixelPos, reachLeft, reachRight;
            newPos = pixelStack.pop();
            x = newPos[0];
            y = newPos[1];

            pixelPos = (y * canvasWidth + x) * 4;
            while (y-- >= 0 && matchStartColor(pixelPos)) {
                pixelPos -= canvasWidth * 4;
            }
            pixelPos += canvasWidth * 4;
            ++y;
            reachLeft = false;
            reachRight = false;
            while (y++ < canvasHeight - 1 && matchStartColor(pixelPos)) {
                colorPixel(pixelPos);

                if (x > 0) {
                    if (matchStartColor(pixelPos - 4)) {
                        if (!reachLeft) {
                            pixelStack.push([x - 1, y]);
                            reachLeft = true;
                        }
                    } else if (reachLeft) {
                        reachLeft = false;
                    }
                }

                if (x < canvasWidth - 1) {
                    if (matchStartColor(pixelPos + 4)) {
                        if (!reachRight) {
                            pixelStack.push([x + 1, y]);
                            reachRight = true;
                        }
                    } else if (reachRight) {
                        reachRight = false;
                    }
                }

                pixelPos += canvasWidth * 4;
                loop++;
            }
        }
        if (loop < maxLoop) {
            this.contextReal.putImageData(colorLayer, 0, 0);
        }

        function matchStartColor(pixelPos) {
            var r = colorLayer.data[pixelPos];
            var g = colorLayer.data[pixelPos + 1];
            var b = colorLayer.data[pixelPos + 2];
            var a = colorLayer.data[pixelPos + 3];

            return (r == startR && g == startG && b == startB && a== startA);
        }

        function colorPixel(pixelPos) {
            colorLayer.data[pixelPos] = color[0];
            colorLayer.data[pixelPos + 1] = color[1];
            colorLayer.data[pixelPos + 2] = color[2];
            colorLayer.data[pixelPos + 3] = 255;
        }
    }
}