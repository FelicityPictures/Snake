var c = document.getElementById("canvas");
var play = function play(e){
    console.log(e.keyCode);
    if (e.keyCode != 38) {
	return;
    }
    var r = document.createElementNS("http://www.w3.org/2000/svg","rect");
    r.setAttribute("x",200);
    r.setAttribute("y",200);
    r.setAttribute("width",20);
    r.setAttribute("height",20);
    c.appendChild(r);
}
document.onkeydown = play;
