var duration = 0.01;
var angle = 30;
// move wings
TweenMax.to(".left-wing", duration, {
	rotation: angle,
	yoyo: true,
	transformOrigin: "top right",
	repeat: -1,
	ease: Sine.easeInOut
});
TweenMax.to(".right-wing", duration, {
	rotation: -angle,
	yoyo: true,
	transformOrigin: "top left",
	repeat: -1,
	ease: Sine.easeInOut
});

// optional optimization
// TweenMax.staggerTo(".left-wing,.right-wing", duration, {
//     cycle: {
//         rotation: [angle, -angle],
//         transformOrigin: ["top right", "top left"]
//     },
//     repeat: -1,
//     yoyo: true,
//     ease: Sine.easeInOut
// });

//bug out eyes
TweenMax.staggerTo(".left-eye,.right-eye", .2, {
	scale: 1.1,
	yoyo: true,
	transformOrigin: "center",
	repeat: -1,
	ease: Sine.easeInOut
},.1);