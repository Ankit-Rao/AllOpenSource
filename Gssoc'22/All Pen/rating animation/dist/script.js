// For illustration purposes only
// Use JS to adjust the width attribute of the .value rectangle element.
TweenMax.to(".value", 2, {
	attr:{width: 0},
	yoyo: true,
	ease:Quint.easeInOut,
	repeat: -1
});