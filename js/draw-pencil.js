class DrawPencil extends PaintFunction {
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
        this.contextReal.lineWidth = this.strokeWidth;
        this.contextReal.strokeStyle = this.colorStroke;
        this.contextReal.lineCap = 'round';
        this.contextReal.lineJoin = 'round';
        this.contextReal.beginPath();
        this.contextReal.moveTo(this.origX, this.origY);        
    }

    onDragging(coord, event) {
        this.contextReal.lineTo(coord[0], coord[1]);    
        this.contextReal.stroke();
    }

    onMouseMove() { }
    onMouseUp() {
        //Add the following code when you draw on canvas real for undo
        saveCanvas();
    }
    onMouseLeave() { }
    onMouseEnter() { }
}