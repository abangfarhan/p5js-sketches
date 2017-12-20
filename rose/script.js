var r = 200;
var n;
var d;
var k;
var stepSize = 1;
var maxVal = 100;
var sliderN;
var sliderD;

function setup(){
  createCanvas(500,500);
  angleMode(DEGREES);
  stroke(255);
  noFill();

  sliderN = createSlider(0, maxVal, 9, stepSize);
  sliderN.position(10, height+10);
  sliderN.size(width);

  sliderD = createSlider(0, maxVal, 7, stepSize);
  sliderD.position(10, height+40);
  sliderD.size(width);
}

function draw(){
  background(0);

  n = sliderN.value();
  d = sliderD.value();
  k = n/d;

  text('n = ' + n, 10, height-50);
  text('d = ' + d, 10, height-30);

  translate(width/2, height/2);
  beginShape();
  for (let i=0; i<=360*d; i+=1) {
    let x = r * cos(k*i) * cos(i);
    let y = r * cos(k*i) * sin(i);
    vertex(x, y);
  }
  endShape();
}
