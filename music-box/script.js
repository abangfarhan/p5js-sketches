let note_duration = 120;
let playing = setInterval(play, note_duration);
let start_position;
let end_position;
let position;
let t0 = currentTime();

let key_space = 15;
let y_base;
let x_pad;
let paper_pad;
let paper_width = 200;

function setup(){
  createCanvas(600, 500);
  angleMode(DEGREES);

  y_base = height/2;

  start_position = -round(y_base/key_space);
  end_position = round((height - y_base)/key_space);
  position = start_position;

  x_pad = (width - paper_width)/2;
  //paper_width = width - x_pad*2;
  let line_space = paper_width/(KEYS.length - 1);
  paper_width += 2*line_space;
  paper_pad = (width - paper_width)/2;

}

function draw(){
  background('#3D3745');
  makeCard();
  translate(0, y_base);
  makeBox('big');

  // draw paper
  noStroke();
  fill(255);
  rect(paper_pad, -y_base, paper_width, height);

  // draw vertical stripes
  stroke(210);
  strokeWeight(1);
  for (let i = 0; i < KEYS.length; i++) {
    let x = map(i, 0, KEYS.length-1, x_pad, width-x_pad);
    line(x, -y_base, x, height);
  }

  let t1 = currentTime();
  let dt = t1 - t0;
  let y_offset = map(dt, 0, note_duration, 0, key_space);

  // draw horizontal stripes
  for (let i = 0; i < (height/key_space); i++) {
    let y = (start_position * key_space) + (i * key_space + y_offset);
    line(x_pad, y, width-x_pad, y);
  }

  // draw red line
  stroke('#ff0000');
  strokeWeight(2);
  line(paper_pad, 0, paper_pad+paper_width, 0);

  // draw holes
  fill(0);
  noStroke();
  //let t1 = currentTime();
  //let dt = t1 - t0;
  for (let i = 0; i < song.length; i++) {
    let dist = position - i - 1;
    // play() is executed after canvas is rendered
    // so the note played will always be 1 step too late 
    // relative to the notes rendered if we don't substract 1
    let y = dist * key_space + y_offset;
    for (let j = 0; j < song[i].length; j++) {
      let x = map(KEYS.indexOf(song[i][j]), 0, KEYS.length-1, x_pad, width-x_pad);
      if (x >= x_pad) ellipse(x, y, 10, 10);
    }
  }

  makeBox('small');

  if (position >= song.length + end_position) {
    position = start_position;
    //clearInterval(playing);
    //noLoop();
  }
}

function play() {
  let notes = song[position] || '-';
  for (let i = 0; i < notes.length; i++) {
    let note = notes[i];
    let freq = NOTES[note] || 0;
    createOscillator(freq, note_duration);
  }
  position++;
  t0 = currentTime();
}

function currentTime() {
  // return unix time in miliseconds
  let t = new Date();
  return t.getTime();
}

function makeBox(type) {
  let box_width = paper_width * 1.2;
  let box_height = 100;
  let c = '#B27933';

  if (type === 'big') {
    box_width = box_width * 1.2;
    box_height = box_height * 2.5;
    c = '#705028';
  }

  let y_start = -(box_height/2);
  let x_start = (width - box_width)/2;

  // shadow only for big box
  if (type == 'big') {
    beginShape();
    noStroke();
    let opacity = 30;
    fill(0, 0, 0, opacity);
    vertex(x_start, y_start + box_height);
    vertex(x_start + box_width, y_start);

    vertex(x_start + box_width + 500, y_start + 500);
    vertex(x_start + 500, y_start + box_height + 500);
    endShape();
  }

  noStroke();
  fill(c);
  rect(x_start, y_start, box_width, box_height);

  if (type == 'big') {
    // text
    let pad_bottom = 5;
    let pad_left = 5;
    let x = x_start + box_width - pad_left;
    let y = y_start + box_height - pad_bottom;

    push();
    fill(0);
    textFont('Unica One');
    translate(x, y);
    rotate(-90);
    textSize(15);
    textAlign(LEFT);
    text('Music Box 1.0', 0, 0);
    pop();

  } else if (type == 'small') {
    let x = x_start + box_width/2;
    let y = y_start + box_height/2 - 10;
    push();
    fill(0);
    textSize(30);
    textAlign(CENTER);
    textFont('Dancing Script');
    text('Just enjoy\nthe music', x, y);
    pop();
  }
}

function makeCard() {
  let x = width - 5;
  let y = height - 10;
  fill(255);
  textSize(25);
  textAlign(RIGHT);
  textFont('Great Vibes');
  text('Hey there', x, y);
}
