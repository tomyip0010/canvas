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
        this.isDrawing = true;
    }

    onDragging(coord, event) {
        if (!this.isDrawing) return;

        this.contextReal.beginPath();
        this.contextReal.globalAlpha = 1;        
        this.contextReal.moveTo(this.origX - 4, this.origY - 4);
        this.contextReal.lineTo(coord[0] - 4, coord[1] - 4);
        this.contextReal.stroke();

        this.contextReal.globalAlpha = 0.6;
        this.contextReal.moveTo(this.origX - 2, this.origY - 2);
        this.contextReal.lineTo(coord[0] - 2, coord[1] - 2);
        this.contextReal.stroke();

        this.contextReal.globalAlpha = 0.4;
        this.contextReal.moveTo(this.origX, this.origY);
        this.contextReal.lineTo(coord[0], coord[1]);
        this.contextReal.stroke();

        this.contextReal.globalAlpha = 0.3;
        this.contextReal.moveTo(this.origX + 2, this.origY + 2);
        this.contextReal.lineTo(coord[0] + 2, coord[1] + 2);
        this.contextReal.stroke();

        this.contextReal.globalAlpha = 0.2;
        this.contextReal.moveTo(this.origX + 4, this.origY + 4);
        this.contextReal.lineTo(coord[0] + 4, coord[1] + 4);
        this.contextReal.stroke();

        this.origX = coord[0];
        this.origY = coord[1];
    }

    onMouseMove() { }
    onMouseUp() {
        this.contextReal.globalAlpha = 1;
        this.isDrawing = false;
        //Add the following code when you draw on canvas real for undo
        saveCanvas();
    }
    onMouseLeave() { }
    onMouseEnter() { }
}