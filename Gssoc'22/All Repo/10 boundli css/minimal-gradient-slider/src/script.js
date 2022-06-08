addEventListener('input', e => {
	document.body.style.setProperty('--val', +e.target.value)
}, false);