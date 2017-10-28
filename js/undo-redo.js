//Current undo and redo function only record the canvas real image*******,

let imgArr = [];
let counter = -1;

//default
saveCanvas();

//Undo
$('#undo').click(function(e) {
    if (counter > 0) {
        contextDraft.clearRect(0, 0, contextDraft.canvas.width, contextDraft.canvas.height);
        counter -= 1;
        contextReal.putImageData(imgArr[counter], 0,0,0,0,1366,768);
    }
})

//Redo
$('#redo').click(function(e) {
    if(counter >= 0 && counter < imgArr.length - 1) {         
        contextDraft.clearRect(0, 0, contextDraft.canvas.width, contextDraft.canvas.height);
        counter += 1;
        contextReal.putImageData(imgArr[counter], 0,0,0,0,1366,768);
    }
})

//limit the undo array to size 20
function saveCanvas() {
    if (imgArr.length >= 20) {
        imgArr.shift();
    } 

    if (counter != imgArr.length - 1) {
        imgArr.splice(counter+1);
        imgArr.push(contextReal.getImageData(0,0,contextReal.canvas.width, contextReal.canvas.height));
        counter = imgArr.length - 1;
    } else {
        imgArr.push(contextReal.getImageData(0,0,contextReal.canvas.width, contextReal.canvas.height));
        counter = counter + 1;  
    }
}