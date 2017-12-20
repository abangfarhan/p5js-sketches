var x;
var y;
var xspace = 10;
var yspace = 10;
var ysign = 1;
var probThreshold = 0.5;

function setup(){
	createCanvas(500, 500);
  background(0);
  stroke(255);
  x = 0;
  y = 0; //height/2;
  //colorMode(HSB);
}

function draw(){
  var ran = random();
  if (ran < probThreshold){
    line(x, y, x+xspace, y+yspace);
    //line(x, height-y, x+xspace, height-y-yspace);
  } else { // if (ran < probThreshold*2) {
    line(x, y+yspace, x+xspace, y);
    //line(x, height-y-yspace, x+xspace, height-y);
  }

  x += xspace;
  if (x > width){
    x = 0;
    y += yspace;
    //yspace += ysign*3;
    //if (yspace > 20 || yspace < 4){
      //ysign *= -1;
    //}
  }
}
