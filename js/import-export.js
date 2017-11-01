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
    //capture canvas real's image
    let img = new Image();
    console.log($('.colorbackground input').val());
    //draw the background color and canvas real's image to canvas draft for download
    let bgColor = $('.colorbackground input').val();
    contextDraft.fillStyle = bgColor;
    contextDraft.fillRect(0,0,contextDraft.canvas.width, contextDraft.canvas.height);

    img.onload = ()=>{
        contextDraft.drawImage(img, 0, 0);
        $("#save").attr("href", document.getElementById("canvas-draft").toDataURL());
        $("#btn-export").html("Download");
        contextDraft.clearRect(0,0,contextDraft.canvas.width, contextDraft.canvas.height);
    }
    img.src = contextReal.canvas.toDataURL();
}



