var c = document.getElementById("canvas");

var snakeWidth = 20;

var currentX = 200;
var currentY = 200;

var direction = -1;

var play = function play(e){

    var IntervalID;

    var r = document.createElementNS("http://www.w3.org/2000/svg","rect");

    r.setAttribute("x",currentX);
    r.setAttribute("y",currentY);
    r.setAttribute("width",20);
    r.setAttribute("height",20);
    c.appendChild(r);

    // Directions range from 0 to 3
    direction = 40 - e.keyCode;
    // 0 = down
    // 1 = right
    // 2 = up
    // 3 = left
    console.log("direction: " + direction);

    var move = function move(){
	switch (direction) {
	case 0:
	    currentY = currentY + snakeWidth;
	    break;
	case 1:
	    currentX = currentX + snakeWidth;
	    break;
	case 2:
	    currentY = currentY - snakeWidth;
	    break;
	case 3:
	    currentX = currentX - snakeWidth;
	    break;
	default:
	    break;
	}

        r.setAttribute("x",currentX);
        r.setAttribute("y",currentY);
    }

    IntervalID = clearInterval(IntervalID);
    IntervalID = window.setInterval(move,100);
}

document.onkeydown = play;
