var c = document.getElementById("Board");
var ctx = c.getContext("2d");



var img = new Image();
img.src = "assets/corkboard.jpg"

img.addEventListener("load" , draw , false)


function draw()
{
    console.log("Here1")
    ctx.drawImage(img,0,0);
}
draw();
fillNote();