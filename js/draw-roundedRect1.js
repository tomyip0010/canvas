class DrawRoundedRect extends PaintFunction {
    constructor(contextReal, contextDraft, colorStroke, colorFill, strokeWidth, strokeDash) {
        super();
        this.contextReal = contextReal;
        this.contextDraft = contextDraft;
        this.cornerRadius = 10;
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
        this.contextReal.lineJoin = 'round';
        this.contextDraft.lineJoin = 'round';
        this.contextReal.setLineDash(this.strokeDash);
        this.contextDraft.setLineDash(this.strokeDash);
        this.contextReal.lineWidth = this.strokeWidth;
        this.contextDraft.lineWidth = this.strokeWidth;
        this.contextReal.strokeStyle = this.colorStroke;
        this.contextDraft.strokeStyle = this.colorStroke;
        this.contextReal.fillStyle = this.colorFill;
        this.contextDraft.fillStyle = this.colorFill;
        this.contextReal.beginPath();
        this.contextDraft.beginPath();
        this.contextReal.moveTo(this.origX + this.cornerRadius, this.origY);
        this.contextDraft.moveTo(this.origX + this.cornerRadius, this.origY);
    }
    onDragging(coord, event) {
        this.contextDraft.clearRect(0, 0, canvasDraft.width, canvasDraft.height);
        this.contextDraft.lineTo(coord[0] - this.cornerRadius, this.origY);
        this.contextDraft.quadraticCurveTo(coord[0], this.origY, coord[0], this.origY + this.cornerRadius);
        this.contextDraft.lineTo(coord[0], coord[1] - this.cornerRadius);
        this.contextDraft.quadraticCurveTo(coord[0], coord[1], coord[0] - this.cornerRadius, coord[1]);
        this.contextDraft.lineTo(this.origX + this.cornerRadius, coord[1]);
        this.contextDraft.quadraticCurveTo(this.origX, coord[1], this.origX, coord[1] - this.cornerRadius);
        this.contextDraft.lineTo(this.origX, this.origY + this.cornerRadius);
        this.contextDraft.quadraticCurveTo(this.origX, this.origY, this.origX + this.cornerRadius, this.origY);
        this.contextDraft.stroke();
        this.contextDraft.fill();
    }

    onMouseMove() { }
    onMouseUp(coord) {
        this.contextDraft.clearRect(0, 0, canvasDraft.width, canvasDraft.height);
        this.contextReal.strokeRect(this.origX, this.origY, (coord[0] - this.origX), (coord[1] - this.origY));
        this.contextReal.fillRect(this.origX, this.origY, (coord[0] - this.origX), (coord[1] - this.origY));
    }
    onMouseLeave() { }
    onMouseEnter() { }
}