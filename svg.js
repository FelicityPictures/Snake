var c = document.getElementById("canvas");
var width = c.getAttribute("width");
width = parseInt(width.substring(0, width.length - 2));
var height = c.getAttribute("height");
height = parseInt(height.substring(0, height.length - 2));
console.log(width);
console.log(height);

var snakeWidth = 20;
var foodWidth = 20;

var currentX = [200];
var currentY = [200];
var foodX;
var foodY;

var direction = -1;

var r = document.createElementNS("http://www.w3.org/2000/svg","rect");
var segment = [r];
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

var play = function play(e) {

    var IntervalID;

    segment[0].setAttribute("x",currentX[0]);
    segment[0].setAttribute("y",currentY[0]);
    segment[0].setAttribute("width", snakeWidth);
    segment[0].setAttribute("height", snakeWidth);
    c.appendChild(segment[0]);

    var move = function move(){
	switch (direction) {
	case 0:
	    currentY[0] = currentY[0] + snakeWidth;
	    break;
	case 1:
	    currentX[0] = currentX[0] + snakeWidth;
	    break;
	case 2:
	    currentY[0] = currentY[0] - snakeWidth;
	    break;
	case 3:
	    currentX[0] = currentX[0] - snakeWidth;
	    break;
	default:
	    break;
	}

	if (currentX[0] < 0 - snakeWidth || currentY[0] < 0 - snakeWidth ||
	    currentX[0] > width || currentY[0] > height) {
	    console.log("you died");
	    clearInterval(IntervalID);
	    document.onkeydown = lmao;//sets keydown to do nothing
	    return;
	} else if(parseInt(segment[0].getAttribute("x")) == foodX &&
		  parseInt(segment[0].getAttribute("y")) == foodY){
	    //remove food and add to segment 
	}

        r.setAttribute("x",currentX[0]);
        r.setAttribute("y",currentY[0]);
    }
    makeFood();
    IntervalID = window.setInterval(move,100);
}

var makeFood = function(){
    console.log("food");
    foodX = Math.floor(Math.random() * (width - foodWidth)/20)*20;
    foodY = Math.floor(Math.random() * (height - foodWidth)/20)*20;
    for (var i=0; i<segment.length; i++){
	if (parseInt(segment[i].getAttribute("x")) == foodX &&
	    parseInt(segment[i].getAttribute("y")) == foodY){
	    makeFood();
	    break;
	}
    }
    food.setAttribute("x", foodX);
    food.setAttribute("y", foodY);
    food.setAttribute("width", foodWidth);
    food.setAttribute("height", foodWidth);
    food.setAttribute("fill", "red");
    c.appendChild(food);
}

document.onkeydown = updateDirection;
play();
