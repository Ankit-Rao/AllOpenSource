var artboardBackground = document.querySelector(".artboard-background");
var previewContainer = document.querySelector(".preview-container");
var iframe = document.querySelector("iframe");

function scale(value) {
	previewContainer.style.transform = "translate(-50%,-50%) scale(" + value + ")";
	artboardBackground.style.backgroundSize = (value*220)+"px";
}
function setWidth(value) {
	iframe.style.width = value + "px";
}
function setHeight(value) {
	iframe.style.height = value + "px";
}

scale(0.9166666667);
setWidth(320);
setHeight(568);