const _B = document.body,
_A = document.getElementById('a'),
MX = +_A.max,
COND = CSS.registerProperty;

let _hl = _B.querySelector('.hl'),
prv = +_A.value,rID = null,
pressed = false,updating = false;

function update() {
  _A.value = +getComputedStyle(_B).getPropertyValue('--a');
  rID = requestAnimationFrame(update);
};

_A.addEventListener('input', e => {
  let val = +_A.value,
  _eq = _B.querySelector(`[type='button'][value='${val}']`);

  _B.style.setProperty('--f', +(Math.abs(prv - val) / MX).toFixed(2));
  _B.style.setProperty('--a', prv = val);

  if (_eq) {
    _hl = _eq;
    _hl.classList.add('hl');
  } else
  if (_hl) {
    _hl.classList.remove('hl');
    _hl = null;
  }
}, false);

addEventListener('click', e => {
  let _tg = e.target;

  if (_tg.type && _tg.type === 'button') {
    let val = +_tg.value;

    _B.style.setProperty('--f', +(Math.abs(prv - val) / MX).toFixed(2));
    _B.style.setProperty('--a', prv = val);

    if (_hl) _hl.classList.remove('hl');
    _hl = _tg;
    _hl.classList.add('hl');

    if (!COND || pressed) _A.value = val;
  }
}, false);

_A.addEventListener('mousedown', e => {pressed = true;}, false);
_A.addEventListener('mouseup', e => {
  pressed = false;
  if (updating) update();
}, false);

addEventListener('transitionstart', e => {
  updating = true;
  if (!pressed) update();
}, false);

addEventListener('transitionend', e => {
  updating = false;
  cancelAnimationFrame(rID);
  rID = null;
}, false);

if (COND) {
  CSS.registerProperty({
    name: '--a',
    syntax: '<integer>',
    initialValue: +_A.value,
    inherits: true });

}