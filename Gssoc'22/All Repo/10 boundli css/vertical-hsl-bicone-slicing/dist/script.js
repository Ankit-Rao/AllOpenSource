addEventListener('input', e => {
  let _t = e.target;

  document.body.style.setProperty(`--${_t.id}`, +_t.value);
});