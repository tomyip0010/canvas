class Scale extends PaintFunction {
    constructor(contextReal, contextDraft) {
        super();
        this.contextDraft = contextDraft;
        this.contextReal = contextReal;
        this.contextGuide = contextGuide;
        this.index = 0;
        this.scale = false;
        this.finish = false; 
        this.scaleArr = [];
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
        hasScale = true;
        if (this.index === 0) {
            this.contextReal.save();
            this.contextDraft.save();
            this.firstPt = coord;
            this.finish = false;
        } else {
            this.scale = false;
            this.dragPt = coord;
            this.upperLeftXDis = coord[0] - this.firstPt[0];
            this.upperLeftYDis = coord[1] - this.firstPt[1];
            this.clickPt = coord;
            if(this.contextDraft.isPointInStroke(coord[0], coord[1])) {
                this.contextReal.clearRect(this.firstPt[0],this.firstPt[1],this.width,this.height);
                this.scale = true;
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
            if (this.scale) {
                this.contextDraft.scale(1+this.mvDisX/this.contextDraft.canvas.width, 1+this.mvDisY/this.contextDraft.canvas.height);
                this.scaleArr.push([1+this.mvDisX/this.contextDraft.canvas.width, 1+this.mvDisY/this.contextDraft.canvas.height]);
                this.drawBox(this.firstPt[0], this.firstPt[1], this.width, this.height, this.contextDraft);
                this.contextDraft.drawImage(this.img, this.firstPt[0], this.firstPt[1],this.width, this.height, this.firstPt[0],this.firstPt[1], this.width,this.height);
                this.contextDraft.restore();
                this.dragPt = coord;
            }
        }
    }

    onMouseMove(e, sub) {
        let coord = [e.pageX - sub.offsetLeft, e.pageY - sub.offsetTop];
        if(this.contextDraft.isPointInStroke(coord[0],coord[1])) { 
            document.body.style.cursor = "se-resize";
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
        this.contextDraft.lineWidth = 2;
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

    handleScale(e) {
        if (this.scale) {
            for(var i = 0; i < this.scaleArr.length - 1; i ++) {
                this.contextReal.scale(this.scaleArr[i][0], this.scaleArr[i][1]);
            }
            this.contextReal.scale(this.scaleArr[this.scaleArr.length-1][0], this.scaleArr[this.scaleArr.length-1][1]);
            this.contextReal.drawImage(this.img, this.firstPt[0], this.firstPt[1],this.width, this.height, this.firstPt[0],this.firstPt[1], this.width,this.height);
            this.contextReal.setTransform(1,0,0,1,0,0);
            this.contextReal.restore();
        }
      
        //Add the following code when you draw on canvas real for undo
        saveCanvas();

        hasScale = false;
        this.scaleArr = []
        this.scale = false;
        this.contextReal.setTransform(1,0,0,1,0,0);
        this.contextDraft.clearRect(-this.contextDraft.canvas.width, -this.contextDraft.canvas.height, this.contextReal.canvas.width*4, this.contextReal.canvas.height*4);
        this.contextDraft.setTransform(1,0,0,1,0,0);
        this.firstPt, this.secondPt, this.thirdPt, this.fourthPt, this.dragPt, this.upperLeftXDis, this.upperLeftYDis = undefined;
        this.finish = true;
        this.index = 0;
    }
}

$('body').keydown(function(e) {
    if(hasScale && e.keyCode === 13) {
        currentFunction.handleScale(e);
    }
})