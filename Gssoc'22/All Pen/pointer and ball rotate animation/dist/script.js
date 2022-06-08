var pageCenter = {
	x: window.innerWidth * 0.5,
	y: window.innerHeight * 0.5
};
var point = {
	x: 0.25,
	y: 0.49999999
};
var target = document.querySelector(".target");
var arrow = document.querySelector(".arrow");
var h2 = document.querySelector("h2");

function draw() {
	pageCenter = {
		x: window.innerWidth * 0.5,
		y: window.innerHeight * 0.5
	};
	// convert to pixel values
	var targetX = point.x * window.innerWidth;
	var targetY = point.y * window.innerHeight;
	// calculate radians <- this is the most important piece...
	var radians = Math.atan2(targetY - pageCenter.y, targetX - pageCenter.x);
	// convert radians to degrees.
	var degrees = radians * 180 / Math.PI;
	target.setAttribute("cx", targetX);
	target.setAttribute("cy", targetY);
	arrow.setAttribute("transform", "rotate(" + degrees + ")");
	h2.innerHTML ="Radians: "+radians.toFixed(2)+" Degrees: "+degrees.toFixed(2);
}
draw();

window.onresize = draw;

target.addEventListener("mousedown", startDrag);

function startDrag(e) {
	window.addEventListener("mousemove", drag);
	window.addEventListener("mouseup", stopDrag);
}

function stopDrag(e) {
	window.removeEventListener("mousemove", drag);
	window.removeEventListener("mouseup", stopDrag);
}

function drag(e) {
	// store percentage of cursor position instead of using pixel values so resizing screen doesn't overlap target
	point.x = Math.min(Math.max(e.clientX / window.innerWidth, 0), 1);
	point.y = Math.min(Math.max(e.clientY / window.innerHeight, 0), 1);
	draw();
}




//// Initial animation
var timeline = new TimelineMax();

timeline.to(point, .5, {
	y: .25,
	ease: Sine.easeOut,
	onUpdate: draw
});
timeline.to(point, .5, {
	y: .5,
	ease: Sine.easeIn,
	onUpdate: draw,
});
timeline.to(point, .5, {
	y: .75,
	ease: Sine.easeOut,
	onUpdate: draw,
});
timeline.to(point, .5, {
	y: .5,
	ease: Sine.easeIn,
	onUpdate: draw,
});

timeline.to(point, 1, {
	x: .75,
	ease: Sine.easeInOut,
	onUpdate: draw,
	yoyo: true,
	repeat: 1
}, 0);

TweenMax.to(timeline, 3, {
	progress: 1,
	ease: Quint.easeInOut
});