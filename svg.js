var c = document.getElementById("canvas");
var width = c.getAttribute("width");
width = parseInt(width.substring(0, width.length - 2));
var height = c.getAttribute("height");
height = parseInt(height.substring(0, height.length - 2));
console.log(width);
console.log(height);

var snakeWidth = 20;
var foodWidth = 20;

var currentX = 200;
var currentY = 200;
var foodX;
var foodY;

var direction = -1;

var r = document.createElementNS("http://www.w3.org/2000/svg","rect");
var s = document.createElementNS("http://www.w3.org/2000/svg","rect");
var segment = [r, s];
var food = document.createElementNS("http://www.w3.org/2000/svg","rect");

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

var omNomNom = function omNomNom() {
    if (currentX == foodX && currentY == foodY) {
	c.removeChild(c.lastChild);
	makeSegment();
	makeFood();
	return true;
    } else {
	return false;
    }
};

var play = function play(e) {

    var IntervalID;

    segment[0].setAttribute("x", currentX);
    segment[0].setAttribute("y", currentY);
    segment[0].setAttribute("width", snakeWidth);
    segment[0].setAttribute("height", snakeWidth);
    c.appendChild(segment[0]);
    segment[1].setAttribute("x", 180);
    segment[1].setAttribute("y", 200);
    segment[1].setAttribute("width", snakeWidth);
    segment[1].setAttribute("height", snakeWidth);
    c.appendChild(segment[1]);

    var move = function move() {
	var q = segment.pop();
	console.log(q);
	segment.unshift(q);
	var w = omNomNom();
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
        segment[0].setAttribute("x",currentX);
        segment[0].setAttribute("y",currentY);
    }
    makeFood();
    IntervalID = window.setInterval(move,100);
}

var makeFood = function() {
    console.log("food");
    foodX = Math.floor(Math.random() * (width - foodWidth) / 20) * 20;
    foodY = Math.floor(Math.random() * (height - foodWidth) / 20) * 20; 
    food.setAttribute("x", foodX);
    food.setAttribute("y", foodY);
    food.setAttribute("width", foodWidth);
    food.setAttribute("height", foodWidth);
    food.setAttribute("fill", "red");
    c.appendChild(food);
}

var makeSegment = function(){
    console.log("segment");
    var seg = document.createElementNS("http://www.w3.org/2000/svg","rect");
    seg.setAttribute("x", foodX);
    seg.setAttribute("y", foodY);
    seg.setAttribute("width", snakeWidth);
    seg.setAttribute("height", snakeWidth);
    currentX = foodX;
    currentY = foodY;
    segment.unshift(seg);
    c.appendChild(seg);
}

document.onkeydown = updateDirection;
play();
