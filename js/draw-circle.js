class DrawCircle extends PaintFunction{
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
        this.contextDraft.beginPath();
        this.contextDraft.clearRect(0,0,canvasDraft.width,canvasDraft.height);
        this.contextDraft.arc(this.centerX, this.centerY, this.radius, 0, 2*Math.PI);
        this.contextDraft.fill();
        this.contextDraft.stroke();
    }

    onMouseMove(){}
    onMouseUp(coord){
        this.contextDraft.clearRect(0,0,canvasDraft.width,canvasDraft.height);
        this.contextReal.arc(this.centerX, this.centerY, this.radius, 0, 2*Math.PI);
        this.contextReal.fill();
        this.contextReal.stroke();
    }
    onMouseLeave(){}
    onMouseEnter(){}
    
}