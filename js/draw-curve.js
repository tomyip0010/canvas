class DrawCurve extends PaintFunction {
    constructor(contextReal, contextDraft, colorStroke, colorFill, strokeWidth, strokeDash) {
        super();
        this.contextReal = contextReal;
        this.contextDraft = contextDraft;
        this.colorStroke = colorStroke;
        this.strokeWidth = strokeWidth;
        this.strokeDash = strokeDash;     
        this.index = 0; //index increase on each click
                        //user will define the curvature at index 2
                        //draw new line at index 3 
    }

    changeStrokeColor(newStrokeColor) {
        this.colorStroke = newStrokeColor;
    }
    changeFillColor(newFillColor) { // Added to avoid error
        this.colorFill = newFillColor;
    }
    changeStrokeWidth(newStrokeWidth) {
        this.strokeWidth = newStrokeWidth;
    }
    changeStrokeDash(newStrokeDash) {
        this.strokeDash = newStrokeDash;
    }

    onMouseDown(coord, event) {
        this.contextReal.setLineDash(this.strokeDash);
        this.contextDraft.setLineDash(this.strokeDash);
        this.contextReal.lineWidth = this.strokeWidth;
        this.contextDraft.lineWidth = this.strokeWidth;
        this.contextReal.strokeStyle = this.colorStroke
        this.contextDraft.strokeStyle = this.colorStroke;
        if(this.index === 0) {
            this.origX = coord[0];
            this.origY = coord[1];
            this.index ++;
        } 
    }

    onDragging(coord, event) {
        if (this.index === 1) {
            this.draw(coord[0],coord[1], this.contextDraft);
        } else if (this.index === 2){
            this.drawCurve(coord[0], coord[1], this.contextDraft);
        } 
    }

    onMouseMove(e, sub) {
        let mouseX = e.pageX - sub.offsetLeft;
        let mouseY = e.pageY - sub.offsetTop;
        if (this.index > 1) {
            this.ctrlX = mouseX;
            this.ctrlY = mouseY;
            this.drawCurve(this.ctrlX, this.ctrlY, this.contextDraft);
        }
    }

    onMouseUp(coord, event){
        if (this.index === 1) {
            this.endX = coord[0];
            this.endY = coord[1];
            this.draw(this.endX, this.endY, this.contextDraft);
            this.index ++;
        } else if (this.index === 2) {
            this.drawCurve(coord[0], coord[1], this.contextReal);
            //Add the following code when you draw on canvas real for undo
            saveCanvas();
            this.index = 0;
        }
    }
    
    onMouseLeave(){}

    onMouseEnter(){}

    draw(x,y,context) {
        this.contextDraft.clearRect(0, 0, this.contextDraft.canvas.width, this.contextDraft.canvas.height);
        context.beginPath();
        context.moveTo(this.origX, this.origY);
        context.lineTo(x,y);
        context.moveTo(x,y);
        context.closePath();
        context.stroke();
    }

    drawCurve(x,y, context) {
        this.contextDraft.clearRect(0, 0, this.contextDraft.canvas.width, this.contextDraft.canvas.height);
        context.beginPath();
        context.moveTo(this.origX, this.origY);
        context.quadraticCurveTo(x, y, this.endX, this.endY);
        context.stroke();
    }
}