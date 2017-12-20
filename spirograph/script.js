var radii = [150, 45];
var angle_increment;
var angles = [];
var density = 4;
var x;
var y;
var prev_x = [];
var prev_y = [];
var n;

function setup(){
  createCanvas(500,500);
  background(255);
  angleMode(DEGREES);
  stroke(0);
  strokeWeight(0.5);
  n = radii.length;
  angle_increment = [1, Math.E];

  x = 0;
  y = 0;
  translate(width/2, height/2);
  for (let i=0; i<n; i++){
    angles[i] = 0;
    angle_increment[i] *= density;
    x += radii[i] * cos(angles[i]);
    y += radii[i] * sin(angles[i]);
    prev_x[i] = x;
    prev_y[i] = y;
    angles[i] += angle_increment[i];
    if (angles[i] > 360 || angles[i] < -360)
      angles[i] = angles[i] % 360;
  }
}

function draw(){
  //x = width/2;
  //y = height/2;
  x = 0;
  y = 0;
  translate(width/2, height/2);
  for (let i=0; i<n; i++){
    x += radii[i] * cos(angles[i]);
    y += radii[i] * sin(angles[i]);
    if (i == n-1) {
      //point(x, y);
      line(prev_x[i], prev_y[i], x, y);
    }
    prev_x[i] = x;
    prev_y[i] = y;
    angles[i] += angle_increment[i];
    if (angles[i] > 360 || angles[i] < -360)
      angles[i] = angles[i] % 360;
  }
}
