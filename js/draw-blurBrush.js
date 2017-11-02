class DrawBlurBrush extends PaintFunction {
    constructor(contextReal, contextDraft, colorStroke, colorFill, strokeWidth, strokeDash) {
        super();
        this.contextReal = contextReal;
        this.contextDraft = contextDraft;
        this.colorStroke = colorStroke;
        this.colorFill = colorFill;
        this.strokeWidth = strokeWidth;
        this.strokeDash = strokeDash;
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
        this.contextReal.setLineDash(this.strokeDash);
        this.contextDraft.setLineDash(this.strokeDash);
        this.contextReal.lineWidth = 6 + (this.strokeWidth - 4);
        this.contextReal.strokeStyle = this.colorStroke;
        this.contextReal.lineCap = 'round';
        this.contextReal.lineJoin = 'round';
        this.contextReal.shadowBlur = 8;
        this.contextReal.shadowColor = this.colorStroke;

        this.contextReal.beginPath();
        this.contextReal.moveTo(this.origX, this.origY);
    }

    onDragging(coord, event) {
        this.contextReal.globalAlpha = 0.5
        this.contextReal.lineTo(coord[0], coord[1]);
        this.contextReal.stroke();
    }

    onMouseMove() { }
    onMouseUp() {
        this.contextReal.globalAlpha = 1;
        this.contextReal.shadowBlur = 0;
        //Add the following code when you draw on canvas real for undo
        saveCanvas();
    }
    onMouseLeave() { }
    onMouseEnter() { }
}