function update(_el, _btn) {
  let def = _btn;
  _btn = _btn || _el.parentNode.querySelector('button');
  let val = +_btn.dataset.val;

  if (def) _el.value = val;
  _btn.disabled = +_el.value === +val;
  document.body.style.setProperty(
  `--${_el.id}`,
  `${_el.value}${_el.dataset.unit || ''}`);
};

/* update filter on dragging slider handle */
addEventListener('input', e => {update(e.target);});

/* reset filter to initial value */
addEventListener('click', e => {
  e.preventDefault();
  let _tg = e.target,id = _tg.dataset.var;
  if (id) update(document.getElementById(id), _tg);
});