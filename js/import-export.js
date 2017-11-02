//import
$('input:file').change(function(e) {
    upload(this, contextDraft, contextReal);
});

function upload(input, contextDraft, contextReal) {
    let image = new Image();
    image.onload = function() {
        console.log(image);
        contextReal.drawImage(image, 10, 10, image.width*0.15, image.height*0.15);
        //Add the following code when you draw on canvas real for undo
        saveCanvas();
    }
    image.src = URL.createObjectURL(input.files[0]);
}


//export 
function download() {
    $("#save").attr("href", document.getElementById("canvas-real").toDataURL());
    $("#btn-export").html("Download");
}



