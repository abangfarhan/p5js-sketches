let points;
let slider_iter;
let slider_angle;

function setup() {
  createCanvas(900, 600);
  angleMode(DEGREES);
  strokeWeight(2);
  noFill();

  slider_iter = createSlider(0, 14, 1);
  slider_iter.position(5, 0);

  slider_angle = createSlider(90, 270, 90);
  slider_angle.position(5, 20);
}

function draw() {
  background(240);
  points = [];
  points[0] = [100, 400];
  points[1] = [650, 400];

  for(let i=0; i < slider_iter.value(); i++)
    updatePoints();

  beginShape();
  // for(let i=0; i < points.length; i++) {
  for(let pi of points) {
    vertex(pi[0], pi[1]);
  }
  endShape();
}

function updatePoints() {
  let angle = slider_angle.value(); // (180 - slider_angle.value())/2;
  for(let i=points.length - 1; i > 0; i--) {
    let newP = newPoint(points[i], points[i-1], angle);
    points.splice(i, 0, newP);
    angle = angle * -1
  }
}

function newPoint(p1, p2, angle) {
  distance = sqrt((p1[0]-p2[0])**2 + (p1[1]-p2[1])**2);
  let angleRotation = (180 - angle)/2;
  let newLength = distance/sin(angle) * sin(angleRotation);
  sinB = (p2[1] - p1[1]) / distance;
  cosB = (p2[0] - p1[0]) / distance;
  sinAB = sin(angleRotation) * cosB + cos(angleRotation) * sinB;
  cosAB = cos(angleRotation) * cosB - sin(angleRotation) * sinB;
  let p3 = [];
  p3[0] = p1[0] + newLength * cosAB;
  p3[1] = p1[1] + newLength * sinAB;
  return p3;
}

// function newPoint(p1, p2, angle) {
//   distance = sqrt((p1[0]-p2[0])**2 + (p1[1]-p2[1])**2);
//   let newLength = distance / sqrt(2);
//   /* NOTE
//    * sin(a + b) = sin(a)cos(b) + cos(a)sin(b)
//    * cos(a + b) = cos(a)cos(b) - sin(a)sin(b)
//    */
//   sinB = (p2[1] - p1[1]) / distance;
//   cosB = (p2[0] - p1[0]) / distance;
//   sinAB = sin(angle) * cosB + cos(angle) * sinB;
//   cosAB = cos(angle) * cosB - sin(angle) * sinB;
//   let p3 = [];
//   p3[0] = p1[0] + newLength * cosAB;
//   p3[1] = p1[1] + newLength * sinAB;
//   return p3;
// }
