let canvasReal = document.getElementById('canvas-real');
let contextReal = canvasReal.getContext('2d');
let canvasDraft = document.getElementById('canvas-draft');
let contextDraft = canvasDraft.getContext('2d');
let canvasGuide = document.getElementById('canvas-guide');   //new added guide canvas
let contextGuide = canvasGuide.getContext('2d');
let currentFunction;
let dragging = false;
let hasInput = false;   //tracking if there is input
let ml; 
let mt; 

$(document).mousemove(function(e){  // For updating ml and mt
    ml = parseInt($('.canvas-container-out').css('margin-left'));
    mt = parseInt($('.canvas-container-out img:first-child').css('height'));
})

$('#canvas-draft').mousedown(function(e){
    let mouseX = e.pageX - this.offsetLeft - ml;
    let mouseY = e.pageY - this.offsetTop - mt;
    currentFunction.onMouseDown([mouseX,mouseY],e);
    dragging = true;
});
$('#canvas-draft').mousemove(function(e){
    if(dragging){
        let mouseX = e.pageX - this.offsetLeft - ml;
        let mouseY = e.pageY - this.offsetTop - mt;
        currentFunction.onDragging([mouseX,mouseY],e);
    }
    currentFunction.onMouseMove(e,this);
});
$('#canvas-draft').mouseup(function(e){
    dragging = false;
    let mouseX = e.pageX - this.offsetLeft - ml;
    let mouseY = e.pageY - this.offsetTop - mt;
    currentFunction.onMouseUp([mouseX,mouseY],e);
});
$('#canvas-draft').mouseleave(function(e){
    dragging = false;
    let mouseX = e.pageX - this.offsetLeft - ml;
    let mouseY = e.pageY - this.offsetTop - mt;
    currentFunction.onMouseLeave([mouseX,mouseY],e);
});

$('#canvas-draft').mouseenter(function(e){
    let mouseX = e.pageX - this.offsetLeft - ml;
    let mouseY = e.pageY - this.offsetTop - mt;
    currentFunction.onMouseEnter([mouseX,mouseY],e);
});

$('body').keydown(function() {         //For text drawing
    if (hasInput) {
        var formElement = document.getElementById("text");
        formElement.addEventListener('keyup', currentFunction.handleEnter);
    }
})

class PaintFunction{
    constructor(){}
    onMouseDown(){}
    onDragging(){}
    onMouseMove(){}
    onMouseUp(){}
    onMouseLeave(){}
    onMouseEnter(){}

    changeField(newField){
        this.field = newField;
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
    
}    