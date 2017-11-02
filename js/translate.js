class Translate extends PaintFunction {
    constructor(contextReal, contextDraft) {
        super();
        this.contextDraft = contextDraft;
        this.contextReal = contextReal;
        this.contextGuide = contextGuide;
        this.index = 0;
        this.translate = false;
        this.finish = false; 
    }

    changeStrokeColor(newStrokeColor) {
    }

    changeFillColor(newFillColor) {
    }

    changeStrokeWidth(newStrokeWidth) {
    }

    changeStrokeDash(newStrokeDash) {
    }

    onMouseDown(coord, event) {
        hasTranslate = true;
        if (this.index === 0) {
            this.contextReal.save();
            this.contextDraft.save();
            this.firstPt = coord;
            this.finish = false;
        } else {
           
            this.translate = false;
            this.dragPt = coord;
            this.upperLeftXDis = coord[0] - this.firstPt[0];
            this.upperLeftYDis = coord[1] - this.firstPt[1];
            this.clickPt = coord;
            if (this.contextDraft.isPointInPath(coord[0], coord[1])) {
                this.contextReal.clearRect(this.firstPt[0],this.firstPt[1],this.width,this.height);
                this.translate = true;
            } 
        }
    }

    onDragging(coord, event) {
        if (this.index === 0 && !this.finish) {
            this.width = coord[0] - this.firstPt[0];
            this.height = coord[1] - this.firstPt[1];
            this.drawBox(this.firstPt[0], this.firstPt[1], this.width, this.height, this.contextDraft);
        } else if (!(this.finish)){
            this.mvDisX = (coord[0] - this.dragPt[0]);
            this.mvDisY = (coord[1] - this.dragPt[1]);
            if(this.translate) {
                this.contextDraft.translate(this.mvDisX, this.mvDisY);
                this.drawBox(this.firstPt[0], this.firstPt[1], this.width, this.height, this.contextDraft);
                this.contextDraft.drawImage(this.img, this.firstPt[0], this.firstPt[1],this.width, this.height, this.firstPt[0],this.firstPt[1], this.width,this.height);
                this.contextDraft.restore();
                this.dragPt = coord;
            } 
        }
    }

    onMouseMove(e, sub) {
        let coord = [e.pageX - sub.offsetLeft, e.pageY - sub.offsetTop];
        if (this.contextDraft.isPointInPath(coord[0], coord[1])) {
            document.body.style.cursor = "move";
        } else {
            document.body.style.cursor = "default";
        }
    }

    onMouseUp(coord, event){
        if(this.index == 0) {
            this.img = new Image();
            this.img.src = this.contextReal.canvas.toDataURL();
            this.contextDraft.drawImage(this.img,0,0);
        } 
        this.index ++;
    }

    onMouseLeave(){}
    
    onMouseEnter(){
    }

    drawBox(stx,sty,w,h,context) {
        this.contextDraft.clearRect(-this.contextDraft.canvas.width, -this.contextDraft.canvas.height, this.contextDraft.canvas.width*4, this.contextDraft.canvas.height*4);
        this.contextDraft.lineWidth = 1; 
        this.contextDraft.setLineDash([15, 10]); 
        context.beginPath();
        this.firstPt = [stx,sty];
        this.secondPt = [stx+w,sty];
        this.thirdPt = [stx+w,sty+h];
        this.fourthPt = [stx, sty+h];
        context.fillRect(stx-2,sty-2,6,6);
        context.fillRect(stx+w-2,sty-2,6,6);
        context.fillRect(stx+w-2,sty+h-2,6,6);
        context.fillRect(stx-2,sty+h-2,6,6);
        context.stroke();
        context.rect(stx,sty,w,h);
        context.stroke();
    }

    handleTranslate(e) {
        if (this.translate) {
            this.contextReal.translate(this.mvDisX, this.mvDisY);
            this.contextReal.drawImage(this.img, this.firstPt[0], this.firstPt[1],this.width, this.height, this.dragPt[0]-this.upperLeftXDis, this.dragPt[1]-this.upperLeftYDis, this.width,this.height);
            this.contextReal.setTransform(1,0,0,1,0,0);
            this.contextReal.restore();
        } 
      
         //Add the following code when you draw on canvas real for undo
        saveCanvas();
        hasTranslate = false;
        this.translate = false;
        this.contextReal.setTransform(1,0,0,1,0,0);
        this.contextDraft.clearRect(-this.contextDraft.canvas.width, -this.contextDraft.canvas.height, this.contextReal.canvas.width*4, this.contextReal.canvas.height*4);
        this.contextDraft.setTransform(1,0,0,1,0,0);
        this.firstPt, this.secondPt, this.thirdPt, this.fourthPt, this.dragPt, this.upperLeftXDis, this.upperLeftYDis = undefined;
        this.finish = true;
        this.index = 0;
    }
}

$('body').keydown(function(e) {
    if(hasTranslate && e.keyCode === 13) {
        currentFunction.handleTranslate(e);
    }
})