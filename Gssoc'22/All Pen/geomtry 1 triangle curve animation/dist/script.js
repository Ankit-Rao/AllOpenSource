var points = [{
	x: 0.1,
	y: 0.9
}, {
	x: 0.5,
	y: 0.1
}, {
	x: 0.9,
	y: 0.9
}];
var controls = [];
var interpolationsA = [];
var interpolationB;
var segmentsA = [];
var segmentB;
var svg = document.querySelector("svg");
var path;
var percent = 0;
var progressSlider = document.querySelector("input");
var index = 0;

function draw() {
	TweenMax.set("h2", {
		innerHTML: "progress = " + Number(progressSlider.value).toFixed(3)
	});
	for (var p = 0; p < points.length; p++) {
		var point = points[p];
		var control = controls[p];
		control.x = window.innerWidth * point.x;
		control.y = window.innerHeight * point.y;
		setAttributes(control, {
			cx: control.x,
			cy: control.y
		});
	}
	for (var i = 0; i < points.length - 1; i++) {
		var interpolationA = interpolationsA[i];
		interpolationA.x = ((controls[i + 1].x - controls[i].x) * percent) + controls[i].x;
		interpolationA.y = ((controls[i + 1].y - controls[i].y) * percent) + controls[i].y;
		setAttributes(interpolationA, {
			cx: interpolationA.x,
			cy: interpolationA.y
		});

		var segmentA = segmentsA[i];
		setAttributes(segmentA, {
			x1: controls[i].x,
			y1: controls[i].y,
			x2: controls[i + 1].x,
			y2: controls[i + 1].y
		});
	}

	interpolationB.x = ((interpolationsA[1].x - interpolationsA[0].x) * percent) + interpolationsA[0].x;
	interpolationB.y = ((interpolationsA[1].y - interpolationsA[0].y) * percent) + interpolationsA[0].y;
	setAttributes(interpolationB, {
		cx: interpolationB.x,
		cy: interpolationB.y
	});
	setAttributes(segmentB, {
		x1: interpolationsA[0].x,
		y1: interpolationsA[0].y,
		x2: interpolationsA[1].x,
		y2: interpolationsA[1].y
	});
	setAttributes(path, {
		d: "M" + controls[0].x + "," + controls[0].y + "Q" + controls[1].x + "," + controls[1].y + " " + controls[2].x + "," + controls[2].y
	})
}

function init() {
	path = createElement("path", {
		class: "path"
	});
	svg.appendChild(path);

	segmentB = createElement("line", {
		class: "segment-b"
	});
	svg.appendChild(segmentB);
	for (var i = 0; i < points.length; i++) {
		var point = points[i];

		if (i < points.length - 1) {
			var segmentA = createElement("line", {
				class: "segment-a"
			});
			svg.appendChild(segmentA);
			segmentsA.push(segmentA);

			var interpolationA = createElement("circle", {
				class: "interpolation-a",
				r: 3
			});
			svg.appendChild(interpolationA);
			interpolationsA.push(interpolationA);
		}

		var control = createElement("circle", {
			class: "control",
			r: 5
		});
		svg.appendChild(control);
		controls.push(control);
		control.addEventListener("mousedown", startDrag);
	}
	interpolationB = createElement("circle", {
		class: "interpolation-b",
		r: 6
	});
	svg.appendChild(interpolationB);
	draw();
}

init();
window.onresize = draw;

function startDrag(e) {
	index = controls.indexOf(e.target);
	window.addEventListener("mousemove", drag);
	window.addEventListener("mouseup", stopDrag);
}

function stopDrag(e) {
	index = controls.indexOf(e.target);
	window.removeEventListener("mousemove", drag);
	window.removeEventListener("mouseup", stopDrag);
}

function drag(e) {
	points[index].x = Math.min(Math.max(e.clientX / window.innerWidth, 0), 1);
	points[index].y = Math.min(Math.max(e.clientY / window.innerHeight, 0), 1);
	draw();
}

function setAttributes(element, attributes) {
	var keyword, key;
	for (keyword in attributes) {
		key = keyword.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
		element.setAttributeNS(keyword === "xlink:href" ? "http://www.w3.org/1999/xlink" : null, key, attributes[keyword]);
	}
}

function createElement(type, attributes) {
	var element = document.createElementNS("http://www.w3.org/2000/svg", type);
	setAttributes(element, attributes);
	return element;
}

function update() {
	TweenMax.to(this, 0.5, {
		percent: progressSlider.value,
		ease: Quint.easeOut,
		onUpdate: draw
	});
}

TweenMax.to(progressSlider, 3, {
	value: 1,
	onUpdate: update,
	onUpdateScope: this,
	ease: Quint.easeInOut
});
TweenMax.to(progressSlider, 2, {
	delay: 3,
	value: 0.5,
	onUpdate: update,
	onUpdateScope: this,
	ease: Quint.easeInOut
});