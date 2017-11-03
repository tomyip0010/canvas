let canvasReal = document.getElementById('canvas-real');
let contextReal = canvasReal.getContext('2d');
let canvasDraft = document.getElementById('canvas-draft');
let contextDraft = canvasDraft.getContext('2d');
let canvasGuide = document.getElementById('canvas-guide');   //new added guide canvas
let contextGuide = canvasGuide.getContext('2d');
let currentFunction;
let dragging = false;
let hasInput = false;   //tracking if there is input
let hasScale = false;
let hasTranslate = false;
let mobile = false;
let ml; 
let mt; 

function desktopMode(){
    $(document).mousemove(function(e){  // For updating ml and mt
        ml = parseInt($('.canvas-container-out').css('margin-left'));
        mt = parseInt($('.canvas-container-out img:first-child').css('height'));
    });

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
            var formElement = document.getElementsByClassName("text");
            formElement = formElement[formElement.length - 1];
            formElement.addEventListener('keyup', currentFunction.handleEnter);
        }
    });
}

function mobileMode(){
    mobile = true;
    var hammertime = new Hammer(canvasDraft);
    hammertime.on('drag swipe tap press pan panup pandown', function(ev) {
    //console.log(ev.type);
    });
    /*
        hammertime.on('tap',function(ev){
            let mouseX = ev.center.x - canvasDraft.offsetLeft;
            let mouseY = ev.center.y - canvasDraft.offsetTop;
            currentFunction.onMouseDown([mouseX,mouseY],ev);
            //console.log(mouseX+":"+mouseY + ":"+ev.center.x + ","+ev.center.y);
        })*/

    hammertime.on('panstart press tap',function(ev){ 
        ml = parseInt($('.canvas-container-out').css('margin-left'));
        mt = parseInt($('.canvas-container-out img:first-child').css('height'));
        let mouseX = ev.center.x - canvasReal.offsetLeft  - ml;
        let mouseY = ev.center.y - canvasReal.offsetTop  - mt;
        currentFunction.onMouseDown([mouseX,mouseY],ev);
        dragging = true;
        console.log("ev:" + ev);
        console.log(mouseX+":"+mouseY + ":"+ev.center.x + ","+ev.center.y);
    })
    hammertime.on('panmove',function(ev){
        let mouseX = ev.center.x - canvasReal.offsetLeft - ml;
        let mouseY = ev.center.y - canvasReal.offsetTop - mt;
        currentFunction.onDragging([mouseX,mouseY],ev);
    // currentFunction.onMouseMove([mouseX,mouseY],ev);
    // console.log("panmove");
    });
    hammertime.on('panend',function(ev){
        let mouseX = ev.center.x - canvasReal.offsetLeft - ml;
        let mouseY = ev.center.y - canvasReal.offsetTop - mt;
        currentFunction.onMouseUp([mouseX,mouseY],ev);
    // console.log("panend");
    });
}

$(document).ready(function(){
    if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || $(window).width()<768) {
        mobileMode();
    }
    else if ($(window).width()>767){
        desktopMode();
    }
});

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
