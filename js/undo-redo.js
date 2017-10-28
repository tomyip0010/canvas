//Current undo and redo function only record the canvas real image*******

let imgArr = [];
let arrIndex = 1;
let curIndex;

//default
saveCanvas();

//Undo
$('#undo').click(function(e) {
    curIndex = imgArr.length - arrIndex;
    if (curIndex > 0) {
        arrIndex += 1;
        contextDraft.clearRect(0, 0, contextDraft.canvas.width, contextDraft.canvas.height);
        contextReal.putImageData(imgArr[curIndex - 1], 0,0,0,0,1366,768);
    }
})

//Redo
$('#redo').click(function(e) {
    if(curIndex >= 0) {
        curIndex = imgArr.length - arrIndex;
        if (curIndex < imgArr.length - 1) {
            arrIndex -= 1;
            contextDraft.clearRect(0, 0, contextDraft.canvas.width, contextDraft.canvas.height);
            contextReal.putImageData(imgArr[curIndex + 1], 0,0,0,0,1366,768);
        }
    }
})

//limit the undo array to size 20
function saveCanvas() {
    if (imgArr.length >= 20) {
        imgArr.shift();
    } 
    imgArr.push(contextReal.getImageData(0,0,contextReal.canvas.width, contextReal.canvas.height));
}