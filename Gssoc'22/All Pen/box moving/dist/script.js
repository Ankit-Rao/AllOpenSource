function nextPosition() {
	var width = ((Math.random()*0.3)+0.2) * window.innerWidth;
	var height = ((Math.random()*0.3)+0.2) * window.innerHeight;
	TweenMax.to(".focus-reticle", 0.5, {
		delay:2,
		width: width,
		height: height,
		x: Math.random() * (window.innerWidth - width),
		y: Math.random() * (window.innerHeight - height),
		ease: Quint.easeInOut,
		onComplete:nextPosition
	});
}
nextPosition();