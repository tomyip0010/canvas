class DrawTriangle extends PaintFunction {
    constructor(contextReal,contextDraft) {
        super();
        this.contextReal = contextReal;
        this.contextDraft = contextDraft;
        this.index = 0; //index increase on each click
                        //user will first dragging out a baseline
                        //draw triangle at index 2
    }

    onMouseDown(coord, event) {
        if (this.index === 0) {
            this.origX = coord[0];
            this.origY = coord[1];
        } 
        this.index ++;
    }

    onDragging(coord,event) {
        this.contextDraft.clearRect(0, 0, this.contextDraft.canvas.width, this.contextDraft.canvas.height);
        if (this.index === 1) {
            this.draw(coord[0],coord[1], this.contextDraft);
        } else if (this.index === 2) {
            this.draw(this.midX, this.midY, this.contextDraft, coord[0], coord[1]);
        }
        
    }

    onMouseMove() {}

    onMouseUp(coord){
        if (this.index === 1) {
            this.midX = coord[0];
            this.midY = coord[1];
        } else if (this.index === 2) {
            this.contextDraft.clearRect(0, 0, this.contextDraft.canvas.width, this.contextDraft.canvas.height);
            this.contextReal.beginPath();
            this.draw(this.midX, this.midY, this.contextReal, coord[0], coord[1]);
            this.index = 0;
        }
    }

    onMouseLeave(){}
    onMouseEnter(){}

    draw(x,y,context,a,b) {
        if (this.index === 1) {  //Drawing the baseline only
            context.beginPath();
            context.moveTo(this.origX, this.origY);
            context.lineTo(x,y);
            context.moveTo(x,y);
            context.stroke();
        } else if (this.index === 2) {  //To complete the whole triangle
            context.beginPath();
            context.moveTo(this.origX, this.origY);
            context.lineTo(x,y);
            context.lineTo(a,b);
            context.closePath();
            context.moveTo(a,b);
            context.stroke();
        }
    }
}