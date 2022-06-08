document.documentElement.classList.add('js');

const S = document.body.style;

addEventListener('input', e => {
  let _t = e.target,id = _t.id,val = +_t.value;

  S.setProperty(`--${id}`, val);

  if (id === 'a') {
    let rad = val * Math.PI / 180;
    S.setProperty(`--cos`, +Math.cos(rad).toFixed(3));
    S.setProperty(`--sin`, +Math.sin(rad).toFixed(3));
  }
}, false);