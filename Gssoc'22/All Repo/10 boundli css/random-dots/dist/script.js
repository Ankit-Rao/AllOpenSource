const _DOTS = document.querySelectorAll('div');

// helper function to generate
// a random number between a min and a max
// also has an int flag (if true returns an integer)
function rand(max = 1, min = 0, int = false) {
	let gen = min + (max - min)*Math.random();
	
	return int ? ~~gen : gen
};

function move() {
	_DOTS.forEach(c => {
		let sf = rand(1, .1); // random scale factor
		
		// set a transition of duration between .9s and 1s
		c.style.transition = `${rand(1, .9)}s`
		
		// set position and size
		c.style.transform = 
			`translate(calc(${rand()}*(100vw - ${sf}*100%)), 
								 calc(${rand()}*(100vh - ${sf}*100%))) 
			 scale(${sf})`;
		
		// set background
		c.style.background = 
			`rgb(${rand(255)}, ${rand(255)}, ${rand(255)}, ${rand(1, .5)})`;
	});
};

window.setInterval(move, 1000); // change dots every second