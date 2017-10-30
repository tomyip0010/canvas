class GetColor extends PaintFunction{
    constructor(contextReal, contextDraft, colorStroke, colorFill, strokeWidth, strokeDash){
        super();
        this.contextReal = contextReal;
    }

    changeStrokeColor(newStrokeColor) { // Added to avoid errors
        this.colorStroke = newStrokeColor;
    }
    changeFillColor(newFillColor) { // Added to avoid errors
        this.colorFill = newFillColor;
    }
    changeStrokeWidth(newStrokeWidth) { // Added to avoid errors
        this.strokeWidth = newStrokeWidth;
    }
    changeStrokeDash(newStrokeDash) { // Added to avoid errors
        this.strokeDash = newStrokeDash;
    }

    onMouseDown(coord){
        let imgData = this.contextReal.getImageData(coord[0], coord[1], 1, 1).data;
        let R = imgData[0];
        let G = imgData[1];
        let B = imgData[2];
        let A = (imgData[3]/255).toFixed(2);
        let rgba = 'rgba(' + R + ',' + G + ',' + B + ',' + A + ')';
        $('.colorstroke input').val(rgba);
        $('.colorfill input').val(rgba);
    }
    onDragging(){}
    onMouseMove(){}
    onMouseUp(){}
    onMouseLeave(){}
    onMouseEnter(){}
}