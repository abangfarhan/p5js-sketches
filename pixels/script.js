class Ripple {
  constructor(x_center, y_center) {
    this.x_center = x_center || random(-100, width+100);
    this.y_center = y_center || random(-100, height+100);
    this.r = 0.01;
    this.r_delta = 5;
    this.angle_scaler = 1.5
    this.r_max = 300;
  }
  update() {
    this.r += this.r_delta;
  }
  render() {
    for (let a = 0.1; a < TWO_PI + 1; a += this.angle_scaler * TWO_PI/this.r) {
      let y = sin(a) * this.r + this.x_center;
      let x = cos(a) * this.r + this.y_center;
      drawPixel(x, y);
    }
  }
}

let r;
let pixelSize;
let ripple;
function setup(){
	createCanvas(500, 500);
  fill(0);
  stroke(0);

  r = 0.1;
  pixelSize = 8;
  ripple = new Ripple(width/2, height/2);
  // frameRate(10);
}

function draw(){
  background(200);
  ripple.render();
  ripple.update();
  if (ripple.r > ripple.r_max)
    ripple.r = 0.01;
}

function drawPixel(x, y) {
  let x_pixel = floor(x/pixelSize);
  let y_pixel = floor(y/pixelSize);
  rect(x_pixel * pixelSize, y_pixel * pixelSize, pixelSize, pixelSize);
}

