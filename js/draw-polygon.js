class DrawPolygon extends PaintFunction {
    constructor(contextReal,contextDraft) {
        super();
        this.contextDraft = contextDraft;
        this.contextReal = contextReal;
        this.finish = false;    //tracking if the polygon complete
        this.index = 0;
    }

    onMouseDown(coord, event) {
        if (this.index === 0) {
            this.origX = coord[0];
            this.origY = coord[1];
            this.finish = false;    //restore for new polygon
        } 
    }

    onDragging(coord, event) {
        if (!(this.finish)) {
            this.contextDraft.strokeStyle = 'black';   //restore black for draft canvas
            this.draw(coord[0], coord[1], this.contextDraft);
        }
    }

    onMouseMove(e, sub) {
        let mouseX = e.pageX - sub.offsetLeft;
        let mouseY = e.pageY - sub.offsetTop;
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
        context.stroke();
    }
}