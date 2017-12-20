var drops = [];


function setup(){
  createCanvas(500,500);
}

function draw(){
  background(200);
  drops.push(new Drop(250, 500));
  for(let i=drops.length-1; i>=0; i--){
    drops[i].show();
    drops[i].update();
    if (drops[i].x < 0 || drops[i].y < 0)
      drops.splice(i, 1);
  }
}

class Drop {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.dy = -random();
    this.dx = map(random(),0,1,-2,2);
  }

  show() {
    ellipse(this.x, this.y, 10);
  }

  update() {
    this.dy -= 0.1
    this.dx += map(random(),0,1,-0.25,0.25);
    this.y += this.dy;
    this.x += this.dx;
  }
}

// function mouseMoved(){
//   for (let i=0; i<10; i++){
//     drops.push(new Drop(mouseX, mouseY));
//   }
// }
