var button = document.querySelector("button");

TweenMax.staggerFrom(
	"circle",
	0.5,
	{ scale: 0, transformOrigin: "center", yoyo: true, repeat: -1 },
	0.1
);



button.addEventListener("click", onClick);
var timeout;


function onClick(){
	button.classList.toggle("button-disabled");
	clearTimeout(timeout);
	timeout=setTimeout(function(){
		button.classList.toggle("button-disabled")
	}, 2000);
}