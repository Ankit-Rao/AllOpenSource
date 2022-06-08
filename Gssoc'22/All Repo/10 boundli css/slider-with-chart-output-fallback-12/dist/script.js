const _R = document.getElementById('r'),
_W = _R.parentNode,
_O = document.createElement('output');

let val = null;

function update() {
  let newval = +_R.value;

  if (val !== newval)
  _W.style.setProperty('--val', _O.value = val = newval);
};

update();

_O.setAttribute('for', _R.id);
_W.appendChild(_O);

if (getComputedStyle(_O).backgroundImage !== 'none')
_W.classList.add('full');

addEventListener('input', update, false);
addEventListener('change', update, false);