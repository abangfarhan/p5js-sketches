let xOff = 0.75;
let yOff = 0.40;
let x, y, sizeBase, sizeOffsetMax, numBoxes, boxGap;

function setup(){
  createCanvas(500,500);
  angleMode(DEGREES);
  stroke(255);
  x = width/2, y = height/2;
  sizeBase = 10;
  sizeOffsetMax = 80;
  numBoxes = 3;
  boxGap = 20;
}

function draw(){
  let phase = (sin(frameCount)+1) / 2;
  let sizeOffset = phase * sizeOffsetMax;
  let size = sizeBase + sizeOffset;
  let boxGap = sizeOffsetMax - sizeOffset + 20;
  //let size = sizeBase;
  background(0);
  beginShape();
  for (let i=0; i<numBoxes; i++) {
    for (let j=0; j<numBoxes; j++) {
      for (let k=0; k<numBoxes; k++) {
        box3D(x + i * (size+boxGap) * xOff
                - j * (size+boxGap) * xOff,
              y + i * (size+boxGap) * yOff
                + j * (size+boxGap) * yOff
                - k * (size+boxGap*0.7),
              size);
      }
    }
  }
  endShape();
}

function boxSide(x, y, size, side) {
  let xSigns, ySigns;
  switch (side) {
    case 'left':
      xSigns = [-xOff, 0, xOff];
      ySigns = [-yOff, 1, yOff];
      break;
    case 'right':
      xSigns = [xOff,  0, -xOff];
      ySigns = [-yOff, 1, yOff];
      break;
    case 'top':
      xSigns = [-xOff, xOff, xOff];
      ySigns = [-yOff, -yOff, yOff];
      break;
  }

  beginShape();
  vertex(x, y);
  for (let i=0; i<3; i++) {
    x += size * xSigns[i];
    y += size * ySigns[i];
    vertex(x, y);
  }
  endShape(CLOSE);
}

function box3D(x, y, size) {
  fill(100, 100, 100);
  boxSide(x, y, size, 'left');
  fill(150, 150, 150);
  boxSide(x, y, size, 'right');
  fill(200, 200, 200);
  boxSide(x, y, size, 'top');
}
