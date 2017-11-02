class Eraser extends PaintFunction {
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
        this.contextReal.lineWidth = 8 + (this.strokeWidth - 4);
        this.contextReal.lineCap = 'round';
        this.contextReal.lineJoin = 'round';
        this.contextReal.globalCompositeOperation = 'destination-out';
        this.contextReal.fillStyle = 'rgba(0,0,0,1)';
        this.contextReal.strokeStyle = 'rgba(0,0,0,1)';
        this.contextReal.beginPath();
        this.contextReal.moveTo(this.origX, this.origY);
    }

    onDragging(coord, event) {
        this.contextReal.lineTo(coord[0], coord[1]);
        this.contextReal.stroke();
    }

    onMouseMove() { }
    onMouseUp() {
        this.contextReal.globalCompositeOperation = 'source-over'
    }
    onMouseLeave() { }
    onMouseEnter() { }
}
