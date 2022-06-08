CustomEase.create("horizontal", "M0,0 L.25,1 .5,1 .75,0 1,0");
CustomEase.create("vertical", "M0,0 L.25,0 .5,1 .75,1 1,0");

TweenMax.to(".circle", 2, {
	x: 400,
	ease: "horizontal",
	repeat: -1
});

TweenMax.to(".circle", 2, {
	y: 400,
	ease: "vertical",
	repeat: -1
});