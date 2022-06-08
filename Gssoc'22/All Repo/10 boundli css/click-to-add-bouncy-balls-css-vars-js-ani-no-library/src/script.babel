const _ROOT = document.documentElement, 
			BALLS = [];

let ct = 0, rID = null, n = BALLS.length, g = 1;

function rand(max = 1, min = 0, is_int = 1) {
	const gen = min + (max - min)*Math.random();
	
	return is_int ? Math.round(gen) : gen
};

function stopAni() {
	if(rID) {
		cancelAnimationFrame(rID);
		rID = null
	}
};

function move() {
	let moving = 0;
	
	++ct;
	
	for(let i = 0; i < n; i++) {
		if(BALLS[i].mv) {
			let dt = ct - BALLS[i].t0, 
					y = BALLS[i].y0 + BALLS[i].v0*dt - .5*g*dt*dt;
			
			if(y <= 0) {
				BALLS[i].ht += 1;
				y = BALLS[i].y0 = 0;
				BALLS[i].v0 = -Math.pow(.9, BALLS[i].ht)*(BALLS[i].v0 - g*dt);
				BALLS[i].t0 = ct;
				
				BALLS[i].mv = BALLS[i].v0 >= .5;
			}
			
			BALLS[i].el.style.setProperty('--ball-h', `${Math.round(y)}px`)
			++moving;
		}
	}
	
	if(!moving) {
		stopAni();
		return
	}
	
	rID = requestAnimationFrame(move);
};

addEventListener('click', e => {
	if(!e.target.classList.contains('ball')) {
		const _NEW = document.createElement('div'), 
					R = rand(65, 35), 
					H = _ROOT.clientHeight - (e.clientY + R), 
					DATA = {
						'--ball-x': `${e.clientX}px`, 
						'--ball-r': `${R}px`, 
						'--ball-h': `${H}px`, 
						'--ball-ang': `${rand(360)}deg`
					};
		
		BALLS.push({
			el: _NEW, 
			y0: H, 
			v0: 0, 
			t0: ct, 
			mv: 1, 
			ht: 0
		});
		++n;
		
		for(let p in DATA) _NEW.style.setProperty(p, DATA[p]);
		_NEW.classList.add('ball')
		document.body.appendChild(_NEW);
		if(!rID) move();
	}
}, false);

addEventListener('dblclick', e => {
	if(e.target.classList.contains('ball')) {
		for(let i = 0; i < n; i++) {
			if(e.target === BALLS[i].el) {
				BALLS.splice(i, 1);
				if(!--n) stopAni()
			}
		}
		
		document.body.removeChild(e.target);
	}
}, false);