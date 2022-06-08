CustomEase.create("sloMo", "M0,0 C0,0.118 0.09,0.216 0.171,0.272 0.39,0.424 0.609,0.575 0.828,0.727 0.909,0.783 1,0.881 1,1");

CustomEase.create("anticipateOut", "M0,0 C0.122,0 0.219,0.073 0.255,0.28 0.509,1.74 0.48,1 1,1");

CustomEase.create("anticipateIn", "M0,0 C0.519,0 0.49,-0.74 0.744,0.719 0.78,0.926 0.877,1 1,1");

CustomEase.create("hardBounce", "M0,0 C0.089,0 0.137,0.61 0.166,1 0.227,0.317 0.294,0.306 0.366,1 0.413,0.615 0.462,0.574 0.516,1 0.557,0.761 0.601,0.726 0.647,1 0.675,0.844 0.706,0.839 0.739,1 0.76,0.914 0.783,0.902 0.81,1 0.829,0.942 0.85,0.942 0.872,1 0.889,0.963 0.904,0.956 0.918,1 0.927,0.987 0.937,0.984 0.952,1 0.959,0.992 0.967,0.992 0.976,1 0.984,0.997 0.992,0.996 1,1");

CustomEase.create("softBounce", "M0,0 C0.132,0 0.224,0.536 0.312,1 0.366,0.756 0.441,0.744 0.539,1 0.585,0.906 0.633,0.891 0.686,1 0.718,0.96 0.752,0.951 0.787,1 0.808,0.983 0.83,0.979 0.851,1 0.871,0.989 0.891,0.989 0.909,1 0.929,0.994 0.947,0.993 0.963,1 0.974,0.996 0.987,0.997 1,1");

CustomEase.create("heartBeat", "M0,0 C0.069,0 0.076,-0.138 0.138,-0.138 0.228,-0.138 0.197,1 0.266,1 0.334,1 0.346,-0.294 0.415,-0.294 0.485,-0.294 0.481,0.4 0.554,0.4 0.626,0.4 0.61,-0.146 0.692,-0.146 0.76,-0.146 0.751,0.06 0.811,0.06 0.864,0.06 0.84,0 1,0");

CustomEase.create("cosine", "M0,0 C0.178,0 0.322,1 0.5,1 0.678,1 0.822,0 1,0");

CustomEase.create("sine", "M0,0.5 C0.08,0.75 0.161,1 0.25,1 0.428,1 0.572,0 0.75,0 0.839,0 0.919,0.25 1,0.5");

CustomEase.create("shake-to-stop", "M0,0 C0.119,0 0.086,-0.5 0.204,-0.5 0.283,-0.5 0.283,1 0.363,1 0.442,1 0.441,-1 0.521,-1 0.601,-1 0.606,0.5 0.685,0.5 0.764,0.5 0.685,0 1,0");

CustomEase.create("shake-continuous", "M0,0 C0.031,-0.25 0.062,-0.501 0.125,-0.5 0.25,-0.5 0.25,1.002 0.375,1 0.5,1 0.5,-1.004 0.625,-1 0.625,-1 0.625,-1 0.625,-1 0.75,-1 0.75,0.503 0.875,0.5 0.875,0.5 0.875,0.5 0.875,0.5 0.937,0.5 0.968,0.25 1,0");



duration = 2.4;
tween(".linear div", Linear.easeNone);
tween(".sloMo div", "sloMo",1.5);
tween(".anticipateOut div", "anticipateOut",1.2);
tween(".anticipateIn div", "anticipateIn",1.2);
tween(".hardBounce div", "hardBounce",2.4);
tween(".softBounce div", "softBounce",2);
tween(".heartBeat div", "heartBeat", .8);
tween(".cosine div", "cosine", 4);
tween(".sine div", "sine", 4);
tween(".shake-to-stop div", "shake-to-stop", 1.6);
tween(".shake-continuous div", "shake-continuous", 1.6);

function tween(target, ease, duration) {
	var element = document.querySelector(target);
	element.tween = TweenMax.to(element, duration, {
		delay: .5,
		right: "0%",
		ease: ease
	});
	element.restart = function() {
		element.tween.play(0)
	};
	element.parentElement.addEventListener("click", element.restart);
}