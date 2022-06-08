const sel = '.rotor' /* selector */,
/* the rotor element */
_r = document.querySelector(sel),
/* a new style element */
_s = document.createElement('style'),
dcls = 'drag' /* drag signalling class name */;

let drag = false,x0 = null,y0 = null;

let getE = function (ev) {
  return ev.touches ? ev.touches[0] : ev;
};

let lock = function (ev) {
  let e = getE(ev);

  drag = true;
  x0 = e.clientX;
  y0 = e.clientY;
  _r.classList.add(dcls);
};

let act = function (ev) {
  if (drag) {
    let e = getE(ev),
    x = e.clientX,y = e.clientY,
    dx = x - x0,dy = y - y0,
    d = Math.hypot(dx, dy);

    if (d) {
      let i = (-dy / d).toFixed(5) /* x comp of rot axis */,
      j = (dx / d).toFixed(5) /* y comp of rot axis */,
      a = (.2 * d).toFixed(2) /* rotation angle in deg */,
      c = 'rotate3d(' + [i, j, 0, a] + 'deg)' +
      getComputedStyle(_r).transform.
      replace('none', ''); /* transform chain */
      _s.textContent = sel + '{transform:' + c + ';}';
    }

    x0 = x;
    y0 = y;
  }
};

let release = function () {
  if (drag) {
    drag = false;
    x0 = y0 = null;
    _r.classList.remove(dcls); // OK
  }
};

document.body.appendChild(_s);

addEventListener('mousedown', lock, false);
addEventListener('touchstart', lock, false);

addEventListener('mousemove', act, false);
addEventListener('touchmove', act, false);

addEventListener('mouseup', release, false);
addEventListener('touchend', release, false);