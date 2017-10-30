class GetColor extends PaintFunction{
    constructor(contextReal, contextDraft, colorStroke, colorFill, strokeWidth, strokeDash){
        super();
        this.contextReal = contextReal;
        this.field = "stroke";
    }
    onMouseDown(coord){
        let imgData = this.contextReal.getImageData(coord[0], coord[1], 1, 1).data;
        let R = imgData[0];
        let G = imgData[1];
        let B = imgData[2];
        let A = (imgData[3]/255).toFixed(2);
        let rgba = 'rgba(' + R + ',' + G + ',' + B + ',' + A + ')';
        $('.color' + this.field + ' input').val(rgba);
        $('.color' + this.field + ' input').css({
            'background': rgba
        });
    }
    onDragging(){}
    onMouseMove(){}
    onMouseUp(){}
    onMouseLeave(){}
    onMouseEnter(){}

}