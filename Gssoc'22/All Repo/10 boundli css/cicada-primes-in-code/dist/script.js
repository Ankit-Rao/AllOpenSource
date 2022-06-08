const _WING_UPPER = document.querySelector('.wing.upper'),
_WING_LOWER = document.querySelector('.wing.lower'),
T_UPPER = 7,T_LOWER = 5,
ANG_AMP = 3;

let rID = null;

function fly(t = 0) {
  let a = +(ANG_AMP * Math.sin(t / T_UPPER * 2 * Math.PI)).toFixed(3);
  _WING_UPPER.setAttribute('transform', `rotate(${a} 101 97)`);
  a = +(ANG_AMP * Math.sin(t / T_LOWER * 2 * Math.PI)).toFixed(3);
  _WING_LOWER.setAttribute('transform', `rotate(${a} 97 67)`);

  rID = requestAnimationFrame(fly.bind(this, ++t));
};

fly();