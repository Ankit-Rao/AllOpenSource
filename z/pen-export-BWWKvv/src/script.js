// // Use MorphSVGPlugin to extract path data
 var path = MorphSVGPlugin.pathDataToBezier(".path");


// // offset center of bee
TweenMax.set(".bee", {
	xPercent: -50,
	yPercent: -50,
	transformOrigin: "center"
});

// animate bee along path using bezier path data
TweenMax.to(".bee", 7, {
	force3D: true,
	bezier: {
		timeResolution: 20,
		type: "cubic",
		values: path,
		autoRotate: ["x", "y", "rotation"]
	},
	transformOrigin: "center",
	ease: Linear.easeNone,
	repeat: -1
});

// flap wings
var duration = 0.01;
var angle = 30;
TweenMax.staggerTo(".left-wing,.right-wing", duration, {
	cycle: {
		rotation: [angle, -angle],
		transformOrigin: ["bottom right", "top right"]
	},
	repeat: -1,
	yoyo: true,
	ease: Sine.easeInOut
});



// alternatively use an array of values
// and try different types "thru", "soft", "quadratic" and "cubic"
// TweenMax.to(".bee", 7, {
// 	force3D: true,
// 	bezier: {
// 		timeResolution: 20,
// 		type: "thru",
// 		values: [{x:300, y:400}, {x:400, y:300}, {x:600, y:500}, {x:800, y:400}],
// 		autoRotate: ["x", "y", "rotation"]
// 	},
// 	transformOrigin: "center",
// 	ease: Linear.easeNone,
// 	repeat: -1
// });