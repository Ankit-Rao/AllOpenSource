addEventListener('input', e => {
  let _t = e.target,_p = _t.parentNode;

  _p.style.setProperty('--prv', +_p.style.getPropertyValue('--val'));
  _p.style.setProperty('--val', +_t.value);
});