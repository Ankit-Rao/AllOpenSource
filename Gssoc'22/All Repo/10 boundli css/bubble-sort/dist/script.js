addEventListener('load', e => {
  let _BUBBLES = [...document.querySelectorAll('.bubble')].map(c => ({ el: c, rd: +c.style.getPropertyValue('--rd') })),
  NB = _BUBBLES.length,
  _BTN_SORT = document.getElementById('sort'),
  _BTN_RAND = document.getElementById('rand');

  let idx = 1,swap = false;

  function rand() {
    let avg = 100 / (NB + 2),
    dif = ~~(.5 * NB),
    min = NB - dif,
    max = NB + dif;

    for (let i = 0; i < NB; i++) {
      let rd = +(min + 2 * dif * Math.random()).toFixed(2);
      _BUBBLES[i].el.style.setProperty('--rd', rd);
      _BUBBLES[i].rd = rd;
    }

    _BTN_SORT.disabled = false;
  };

  function move() {
    if (idx === NB - 1) {
      if (swap) {
        idx = 1;
        swap = false;
      } else
      {
        idx = 1;
        swap = false;
        _BTN_RAND.disabled = false;
        return;
      }
    } else
    ++idx;
    sort();
  }

  function sort() {
    if (_BUBBLES[idx - 1].rd > _BUBBLES[idx].rd) {
      _BUBBLES[idx - 1].el.style.setProperty('--i', idx);
      _BUBBLES[idx].el.style.setProperty('--i', idx - 1);
      [_BUBBLES[idx - 1], _BUBBLES[idx]] = [_BUBBLES[idx], _BUBBLES[idx - 1]];
      swap = true;
    } else
    move();
  };

  addEventListener('transitionend', e => {
    if (_BTN_SORT.disabled && e.target === _BUBBLES[idx].el) move();
  }, false);

  addEventListener('click', e => {
    let _t = e.target;

    if (_t === _BTN_SORT) {
      _BTN_RAND.disabled = true;
      _BTN_SORT.disabled = true;
      sort();
      return;
    }
    if (_t === _BTN_RAND) rand();
  }, false);
}, false);