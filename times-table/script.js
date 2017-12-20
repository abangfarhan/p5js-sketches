let r = 200;
let N = 300;
let T;
var sliderT;

function setup(){
  createCanvas(500, 500);
  angleMode(DEGREES);
  stroke(0);
  strokeWeight(0.5);

  sliderT = createSlider(0, 50, 2, 1);
  sliderT.position(10, height+10);
  sliderT.size(width);
}

function draw(){
  background(255);
  T = sliderT.value();
  translate(width/2, height/2);
  // for(let i=0; i<360; i+=360/N){
  for(let i=0; i<N; i++){
    let x = r * cos(i*360/N);
    let y = r * sin(i*360/N);

    let x2 = r * cos(T*i*360/N);
    let y2 = r * sin(T*i*360/N);
    line(x, y, x2, y2);
  }
}
