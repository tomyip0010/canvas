class DrawBrush extends PaintFunction {
    constructor(contextReal, contextDraft, colorStroke, colorFill, strokeWidth, strokeDash) {
        super();
        this.contextReal = contextReal;
        this.contextDraft = contextDraft;
        this.colorStroke = colorStroke;
        this.colorFill = colorFill;
        this.strokeWidth = strokeWidth;
        this.strokeDash = strokeDash;
        this.lastPoint = {};
        this.currentPoint = {};
    }
    changeStrokeColor(newStrokeColor) {
        this.colorStroke = newStrokeColor;
    }
    changeFillColor(newFillColor) {
        this.colorFill = newFillColor;
    }
    changeStrokeWidth(newStrokeWidth) {
        this.strokeWidth = newStrokeWidth;
    }
    changeStrokeDash(newStrokeDash) {
        this.strokeDash = newStrokeDash;
    }


    onMouseDown(coord, event) {
        this.origX = coord[0];
        this.origY = coord[1];
        this.contextReal.lineWidth = 8 + (this.strokeWidth - 4);
        this.contextReal.strokeStyle = this.colorStroke;
        this.contextReal.lineJoin = 'round';
        this.contextReal.lineCap = 'round'
    }

    onDragging(coord, event) {
        this.contextReal.beginPath();
        this.contextReal.globalAlpha = 1;        
        this.contextReal.moveTo(coord[0] - 4, coord[1] - 4);
        this.contextReal.lineTo(coord[0] - 4, coord[1] - 4);
        this.contextReal.stroke();

        this.contextReal.globalAlpha = 0.6;
        this.contextReal.moveTo(coord[0] - 2, coord[1] - 2);
        this.contextReal.lineTo(coord[0] - 2, coord[1] - 2);
        this.contextReal.stroke();

        this.contextReal.globalAlpha = 0.4;
        this.contextReal.moveTo(coord[0], coord[1]);
        this.contextReal.lineTo(coord[0], coord[1]);
        this.contextReal.stroke();

        this.contextReal.globalAlpha = 0.3;
        this.contextReal.moveTo(coord[0] + 2, coord[1] + 2);
        this.contextReal.lineTo(coord[0] + 2, coord[1] + 2);
        this.contextReal.stroke();

        this.contextReal.globalAlpha = 0.2;
        this.contextReal.moveTo(coord[0] + 4, coord[1] + 4);
        this.contextReal.lineTo(coord[0] + 4, coord[1] + 4);
        this.contextReal.stroke();

    }

    onMouseMove() { }
    onMouseUp() { }
    onMouseLeave() { }
    onMouseEnter() { }
}