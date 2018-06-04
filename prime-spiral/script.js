let r = 4;
let step = r;
let num = 1;
let tur;
let max_down=0,
  max_up=0,
  max_left=0,
  max_right=0;
let base_primes = [2, 3, 5, 7, 11, 13, 19, 23, 29, 31, 37];

function setup(){
	createCanvas(700, 700);
	background(255);
  noStroke();
  tur = new Turtle(step);
}

function draw(){
  translate(width/2, height/2);
  if (isPrime(num)) {
    fill(0);
  } else {
    fill(255);
  }
  rect(tur.x, tur.y, r, r);
  tur.move();
  num++;
  if (tur.direction() === 'down') {
    if (tur.y > max_down) {
      tur.turn();
      max_down = tur.y;
    }
  }
  else if (tur.direction() === 'up') {
    if (tur.y < max_up) {
      tur.turn();
      max_up = tur.y;
    }
  }
  else if (tur.direction() === 'right') {
    if (tur.x > max_right) {
      tur.turn();
      max_right = tur.x;
    }
  }
  else if (tur.direction() === 'left') {
    if (tur.x < max_left) {
      tur.turn();
      max_left = tur.x;
    }
  }
}

function isPrime(num) {
  for (let i of base_primes) {
    if (num == i) return true;
    if (num != i && num%i == 0) return false;
  }

  let i = base_primes[base_primes.length - 1] + 2;
  while (i < num) {
    if (isPrime(i) && num != i && num%i == 0)
      return false;
    i += 2;
  }

  if (num == 1) return false;

  base_primes.push(num);
  return true;
}

class Turtle {
  constructor(step) {
    this.x = 0;
    this.y = 0;
    this.step = step;
    this.dx = 0;
    this.dy = this.step;
  }
  direction() {
    if (this.dx == 0 && this.dy == this.step) {
      return 'down';
    }
    if (this.dx == 0 && this.dy == -this.step) {
      return 'up';
    }
    if (this.dx == this.step && this.dy == 0) {
      return 'right';
    }
    if (this.dx == -this.step && this.dy == 0) {
      return 'left';
    }
  }
  turn() {
    if (this.direction() == 'down') {
      this.dx = this.step;
      this.dy = 0;
      return;
    }
    if (this.direction() == 'right') {
      this.dx = 0;
      this.dy = -this.step;
      return;
    }
    if (this.direction() == 'left') {
      this.dx = 0;
      this.dy = this.step;
      return;
    }
    if (this.direction() == 'up') {
      this.dx = -this.step;
      this.dy = 0;
      return;
    }
  }
  move() {
    this.x += this.dx;
    this.y += this.dy;
  }
}
