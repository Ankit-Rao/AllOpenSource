const _ROOT = document.documentElement,
_WRAP = document.querySelector('.wrap'),
_FLOOD = document.querySelector('#shadow feFlood');

addEventListener('click', e => {
  _ROOT.classList.toggle('dark');
  _ROOT.classList.toggle('light');

  /* get around Chrome bug :( */
  _FLOOD.setAttribute('flood-color', getComputedStyle(_WRAP).color);
}, false);