var c = document.getElementById("Board");
var ctx = c.getContext("2d");
console.log(ctx)

var img = new Image();
img.src = "assets/corkboard.jpg"

img.addEventListener("load" , draw , false)

function draw()
{
    ctx.drawImage(img,0,0);
}
draw();