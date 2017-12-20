let ndrops = 50;
let drops = [];
const MAX_R = 200;

function setup(){
  createCanvas(500,500);
  for (let i=0; i<ndrops; i++){
    drops.push(new Drop(random()*width, random()*height));
  }
}

function draw(){
  background(200);
  for (let i=0; i<ndrops; i++){
    drops[i].show();
    drops[i].update();
  }
}

class Drop{
  constructor(x,y){
    this.x = x;
    this.y = y;
    this.r = 1;
    this.rdelta = 2 + random()*2;
  }

  show(){
    noFill();
    ellipse(this.x, this.y, this.r);
  }

  update(){
    this.r += this.rdelta;
    if (this.r > MAX_R){
      this.r = 1;
      this.x = random()*width;
      this.y = random()*height;
    }
  }
}
