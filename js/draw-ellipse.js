class DrawEllipse extends PaintFunction{
    constructor(contextReal, contextDraft, colorStroke, colorFill, strokeWidth, strokeDash){
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
    onMouseDown(coord){
        this.origX = coord[0];
        this.origY = coord[1];
        this.contextReal.setLineDash(this.strokeDash);
        this.contextDraft.setLineDash(this.strokeDash);
        this.contextReal.lineWidth = this.strokeWidth;
        this.contextDraft.lineWidth = this.strokeWidth;
        this.contextReal.strokeStyle = this.colorStroke;
        this.contextDraft.strokeStyle = this.colorStroke;
        this.contextReal.fillStyle = this.colorFill;
        this.contextDraft.fillStyle = this.colorFill;
        this.contextReal.beginPath();
    }
    onDragging(coord, event){
        if (event.shiftKey) {
            if (coord[0] > this.origX) {
                this.centerX = this.origX + this.radius;
                if (coord[1] < this.origY) {
                    this.centerY = this.origY - this.radius;
                    if (Math.abs(coord[0]-this.origX) > Math.abs(coord[1]-this.origY)) {
                        this.radius = Math.abs(coord[1]-this.origY)/2;
                    } else {
                        this.radius = Math.abs(coord[0]-this.origX)/2;
                    }
                } else {
                    this.centerY = this.origY + this.radius;
                    if (Math.abs(coord[0]-this.origX) > Math.abs(coord[1]-this.origY)) {
                        this.radius = Math.abs(coord[1]-this.origY)/2;
                    } else {
                        this.radius = Math.abs(coord[0]-this.origX)/2;
                    }
                }
            } else {
                this.centerX = this.origX - this.radius;
                if (coord[1] < this.origY) {
                    this.centerY = this.origY - this.radius;
                    if (Math.abs(coord[0]-this.origX) > Math.abs(coord[1]-this.origY)) {
                        this.radius = Math.abs(coord[1]-this.origY)/2;
                    } else {
                        this.radius = Math.abs(coord[0]-this.origX)/2;
                    }
                } else {
                    this.centerY = this.origY + this.radius;
                    if (Math.abs(coord[0]-this.origX) > Math.abs(coord[1]-this.origY)) {
                        this.radius = Math.abs(coord[1]-this.origY)/2;
                    } else {
                        this.radius = Math.abs(coord[0]-this.origX)/2;
                    }
                }
            }
        } else {
            if (coord[0] > this.origX) {
                this.centerX = this.origX + this.radiusX;
                if (coord[1] < this.origY) {
                    this.centerY = this.origY - this.radiusY;
                } else {
                    this.centerY = this.origY + this.radiusY;
                }
            } else {
                this.centerX = this.origX - this.radiusX;
                if (coord[1] < this.origY) {
                    this.centerY = this.origY - this.radiusY;
                } else {
                    this.centerY = this.origY + this.radiusY;
                }
            }
        }
        
        this.radiusX = Math.abs(coord[0]-this.origX)/2;
        this.radiusY = Math.abs(coord[1]-this.origY)/2;
        this.contextDraft.beginPath();
        this.contextDraft.clearRect(0,0,canvasDraft.width,canvasDraft.height);
        if (event.shiftKey) {
            this.contextDraft.arc(this.centerX, this.centerY, this.radius, 0, 2*Math.PI);
        } else {
            this.contextDraft.ellipse(this.centerX, this.centerY, this.radiusX, this.radiusY, 0, 0, 2*Math.PI);
        }
        this.contextDraft.fill();
        this.contextDraft.stroke();
    }

    onMouseMove(){}
    onMouseUp(coord){
        this.contextDraft.clearRect(0,0,canvasDraft.width,canvasDraft.height);
        if (event.shiftKey) {
            this.contextReal.arc(this.centerX, this.centerY, this.radius, 0, 2*Math.PI);
        } else {
            this.contextReal.ellipse(this.centerX, this.centerY, this.radiusX, this.radiusY, 0, 0, 2*Math.PI);
        }
        this.contextReal.fill();
        this.contextReal.stroke();
        //Add the following code when you draw on canvas real for undo
        saveCanvas();
    }
    onMouseLeave(){}
    onMouseEnter(){}
    
}