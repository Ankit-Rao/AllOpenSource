const _NAV = document.querySelector('nav'), 
		ATTR = 'aria-current';

_NAV.addEventListener('click', e => {
	const _TG = e.target;
	
	if(_TG.href) {
		_NAV.style.setProperty('--curr', [..._NAV.children].indexOf(_TG));
		_NAV.querySelector(`[${ATTR}]`).removeAttribute(ATTR)
		_TG.setAttribute(ATTR, true);
	}
}, false);

_NAV.addEventListener('mouseover', e => {
	const _TG = e.target;
	
	if(_TG.href)
		_NAV.style.setProperty('--hover', [..._NAV.children].indexOf(_TG))
}, false);

_NAV.addEventListener('mouseout', e => {	
	_NAV.style.removeProperty('--hover')
}, false);