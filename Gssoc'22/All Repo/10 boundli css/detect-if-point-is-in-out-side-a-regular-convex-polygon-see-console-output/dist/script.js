const _C = document.getElementById('c') /* canvas element */,
C = _C.getContext('2d') /* 2L canvas context */,
D = _C.width /* edge length of canvas square */,
FN = ['line', 'move'];

function rand(max = 1, min = 0, dec = 0) {
  return +(min + (max - min) * Math.random()).toFixed(dec);
};

class Point {
  constructor(x, y) {
    this.pos = [
    x || x === 0 ? x : rand(D),
    y || y === 0 ? y : rand(D)];

  }

  static dist(a, b) {
    return Math.hypot(...a.pos.map((c, i) => c - b.pos[i]));
  }}
;

class RegConvPoly {
  constructor() {
    this.op = new Point();
    this.n = rand(8, 3);
    this.rc = rand(.375 * D, .1 * D);
    this.β = 2 * Math.PI / this.n;
    this.ri = this.rc * Math.cos(.5 * this.β);
    this.φ = rand(this.β, 0, 2);
    this.γ = [];
    this.vx = [];

    for (let k = 0; k < this.n; k++) {
      this.γ.push((this.φ + k * this.β) % (2 * Math.PI));
      this.vx.push(new Point(this.op.pos[0] + this.rc * Math.cos(this.γ[k]), this.op.pos[1] + this.rc * Math.sin(this.γ[k])));
    }
  }}
;

function testCase() {
  const poly = new RegConvPoly(),
  point = new Point(),
  /* distance between point & poly circum/incentre */
  dist = Point.dist(point, poly.op);

  console.clear();

  C.clearRect(0, 0, D, D);
  C.setLineDash([9]);

  C.beginPath();
  C.moveTo(...poly.op.pos);
  C.lineTo(...point.pos);

  switch (true) {
    case dist > poly.rc:
      console.log('distance greater than circumradius => point outside polygon circumcircle => point is OUTSIDE POLYGON');
      C.moveTo(poly.op.pos[0] + poly.rc, poly.op.pos[1]);
      C.arc(...poly.op.pos, poly.rc, 0, 2 * Math.PI);
      break;
    case dist < poly.ri:
      console.log('distance smaller than inradius => point inside polygon incircle => point is INSIDE POLYGON');
      C.moveTo(poly.op.pos[0] + poly.ri, poly.op.pos[1]);
      C.arc(...poly.op.pos, poly.ri, 0, 2 * Math.PI);
      break;
    default:
      console.log('distance smaller than circumradius, but greater than inradius => point inside polygon circumcircle, but outside polygon incircle');
      C.moveTo(poly.op.pos[0] + poly.rc, poly.op.pos[1]);
      C.arc(...poly.op.pos, poly.rc, 0, 2 * Math.PI);
      C.moveTo(poly.op.pos[0] + poly.ri, poly.op.pos[1]);
      C.arc(...poly.op.pos, poly.ri, 0, 2 * Math.PI);

      /* angle of line L connecting point to polygon circum/incentre w.r.t. horizontal */
      let α = Math.atan2(...point.pos.map((c, i) => c - poly.op.pos[i]).reverse());
      if (α < 0) α += 2 * Math.PI;
      console.log(`compute angle of line to point w.r.t. horizontal: ${+(α * 180 / Math.PI).toFixed(2)}° (taken in the [0°, 360°) interval)`);

      /* get angle between line L and circumradius to closest vertex */
      let δ = Math.min(...poly.γ.map(c => {
        let d = Math.abs(α - c);

        return d > Math.PI ? 2 * Math.PI - d : d;
      }));
      console.log(`compute angle between line to point and circumradius to nearest vertex to point: ${+(δ * 180 / Math.PI).toFixed(2)}°`);
      console.log(`compute angle between line to point and inradius perpendicular on nearest edge to point: ${+((.5 * poly.β - δ) * 180 / Math.PI).toFixed(2)}°`);

      /* hypotenuse of right triangle formed */
      let hypot = poly.ri / Math.cos(.5 * poly.β - δ);
      console.log('compute hypotenuse of right triangle formed by line to point, nearest edge to point and perpendicular to this edge');

      switch (true) {
        case dist > hypot:
          console.log('distance to point greater than this hypotenuse => point is OUTSIDE POLYGON');
          break;
        case dist < hypot:
          console.log('distance to point smaller than this hypotenuse => point is INSIDE POLYGON');
          break;
        default:
          console.log('distance to point equal to this hypotenuse => point is ON A POLYGON EDGE 🙀');}}



  C.stroke();

  C.setLineDash([]);

  /* draw poly */
  C.beginPath();
  poly.vx.forEach((v, k) => C[`${FN[0 ** k]}To`](...v.pos));
  C.closePath();
  C.stroke();

  /* draw points */
  C.beginPath();
  C.arc(...poly.op.pos, 5, 0, 2 * Math.PI);
  C.arc(...point.pos, 5, 0, 2 * Math.PI);
  C.closePath();
  C.fill();
}

function init() {
  C.fillStyle = 'hotpink';
  C.strokeStyle = 'white';
  C.lineWidth = 2;
};

init();

testCase();

_C.addEventListener('click', e => {
  testCase();
}, false);