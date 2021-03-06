var c = document.getElementById("canvas");
var width = c.getAttribute("width");
width = parseInt(width.substring(0, width.length - 2));
var height = c.getAttribute("height");
height = parseInt(height.substring(0, height.length - 2));
console.log(width);
console.log(height);

var IntervalID;

var snakeWidth = 20;
var foodWidth = 20;

var currentX = 200;
var currentY = 200;
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
    if (direction < 0 || direction > 3 || (direction + 2) % 4 == oldDirection) {
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
	      return false;    }
};

var wallCollision = function wallCollision(e) {
    if (currentX < 0 - snakeWidth || currentY < 0 - snakeWidth ||
	      currentX > width || currentY > height) {
	      console.log("you died");
	      clearInterval(IntervalID);
	      document.onkeydown = lmao;//sets keydown to do nothing
      //  died();
	      return;
    }
}

var bodyCollision = function bodyCollision() {
    for (var i = 1; i < segment.length; i++) {
        if (currentX == segment[i].getAttribute("x") && currentY == segment[i].getAttribute("y")) {
            console.log("you died");
            clearInterval(IntervalID);
            document.onkeydown = lmao;//sets keydown to do nothing
            died();
            return;
        }
    }
}

var died = function died(){
    c.className = "dead";
    console.log("done");
}

var play = function play(e) {

    segment[0].setAttribute("x", currentX);
    segment[0].setAttribute("y", currentY);
    segment[0].setAttribute("width", snakeWidth);
    segment[0].setAttribute("height", snakeWidth);
    segment[0].setAttribute("fill", "#00FF00");
    c.appendChild(segment[0]);

    var move = function move() {
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
        if (!omNomNom()) {
            segment.unshift(segment.pop());
            segment[0].setAttribute("x",currentX);
            segment[0].setAttribute("y",currentY);
        }
        wallCollision();
        bodyCollision();
    }

    makeFood();
    IntervalID = window.setInterval(move,100);
}

var makeFood = function() {
    console.log("food");
    foodX = Math.floor(Math.random() * (width - foodWidth) / 20) * 20;
    foodY = Math.floor(Math.random() * (height - foodWidth) / 20) * 20;
    for (var i=0; i<segment.length; i++) {
        if (parseInt(segment[i].getAttribute("x")) == foodX &&
                parseInt(segment[i].getAttribute("y")) == foodY) {
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

var makeSegment = function() {
    console.log("segment");
    var seg = document.createElementNS("http://www.w3.org/2000/svg","rect");
    seg.setAttribute("x", foodX);
    seg.setAttribute("y", foodY);
    seg.setAttribute("width", snakeWidth);
    seg.setAttribute("height", snakeWidth);
    seg.setAttribute("fill", "#00FF00");
    currentX = foodX;
    currentY = foodY;
    segment.unshift(seg);
    c.appendChild(seg);
}

document.onkeydown = updateDirection;
play();
