class DrawCurve extends PaintFunction {
    constructor(contextReal,contextDraft) {
        super();
        this.contextReal = contextReal;
        this.contextDraft = contextDraft;     
        this.index = 0; //index increase on each click
                        //user will define the curvature at index 2
                        //draw new line at index 3 
    }

    onMouseDown(coord, event) {
        if(this.index < 1) {
            this.origX = coord[0];
            this.origY = coord[1];
            this.index ++;
        } else {
            this.ctrlX = coord[0];
            this.ctrlY = coord[1];
            this.finish = true;
            this.index ++;
        } 
    }

    onDragging(coord, event) {
        if (this.index === 1) {
            this.draw(coord[0],coord[1], this.contextDraft);
        } else if (this.index === 2){
            this.contextDraft.clearRect(0, 0, this.contextDraft.canvas.width, this.contextDraft.canvas.height);
            this.drawCurve(coord[0], coord[1], this.contextDraft);
        } 
    }

    onMouseMove(coord, event) {
    }

    onMouseUp(coord, event){
        if (this.index === 1) {
            this.endX = coord[0];
            this.endY = coord[1];
            this.draw(this.endX, this.endY, this.contextDraft);
            this.curve = true;
        } else if (this.index === 2) {
            this.contextDraft.clearRect(0, 0, this.contextDraft.canvas.width, this.contextDraft.canvas.height);
            this.drawCurve(coord[0], coord[1], this.contextReal);
            this.index = 0;
        }
    }
    
    onMouseLeave(){}

    onMouseEnter(){}

    draw(x,y,context) {
        context.clearRect(0, 0, this.contextDraft.canvas.width, this.contextDraft.canvas.height);
        context.beginPath();
        context.moveTo(this.origX, this.origY);
        context.lineTo(x,y);
        context.moveTo(x,y);
        context.closePath();
        context.stroke();
    }

    drawCurve(x,y, context) {
        context.beginPath();
        context.moveTo(this.origX, this.origY);
        context.quadraticCurveTo(x, y, this.endX, this.endY);
        context.stroke();
    }
}