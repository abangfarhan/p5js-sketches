var maxval = 2;
var minval = -2;
var incr = (maxval-minval)/200;
function setup(){
  createCanvas(500,500);
  background(255);
  strokeWeight(2);
  for (let y=minval; y<maxval; y+=incr){
    for (let x=minval; x<maxval; x+=incr) {
      let xpoint = map(x, -2, 2, 0, width);
      let ypoint = map(y, -2, 2, 0, height);
      if (isDiverge(x, y)){
        stroke(0);
        point(xpoint, ypoint);
      } /*else {
        stroke(200);
        point(xpoint, ypoint);
      } */

      x+=0.05;
      if (x>2) {
        x = -2;
        y+=0.05;
      }
    }
  }
}

function zSquared(x, y) {
  return [x**2-y**2, 2*x*y];
}

function isDiverge(x, y) {
  let z = [0, 0];
  for (let i=0; i<10; i++) {
    let zsq = zSquared(z[0], z[1]);
    z[0] = zsq[0] + x;
    z[1] = zsq[1] + y;
  }
  if (abs(z[0]) > 50)
    return false;
  else
    return true;
}
