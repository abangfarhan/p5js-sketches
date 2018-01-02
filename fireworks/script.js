let p1;
let n_particles;
let particles;
let gravity;
let stars;
let n_stars;
let n_layers, n_childs;

function setup(){
	createCanvas(1200, 600);
  angleMode(DEGREES);
  background(0);
  line_scale = 3;
  gravity = [0, 0.05]; // createVector(0, 0.05);
  particles = [];
  n_particles = 10;
  n_layers = 4;
  n_childs = 20;

  let x = random(200, width-200);
  let angle = map(x, 200, width-200, -110, -70);
  p1 = randomParticle();
  // for (let i = 0; i < n_particles; i++) {
  //   let x = random(200, width-200);
  //   let angle = map(x, 200, width-200, -110, -70);
  //   particles.push(new Particle(x, height+50, random(6, 7), angle));
  // }
  n_stars = 100;
  stars = [];
  for (let i = 0; i < n_stars; i++) {
    stars.push([random(width), random(height)]);
  }
}

function draw(){
  drawNightSky();
  strokeWeight(3);
  p1.render();
  p1.update();
  if (p1.finished()) {
    p1 = randomParticle();
  }
  // for (let i = particles.length-1; i >= 0; i--) {
  //   particles[i].render();
  //   particles[i].update();
  //   if (particles[i].finished()) {
  //     particles.splice(i, 1);
  //   }
  // }
}

function randomParticle() {
  let x = random(200, width - 200);
  let angle = map(x, 200, width - 200, -110, -70);
  let p = new Particle(x, height+50, 6, angle);
  return p;
}

function drawNightSky() {
  background(0, 40);
  stroke(255);
  strokeWeight(1);
  for (let i = 0; i < n_stars; i++) {
    point(stars[i][0], stars[i][1]);
  }
}
