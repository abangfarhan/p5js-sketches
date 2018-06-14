let points;
let slider_angle;
let max_iter_is_increasing = 1;

function setup() {
  createCanvas(900, 600);
  angleMode(DEGREES);
  strokeWeight(2);
  noFill();

  slider_angle = createSlider(90, 270, 90);
  slider_angle.position(10, 15);
}

function draw() {
  frameRate(30);
  background(240);
  points = [];
  points[0] = [100, 400];
  points[1] = [650, 400];

  let max_iter = map(frameCount%100, 0, 100, 0, 14);
  for(let i=0; i < max_iter; i++) {
    let angle = slider_angle.value();
    for(let j=points.length - 1; j > 0; j--) {
      let newP = newPoint(points[j], points[j-1], angle);
      points.splice(j, 0, newP);
      angle = angle * -1;
    }
  }

  beginShape();
  for(let pi of points) {
    vertex(pi[0], pi[1]);
  }
  endShape();
}

function newPoint(p1, p2, angle) {
  distance = sqrt((p1[0]-p2[0])**2 + (p1[1]-p2[1])**2);
  let angleRotation = (180 - angle)/2;
  let newLength = distance/sin(angle) * sin(angleRotation);
  /* NOTE
   * sin(a + b) = sin(a)cos(b) + cos(a)sin(b)
   * cos(a + b) = cos(a)cos(b) - sin(a)sin(b)
   */
  sinB = (p2[1] - p1[1]) / distance;
  cosB = (p2[0] - p1[0]) / distance;
  sinAB = sin(angleRotation) * cosB + cos(angleRotation) * sinB;
  cosAB = cos(angleRotation) * cosB - sin(angleRotation) * sinB;
  let p3 = [];
  p3[0] = p1[0] + newLength * cosAB;
  p3[1] = p1[1] + newLength * sinAB;
  return p3;
}
