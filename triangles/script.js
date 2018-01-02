// creating from scratch.
// the result is not what I had in mind
// this is what I had in mind https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Delaunay_Triangulation_%28100_Points%29.svg/250px-Delaunay_Triangulation_%28100_Points%29.svg.png
// I possibly approach this problem wrongly
// probably have to use https://en.wikipedia.org/wiki/Delaunay_triangulation

// the triangle overlap test is very far from correct
// need to check if lines are intersected too
// see https://stackoverflow.com/questions/1585459/whats-the-most-efficient-way-to-detect-triangle-triangle-intersections

let dots = [];
let n_dots = 6;
let triangles = [];
let res = 15;
let random_offset = 3;

function setup(){
  angleMode(DEGREES);
	createCanvas(1000, 600);
  strokeWeight(1);
  stroke(0);
  noFill();
  for (let i = 0; i < n_dots; i++) {
    dots.push([random(width), random(height)]);
  }
}

function draw() {
  background(255, 150);
  triangles = [];
  makeTriangles();
  for (let i = 0; i < triangles.length; i++) {
    strokeWeight(1);
    triangle.apply(this, triangles[i]);
  }

  for (let i = 0; i < dots.length; i++) {
    dots[i][0] += random(-random_offset, random_offset);
    dots[i][1] += random(-random_offset, random_offset);
    if (dots[i][0] < 0) dots[i][0]      = 0;
    if (dots[i][0] > width) dots[i][0]  = width;
    if (dots[i][1] < 0) dots[i][1]      = 0;
    if (dots[i][1] > height) dots[i][1] = height;
  }
}

function pointInTriangle(pt, tr) {
  let angleSum = 0;
  let tr_p1 = [tr[0], tr[1]];
  let tr_p2 = [tr[2], tr[3]];
  let tr_p3 = [tr[4], tr[5]];
  let tr_points = [tr_p1, tr_p2, tr_p3, tr_p1];
  for (let i = 0; i < tr_points.length-1; i++) {
    let d1 = dist(
      tr_points[i][0], tr_points[i][1],
      tr_points[i+1][0], tr_points[i+1][1]
    );
    let d2 = dist(
      tr_points[i][0], tr_points[i][1],
      pt[0], pt[1]
    );
    let d3 = dist(
      tr_points[i+1][0], tr_points[i+1][1],
      pt[0], pt[1]
    );

    angleSum += getAngle(d1, d2, d3);
  }
  return round(angleSum) == 360;
}

function getAngle(d1, d2, d3) {
  // return angle opposite to d1
  // Law of Cosines
  // c^2 = a^2 + b^2 - 2*a*b*cos(angle)
  // cos(angle) = (a^2 + b^2 - c^2)/(2*a*b)
  // angle = acos(cos(angle))
  let cos_angle = (d2**2 + d3**2 - d1**2)/(2*d2*d3);
  let angle = acos(cos_angle);
  return angle;
}

function pointInAnyTriangle(pt) {
  for (let i = 0; i < triangles.length; i++) {
    if (pointInTriangle(pt, triangles[i]))
      return true;
  }
  return false;
}

function makeTriangles() {
  for (let x = 0; x < width; x += res) {
    for (let y = 0; y < height; y += res) {
      // strokeWeight(1);
      // point(x, y);
      if (pointInAnyTriangle([x, y])) continue;
      let nearestDots = nearestThreeDots([x, y]);
      if (pointInTriangle([x, y], nearestDots) && !triangleOverlapAny(nearestDots)) {
        triangles.push(nearestDots);
        // strokeWeight(3);
        // point(x, y);
      }
    }
  }
}

function nearestThreeDots(pt) {
  let distances = [];
  for (let i = 0; i < dots.length; i++) {
    let d = dist(pt[0], pt[1], dots[i][0], dots[i][1]);
    distances.push([dots[i], d])
  }
  distances.sort((a, b)=>{return a[1] - b[1]});
  let nearestDots = [];
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 2; j++) {
      nearestDots.push(distances[i][0][j]);
    }
  }
  return nearestDots;
}

function twoTrianglesOverlapped(tr1, tr2) {
  // check if any point in tr1 is inside tr2
  for (let i = 0; i < tr1.length-1; i++) {
    if (pointInTriangle([tr1[i], tr1[i+1]], tr2))
      return true;
  }
  return false;
}

function triangleOverlapAny(tr) {
  for (let i = 0; i < triangles.length; i++) {
    if (twoTrianglesOverlapped(tr, triangles[i]))
      return true;
  }
  return false;
}

function mousePressed() {
  dots.push([mouseX, mouseY]);
}
