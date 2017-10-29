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
        var input = document.createElement('input'),
        font = '14px sans-serif';

        input.id = "text";
        input.type = 'text';
        input.style.position = 'fixed';
        input.style.left = x + 'px';
        input.style.top = y+ 'px';
        input.style.color = this.colorStroke;
        
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
        this.contextReal.textBaseline = 'top';
        this.contextReal.textAlign = 'left';
        this.contextReal.font = "14px serif";
        this.contextReal.fillText(txt, x - 4, y - 4);
        //Add the following code when you draw on canvas real for undo
        saveCanvas();
    }
}

