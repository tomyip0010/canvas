class DrawingCurve extends PaintFunction {
    constructor(contextReal,contextDraft) {
        super();
        this.contextReal = contextReal;
        this.contextDraft = contextDraft;     
    }

    onMousedown(coord, event) {
        this.origX = coord[0];
        this.origY = coord[1];
    }

    onDragging(coord, event) {
        this.draw(coord[0],coord[1], this.contextDraft);
    }

    onMouseMove(){}

    onMouseUp(coord, event){
        this.endX = coord[0];
        this.endY = coord[1];
        this.draw(this.endX, this.endY, this.contextDraft);
    }
    
    onMouseLeave(){}

    onMouseEnter(){}

    draw(x,y, context) {
        this.context.beginPath();
        this.context.moveTo(this.origX, this.origY);
        this.context.lineTo(x,y);
        this.context.moveTo(x,y);
        this.context.stroke();
    }
}
