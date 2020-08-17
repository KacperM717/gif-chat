class Leaf {
  constructor(x, y) {
    this.running = true;
    this.x = x;
    this.y = y;
    this.dx = 0;
    this.dy = 0;
    this.ddx = 0;
  }

  update() {
    this.ddx = Math.random() - 0.5;

    this.dx += this.ddx;
    this.dy = 1 + Math.random() * 2 - 1;

    this.x += this.dx;
    this.y += this.dy;
  }
}
