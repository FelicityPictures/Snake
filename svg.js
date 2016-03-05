var c = document.getElementById("canvas");
var currentX = 200;
var currentY = 200;
var direction;
/*
  direction 1 = up (38)
  direction 2 = right (39)
  direction 3 = down (40)
  direction 4 = left (37)
*/

var play = function play(e){
    console.log(e.keyCode);
        var r = document.createElementNS("http://www.w3.org/2000/svg","rect");
        r.setAttribute("x",currentX);
        r.setAttribute("y",currentY);
        r.setAttribute("width",20);
        r.setAttribute("height",20);
        c.appendChild(r);
    if (e.keyCode == 38) {
        direction=1;
    }else{
        if(e.keyCode == 39){
            direction = 2;
        }else{
            if(e.keyCode == 40){
                direction = 3;
            }else{
                if(e.keyCode == 37){
                    direction = 4;
                }
           }
        }
    }
    console.log("direction: " + direction);
    var move = function move(){
        if(direction==1){
            y=y-20;
        }else{
            if(direction==2){
                x=x+20;
            }else{
                if(direction==3){
                    y=y+20;
                }else{
                    if(direction==4){
                        x=x-20;
                    }
                }
            }
        }
    }
    move();
}
document.onkeydown = play;
