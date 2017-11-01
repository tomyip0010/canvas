class CanBeUsed extends PaintFunction {
    constructor(contextReal, contextDraft) {
        super();
        this.contextDraft = contextDraft;
        this.contextReal = contextReal;
        this.contextGuide = contextGuide;
        this.index = 0;
        this.translate = false;
    }

    changeStrokeColor(newStrokeColor) {
        this.colorStroke = newStrokeColor;
    }
    changeFillColor(newFillColor) {
        this.colorFill = newFillColor;
    }
    changeStrokeWidth(newStrokeWidth) {
        this.strokeWidth = newStrokeWidth;
    }
    changeStrokeDash(newStrokeDash) {
        this.strokeDash = newStrokeDash;
    }

    onMouseDown(coord, event) {
        if (this.index == 0) {
            this.firstPt = coord;
            this.ctrlPt = [this.firstPt[0] - 25, this.firstPt[1] - 25];
        } else {
            this.firstPtDis =  Math.sqrt(Math.pow(this.firstPt[0]-coord[0],2)+Math.pow(this.firstPt[1]-coord[1],2)); 
            this.secondPtDis =  Math.sqrt(Math.pow(this.secondPt[0]-coord[0],2)+Math.pow(this.secondPt[1]-coord[1],2)); 
            this.thirdPtDis =  Math.sqrt(Math.pow(this.thirdPt[0]-coord[0],2)+Math.pow(this.thirdPt[1]-coord[1],2)); 
            this.fourthPtDis =  Math.sqrt(Math.pow(this.fourthPt[0]-coord[0],2)+Math.pow(this.fourthPt[1]-coord[1],2)); 
            this.ctrlPtDis = Math.sqrt(Math.pow(this.ctrlPt[0]-coord[0],2)+Math.pow(this.ctrlPt[1]-coord[1],2)); 
            if (this.ctrlPtDis <= 10 || this.firstPtDis <= 10 || this.secondPtDis <= 10 || this.thirdPtDis <= 10 || this.fourthPtDis <= 10) {
                this.translate = true;
                
            } 
        }
    }

    onDragging(coord, event) {
        if (this.index === 0) {
            this.drawBox(this.firstPt[0], this.firstPt[1], coord[0], coord[1], this.contextDraft); 
        } else {
            this.xDist = coord[0] - this.firstPt[0] + 25;
            this.yDist = coord[1] - this.firstPt[1] + 25;
            if (this.firstPtDis <= 10) {
                this.ctrlPt = [coord[0] - 25, coord[1] - 25];
                this.firstPt = [coord[0], coord[1]];
                this.secondPt = [this.fourthPt[0], coord[1]];
                this.thirdPt = [coord[0], this.fourthPt[1]];
                this.drawBox(coord[0], coord[1], this.fourthPt[0], this.fourthPt[1], this.contextDraft); 
            } else if (this.secondPtDis <= 10) {
                this.ctrlPt = [this.firstPt[0] - 25, this.firstPt[1] - 25];
                this.secondPt = [coord[0], coord[1]];
                this.firstPt = [this.thirdPt[0], coord[1]];
                this.fourthPt = [coord[0], this.thirdPt[1]];
                this.drawBox(coord[0], coord[1], this.thirdPt[0], this.thirdPt[1], this.contextDraft);
            } else if (this.thirdPtDis <= 10) {
                this.ctrlPt = [this.firstPt[0] - 25, this.firstPt[1] - 25];
                this.thirdPt = [coord[0], coord[1]];
                this.firstPt = [coord[0],this.secondPt[1]];
                this.fourthPt = [this.secondPt[0], coord[1]];
                this.drawBox(coord[0], coord[1], this.secondPt[0], this.secondPt[1], this.contextDraft);
            } else if (this.fourthPtDis <= 10) {
                this.ctrlPt = [this.firstPt[0] - 25, this.firstPt[1] - 25];
                this.fourthPt = [coord[0], coord[1]];
                this.secondPt = [coord[0], this.firstPt[1]];
                this.thirdPt = [this.firstPt[0], coord[1]];
                this.drawBox(coord[0], coord[1], this.firstPt[0], this.firstPt[1], this.contextDraft);
            } else if (this.translate) { 
            
                this.ctrlPt = coord;

                this.firstPt = [this.firstPt[0] + this.xDist, this.firstPt[1] + this.yDist];
                this.secondPt = [this.secondPt[0]+ this.xDist, this.secondPt[1]+ this.yDist];
                this.thirdPt = [this.thirdPt[0]+ this.xDist, this.thirdPt[1] + this.yDist];
                this.fourthPt = [this.fourthPt[0] + this.xDist, this.fourthPt[1]+ this.yDist];
                this.drawBox(this.firstPt[0], this.firstPt[1], this.fourthPt[0], this.fourthPt[1], this.contextDraft);
            }
           
           
           this.contextReal.translate(this.xDist, this.yDist);
            this.contextReal.restore();
            
           
        }
    }

    onMouseMove(e, sub) {
         
    }

    onMouseUp(coord, event){
        if (this.index === 0) {
            this.secondPt = [coord[0], this.firstPt[1]];
            this.thirdPt = [this.firstPt[0], coord[1]];
            this.fourthPt = coord;
            this.index ++;
        } else {
            if (this.translate) {
                this.translate = false;
            }
        }
        this.width = this.fourthPt[0] - this.firstPt[0];
        this.height = this.fourthPt[1] - this.firstPt[1];
    }

    onMouseLeave(){}
    
    onMouseEnter(){
    }

    drawBox(stx,sty,enx,eny,context) {
        this.contextDraft.clearRect(0, 0, this.contextDraft.canvas.width, this.contextDraft.canvas.height);
        this.contextDraft.setLineDash([15, 10]);
        context.beginPath();
        context.moveTo(stx,sty);
        context.lineTo(enx,sty);
        context.lineTo(enx,eny);
        context.lineTo(stx,eny);
        context.closePath();
        context.moveTo(stx,sty);
        context.stroke();
        context.beginPath();
        context.fillRect(stx-2,sty-2,6,6);
        context.fillRect(enx-2,sty-2,6,6);
        context.fillRect(enx-2,eny-2,6,6);
        context.fillRect(stx-2,eny-2,6,6);
        context.fillRect(this.ctrlPt[0], this.ctrlPt[1], 5, 5);
        context.stroke();
    }
}