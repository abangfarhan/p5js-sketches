var nPoints = 6;
var angleSpace = 360/6;
var d = 100;
var r = d/2;
var xstart = 0;
var ystart = 0;
var hexSpace; ////

function setup() {
  createCanvas(500,500);
  angleMode(DEGREES);
  background(0);
  hexSpace = tan(angleSpace) * r; ////
}

function draw() {
  stroke(255);
  noFill();
  rotate(90);

  translate(ystart, -xstart);
  beginShape();
  for (let i=0; i<=360; i+=angleSpace) {
    let x = r * cos(i);
    let y = r * sin(i);
    vertex(x, y);
  }
  endShape();

  xstart += hexSpace;
  if (xstart > width+r) {
    xstart = r;
    ystart += d;
  }
}
