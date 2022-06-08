var graph = document.querySelector("#graph");

CustomEase.create("heartBeat", graph.getAttribute("d"));

tweenShape("#line", "#graph");
tweenShape("#heart", "#heartShape");
tweenShape("#sheen", "#sheenShape");

function tweenShape(element, target) {
	TweenMax.to(element, .9, {
		morphSVG: target,
		ease: "heartBeat",
		repeat: -1
	});
}