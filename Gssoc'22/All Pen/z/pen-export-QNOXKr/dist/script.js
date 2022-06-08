var path = MorphSVGPlugin.pathDataToBezier(".path");
TweenLite.set(".arrow", {xPercent:-50, yPercent:-50, transformOrigin:"center"});


TweenMax.to(".arrow", 20, {
	force3D:true,
	bezier: {
		type: "cubic",
		values: path,
		autoRotate:["x","y","rotation"]
	},
	ease:Linear.easeNone,
	repeat:-1
});