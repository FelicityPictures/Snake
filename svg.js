var c = document.getElementById("canvas");
var width = c.getAttribute("width");
width = parseInt(width.substring(0, width.length - 2));
var height = c.getAttribute("height");
height = parseInt(height.substring(0, height.length - 2));
console.log(width);
console.log(height);

var snakeWidth = 20;

var currentX = 200;
var currentY = 200;

var direction = -1;

var r = document.createElementNS("http://www.w3.org/2000/svg","rect");
var segment = [r];

var lmao = function lmao() {};

var updateDirection = function updateDirection(e) {
    // Directions range from 0 to 3
    // 0 = down
    // 1 = right
    // 2 = up
    // 3 = left
    var oldDirection = direction;
    direction = 40 - e.keyCode;
    if (direction < 0 || direction > 3) {
	direction = oldDirection;
    }
    console.log("direction: " + direction);
}

var play = function play(e) {

    var IntervalID;

    segment[0].setAttribute("x",currentX);
    segment[0].setAttribute("y",currentY);
    segment[0].setAttribute("width",20);
    segment[0].setAttribute("height",20);
    c.appendChild(segment[0]);

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

	if (currentX < 0 - snakeWidth || currentY < 0 - snakeWidth ||
	    currentX > width || currentY > height) {
	    console.log("you died");
	    clearInterval(IntervalID);
	    document.onkeydown = lmao;//sets keydown to do nothing
	    return;
	}

        r.setAttribute("x",currentX);
        r.setAttribute("y",currentY);
    }

    IntervalID = window.setInterval(move,100);
}

document.onkeydown = updateDirection;
play();
