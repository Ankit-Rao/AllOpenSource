var path = MorphSVGPlugin.pathDataToBezier(".path");
var timeline = new TimelineMax();
// move circles along path
timeline.staggerTo("circle", 4.5, {
	force3D: true,
	bezier: {
		type: "cubic",
		values: path
	},
	ease: Linear.easeNone,
	repeat: -1
}, .57);
timeline.time(9);

// rotate svg (not needed but make look random)
TweenMax.to("svg", 3.2, {
	rotation: -360,
	repeat: -1,
	transformOrigin: "center",
	ease: Linear.easeNone
})