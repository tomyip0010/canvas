class DrawPolygon extends PaintFunction {
    constructor(contextReal, contextDraft, colorStroke, colorFill, strokeWidth, strokeDash) {
        super();
        this.contextDraft = contextDraft;
        this.contextReal = contextReal;
        this.colorStroke = colorStroke;
        this.colorFill = colorFill;
        this.strokeWidth = strokeWidth;
        this.strokeDash = strokeDash;
        this.finish = false;    //tracking if the polygon complete
        this.index = 0;
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
        this.contextReal.strokeStyle = this.colorStroke;
        this.contextDraft.strokeStyle = this.colorStroke;
        this.contextReal.fillStyle = this.colorFill;
        this.contextDraft.fillStyle = this.colorFill;
        if (this.index === 0) {
            this.origX = coord[0];
            this.origY = coord[1];
            this.finish = false;    //restore for new polygon
        } 
    }

    onDragging(coord, event) {
        if (!(this.finish)) {
            //this.contextDraft.strokeStyle = 'black';   <-- deactivated
            this.draw(coord[0], coord[1], this.contextDraft);
        }
    }

    onMouseMove(e, sub) {
        let mouseX = e.pageX - sub.offsetLeft - ml;
        let mouseY = e.pageY - sub.offsetTop - mt;
        if(this.index > 0 && !(this.finish)) {
            let distance = Math.sqrt(Math.pow(this.origX-mouseX,2)+Math.pow(this.origY-mouseY,2));  //allowance for 5px error for closing the polygon
            if (distance <= 5) {
                this.contextDraft.strokeStyle = 'rgb(75,222,99)';   //change to green line when good to complete the polygon
                this.draw(mouseX, mouseY, this.contextDraft);
            } else {
                this.draw(mouseX, mouseY, this.contextDraft);
            }
        } 
    }

    onMouseUp(coord, event){
        let distance = Math.sqrt(Math.pow(this.origX-coord[0],2)+Math.pow(this.origY-coord[1],2));  //allowance for 5px error for closing the polygon
        if (distance <= 5) {
            this.finish = true;
            this.draw(this.origX, this.origY,this.contextReal);
            this.index = 0;
        } else {
            this.draw(coord[0], coord[1], this.contextReal);
            this.endX = coord[0];
            this.endY = coord[1];
            this.index ++;
        }
        //Add the following code when you draw on canvas real for undo
        saveCanvas();
    }
    
    onMouseLeave(){}

    onMouseEnter(){}

    draw(x,y,context) {
        this.contextDraft.clearRect(0, 0, this.contextDraft.canvas.width, this.contextDraft.canvas.height);
        context.beginPath();
        if (this.index === 0) {
            context.moveTo(this.origX, this.origY);
        } else {
            context.moveTo(this.endX, this.endY);
        }
        context.lineTo(x, y);
        context.moveTo(this.endX, this.endY);
        context.closePath();
        context.fill();
        context.stroke();
    }
}