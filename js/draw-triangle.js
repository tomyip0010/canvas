class DrawTriangle extends PaintFunction {
    constructor(contextReal,contextDraft) {
        super();
        this.contextReal = contextReal;
        this.contextDraft = contextDraft;
        this.contextGuide = contextGuide;
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

    onMouseMove(e, sub) {   // Drawing guideline
        let mouseX = e.pageX - sub.offsetLeft;
        let mouseY = e.pageY - sub.offsetTop;
        if (this.index > 0 ) {
            this.contextGuide.clearRect(0, 0, this.contextDraft.canvas.width, this.contextDraft.canvas.height);
            this.contextGuide.strokeStyle = 'rgb(188,185,194)';
            this.contextGuide.setLineDash([15, 10]);
            this.contextGuide.beginPath();
            this.contextGuide.moveTo(this.midX, this.midY);
            this.contextGuide.lineTo(this.origX, this.origY);
            this.contextGuide.lineTo(mouseX, mouseY);
            this.contextGuide.closePath();
            this.contextGuide.stroke();
            this.contextGuide.moveTo(mouseX, mouseY);
        } else {
            this.midX = mouseX;
            this.midY = mouseY;
        }
    }

    onMouseUp(coord){
        if (this.index === 1) {
            this.midX = coord[0];
            this.midY = coord[1];
        } else if (this.index > 1) {
            this.contextGuide.clearRect(0, 0, this.contextDraft.canvas.width, this.contextDraft.canvas.height);
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
        } else if (this.index > 1) {  //To complete the whole triangle
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