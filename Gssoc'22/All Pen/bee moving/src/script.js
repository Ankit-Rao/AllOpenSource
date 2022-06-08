var path = MorphSVGPlugin.pathDataToBezier(".path");
TweenLite.set(".bee", {xPercent:-50, yPercent:-50, transformOrigin:"center"});

var bee = document.querySelector(".bee");
TweenMax.to(bee, 20, {
	force3D:true,
	bezier: {
		type: "cubic",
		values: path,
		autoRotate:true
	},
	ease:Linear.easeNone,
	repeat:-1,
	onUpdate:moveGradient
});

function moveGradient(){
	var transform=bee._gsTransform;
	TweenMax.set("#gradient",{attr:{cx:transform.x,cy:transform.y}})
}

TweenMax.to(".leftWing",.01,{rotation:30,transformOrigin:"100% 100%",ease:Quint.easeInOut,yoyo:true,repeat:-1});
TweenMax.to(".rightWing",.01,{rotation:-30,transformOrigin:"100% 0%",ease:Quint.easeInOut,yoyo:true,repeat:-1});