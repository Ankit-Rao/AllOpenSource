var container = document.querySelector(".container");
var ball = document.querySelector(".ball");

var x = 0;
var y = 0;
var vx = 10;
var vy = 5;

var friction = .975;
var gravity = 2;

function loop() {
	vy+=gravity;
	
	vx*=friction;
	vy*=friction;
	
	x += vx;
	y += vy;
	
	if (x > container.offsetWidth-100) {
		x = container.offsetWidth-100;
		vx *= -1;
	}
	if (y > container.offsetHeight-100) {
		y = container.offsetHeight-100;
		vy *= -1;
	}
	if(x<0){
		x = 0;
		vx*=-1;
	}
	if(y<0){
		y = 0;
		vy*=-1;
	}
	ball.style.transform = "translate(" + x + "px," + y + "px)";
	window.requestAnimationFrame(loop);
}

loop();