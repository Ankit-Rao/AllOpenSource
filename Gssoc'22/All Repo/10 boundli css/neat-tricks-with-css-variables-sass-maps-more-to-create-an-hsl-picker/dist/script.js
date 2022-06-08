addEventListener('input', e => {
  const _T = e.target;

  if (_T.id && _T.id.match(/^[hsl]$/)) {
    document.body.style.setProperty(`--${_T.id}`, +_T.value);
  }
}, false);