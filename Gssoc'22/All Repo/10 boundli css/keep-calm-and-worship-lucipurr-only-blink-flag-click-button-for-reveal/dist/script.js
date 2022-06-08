const _BODY = document.body,
_GRID = document.querySelector('.grid');

if (CSS.registerProperty) {
  CSS.registerProperty({
    name: '--a',
    syntax: '<angle>',
    initialValue: '0deg',
    inherits: false });


  CSS.registerProperty({
    name: '--p',
    syntax: '<number>',
    initialValue: '1',
    inherits: false });

}

addEventListener('input', e => {
  let _tg = e.target;

  switch (_tg.id) {
    case 'fork-r':
      _BODY.style.setProperty('--y2', _tg.value);
      break;
    case 'iris-c':
      _BODY.style.setProperty(`--${_tg.id}`, _tg.nextElementSibling.textContent = _tg.value);
      break;
    default:
      _BODY.classList.toggle(_tg.name);}

}, false);

addEventListener('click', e => {
  let _t = e.target;

  if (_t.id === 'summon') {
    _t.classList.add('invis');
  }
}, false);

addEventListener('transitionend', e => {
  let _t = e.target;

  if (_t.id === 'summon') {
    _BODY.removeChild(_t);
    _GRID.classList.remove('invis');
  }
}, false);