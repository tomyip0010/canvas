class DrawStraightLine extends PaintFunction{
    constructor(contextReal, contextDraft){
        super();
        this.contextReal = contextReal;
        this.contextDraft = contextDraft; 
    }
    onMouseDown(coord){
        this.origX = coord[0];
        this.origY = coord[1];
        //this.contextReal.strokeStyle = "red";
        //this.contextDraft.strokeStyle = "blue";
        this.contextReal.beginPath();
    }
    onDragging(coord){
        this.contextDraft.beginPath();
        this.contextDraft.moveTo(this.origX, this.origY);
        this.contextDraft.clearRect(0,0,canvasDraft.width,canvasDraft.height);
        this.contextDraft.lineTo(coord[0], coord[1]);
        this.contextDraft.stroke();
    }
    onMouseMove(){}
    onMouseUp(coord){
        this.contextReal.moveTo(this.origX, this.origY);
        this.contextDraft.clearRect(0,0,canvasDraft.width,canvasDraft.height);
        this.contextReal.lineTo(coord[0], coord[1]);
        this.contextReal.stroke();
    }
    onMouseLeave(){}
    onMouseEnter(){}
}