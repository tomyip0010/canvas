class DrawEllipse extends PaintFunction{
    constructor(contextReal,contextDraft){
        super();
        this.contextReal = contextReal;
        this.contextDraft = contextDraft;            
    }
    
    onMouseDown(coord){
        this.origX = coord[0];
        this.origY = coord[1];
        //this.contextReal.strokeStyle = "red";
        //this.contextDraft.strokeStyle = "blue";
        //this.contextReal.fillStyle = "red";
        //this.contextDraft.fillStyle = "blue";
        this.contextReal.beginPath();
    }
    onDragging(coord){
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
        this.radiusX = Math.abs(coord[0]-this.origX)/2;
        this.radiusY = Math.abs(coord[1]-this.origY)/2;
        this.contextDraft.beginPath();
        this.contextDraft.clearRect(0,0,canvasDraft.width,canvasDraft.height);
        this.contextDraft.ellipse(this.centerX, this.centerY, this.radiusX, this.radiusY, 0, 0, 2*Math.PI);
        this.contextDraft.fill();
        this.contextDraft.stroke();
    }

    onMouseMove(){}
    onMouseUp(coord){
        this.contextDraft.clearRect(0,0,canvasDraft.width,canvasDraft.height);
        this.contextReal.ellipse(this.centerX, this.centerY, this.radiusX, this.radiusY, 0, 0, 2*Math.PI);
        this.contextReal.fill();
        this.contextReal.stroke();
    }
    onMouseLeave(){}
    onMouseEnter(){}
    
}