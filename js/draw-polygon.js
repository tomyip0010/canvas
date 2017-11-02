class DrawPolygon extends PaintFunction {
    constructor(contextReal, contextDraft, colorStroke, colorFill, strokeWidth, strokeDash) {
        super();
        this.contextDraft = contextDraft;
        this.contextReal = contextReal;
        this.contextGuide = contextGuide;
        this.colorStroke = colorStroke;
        this.colorFill = colorFill;
        this.strokeWidth = strokeWidth;
        this.strokeDash = strokeDash;
        this.finish = false;    //tracking if the polygon complete
        this.index = 0;
        this.pointArr = [];
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
        this.contextGuide.setLineDash(this.strokeDash);
        this.contextReal.setLineDash(this.strokeDash);
        this.contextDraft.setLineDash(this.strokeDash);
        this.contextGuide.lineWidth = this.strokeWidth;
        this.contextReal.lineWidth = this.strokeWidth*2;
        this.contextDraft.lineWidth = this.strokeWidth;
        this.contextGuide.strokeStyle = this.colorStroke;
        this.contextReal.strokeStyle = this.colorStroke;
        this.contextDraft.strokeStyle = this.colorStroke;
        this.contextGuide.fillStyle = this.colorFill;
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
        this.pointArr.push(coord);
        if (distance <= 5) {
            this.finish = true;
            this.contextGuide.clearRect(0,0,this.contextGuide.canvas.width, this.contextGuide.canvas.height);
            this.draw(this.origX, this.origY,this.contextReal);
            this.pointArr = [];
            this.origX = this.origY = undefined;
            this.index = 0;
        } else {
            this.draw(coord[0], coord[1], this.contextGuide);
            this.endX = coord[0];
            this.endY = coord[1];
            this.index ++;
        }
    }
    
    onMouseLeave(){}

    onMouseEnter(){}

    draw(x,y,context) {
        this.contextDraft.clearRect(0, 0, this.contextDraft.canvas.width, this.contextDraft.canvas.height);
        if (!this.finish) {
            context.beginPath();
            if (this.index === 0) {
                context.moveTo(this.origX, this.origY);
            } else {
                context.moveTo(this.endX, this.endY);
            }
            context.lineTo(x, y);
            context.moveTo(this.endX, this.endY);
            context.stroke();
        } else {
            context.beginPath();
            context.moveTo(this.origX, this.origY);
            for(var i = 0; i < this.pointArr.length - 1; i++) {
                context.lineTo(this.pointArr[i][0], this.pointArr[i][1]);
            }
            context.closePath();
            context.stroke();
            context.fill("evenodd");
            //Add the following code when you draw on canvas real for undo
            saveCanvas();
        }
    }
}