var waveHeight = 30;
var space;
var xoff = 0;
var yoff = 0;
var xspeed = 5;

function setup(){
  createCanvas(500,500);
  angleMode(DEGREES);
}

function draw(){
  background(0);
  stroke(255);
  noFill();

  space = 3; //map(mouseX, 0, width, 0, 10);
  //xspeed = map(mouseX, 0, width, 5, 50);

  let a;

  beginShape();
  a = 0;
  for(let i=0; i<width; i++){
    vertex(i, 100 + sin(a+xoff) * waveHeight);
    a += space;
  }
  endShape();

  xoff += xspeed;
}
