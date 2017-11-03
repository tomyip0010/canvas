class DrawText extends PaintFunction{
    constructor(contextReal, contextDraft, colorStroke, colorFill, strokeWidth, strokeDash) {
        super();
        this.contextDraft = contextDraft;
        this.contextReal = contextReal;
    }

    changeStrokeColor(newStrokeColor) {
        this.colorStroke = newStrokeColor;
    }
    changeFillColor(newFillColor) { // Added to avoid error
        this.colorFill = newFillColor;
    }
    changeStrokeWidth(newStrokeWidth) { // Added to avoid error
        this.strokeWidth = newStrokeWidth;
    }
    changeStrokeDash(newStrokeDash) { // Added to avoid error
        this.strokeDash = newStrokeDash;
    }

    onMouseDown(coord, event) {
    }

    onDragging(coord, event) {
    }

    onMouseMove(coord, event) {
    }

    onMouseUp(coord, event){
        if (!hasInput) {
            this.text(event.pageX, event.pageY);
            hasInput = true;
        }
    }
    
    onMouseLeave(){}

    onMouseEnter(){
        document.body.style.cursor = "text";    //changing the cursor image to text
    }

    text(x, y) {                         //create the html input element on body
        var input = document.createElement('textarea');

        input.className = "text";
        input.style.position = 'fixed';
        input.style.left = x + 'px';
        input.style.top = y+ 'px';
        input.rows = "2";
        input.cols = "10";
        $(input).css('font-size', Number($('select[name="font-size"]').val()));
       
        document.body.appendChild(input);

        input.focus();
    }

    handleEnter(e) {               //when pressing enter, passing the text
        var keyCode = e.keyCode;
        if (keyCode === 13) {
            currentFunction.drawText(this.value, parseInt(this.style.left, 10), parseInt(this.style.top, 10));
            document.body.removeChild(this);
            hasInput = false;
        }
        document.body.style.cursor = "crosshair";
    }
    
    drawText(txt, x, y) {           //drawing the text to real canvas
        this.font_family = $('select[name="font-family"]').val();
        this.font_size = $('select[name="font-size"]').val();
        this.font_style = $('select[name="font-style"]').val();
        this.contextReal.textBaseline = 'top';
        this.contextReal.textAlign = 'left';
        this.contextReal.font = this.font_style + " " + this.font_size+"px "+this.font_family;
        this.contextReal.fillStyle = this.colorStroke;
        this.contextReal.fillText(txt, x - 4, y - 4);
        //Add the following code when you draw on canvas real for undo
        saveCanvas();
    }
}


$(document).ready(function() {
    //adding font size to html
    for(var i = 1; i <= 100; i ++) {
        $("select#font-size").append($(`<option value="${i}">${i}</option>`));
    }
    $('option[value="18"]').attr('selected',true);

    $('select[name="font-size"]').change(function() {
        $(".text").last().css('font-size', Number($('select[name="font-size"]').val())+"px");
    })
})

