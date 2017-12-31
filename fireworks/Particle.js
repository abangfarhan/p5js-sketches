class Particle {
  constructor(x, y, v, angle) {
    this.x = x;
    this.y = y;
    this.vx = v * cos(angle);
    this.vy = v * sin(angle);
    this.angle = angle;
    this.exploding = false;
    this.childs = [];
  }
  update() {
    if (!this.exploding) {
      this.x += this.vx;
      this.y += this.vy;
      this.vx += gravity[0];
      this.vy += gravity[1];
    } else {
      for (let i = 0; i < this.childs.length; i++) {
        this.childs[i].update();
        this.childs[i].render();
      }
    }
    if (this.vy >= 0 && !this.exploding){
      this.exploding = true;
      this.startExplosion();
    }
  }
  render() {
    if (!this.exploding) {
      stroke(255);
      point(this.x, this.y);
    }
  }
  startExplosion() {
    let n_layers = 5;
    let n_childs = 20;
    for (let i = 0; i < n_layers; i++) {
      for (let j = 0; j < n_childs; j++) {
        this.childs.push(new ParticleChild(this.x, this.y, 0.5 + 0.3*(i+1), j*360/n_childs));
        this.childs[i*n_childs + j].start();
      }
    }
  }
  finished() {
    if (this.childs.length == 0) return false;
    for (let i = 0; i < this.childs.length; i++) {
      if (this.childs[i].visible) return false;
    }
    return true;
  }
}

class ParticleChild extends Particle {
  start() {
    this.startFrame = frameCount;
    this.visible = true;
  }
  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.vx += gravity[0];
    this.vy += gravity[1];
  }
  render() {
    let frameElapsed = frameCount - this.startFrame;
    let maxFrameElapsed = 100; // TODO use static property
    if (frameElapsed < maxFrameElapsed) {
      let greenness = map(frameElapsed, 0, maxFrameElapsed, 0, 255);
      let opacity = map(maxFrameElapsed-frameElapsed, 0, maxFrameElapsed, 0, 100);
      stroke(255, greenness, 0, opacity);
      point(this.x, this.y);
      if (opacity <= 10) {
        this.visible = false;
      }
    }
  }
}
