var totalWidthUsers = 0;
var totalHeightUsers = 0;
var highestWidthPercent = 0;
var highestHeightPercent = 0;
var widthPercentages = [];
var heightPercentages = [];
var svg = document.querySelector("svg");
var grid = document.querySelector(".grid");
var labels = document.querySelector(".labels");
var widthGradient = document.querySelector("#width-gradient");
var heightGradient = document.querySelector("#height-gradient");
function init() {
	totalWidthUsers = add(widthUsers);
	totalHeightUsers = add(heightUsers);
	var widthData = getPercents(widthUsers,totalWidthUsers);
	var heightData = getPercents(heightUsers,totalHeightUsers);
	widthPercentages = widthData.percents;
	heightPercentages = heightData.percents;
	highestWidthPercent = widthData.highest;
	highestHeightPercent = heightData.highest;
	drawHeight();
	drawWidth();
}
function drawWidth() {
	console.log(widthPercentages.length,heightPercentages.length);
	
	for (var i = 1; i <= widthPercentages.length; i++) {
		var gradientOffset = (((i+1+.5)/widthPercentages.length)*100)+"%";
		var gradientOpacity = Math.sqrt(widthPercentages[i] / highestWidthPercent);

		var stop = createElement("stop", {
			offset: gradientOffset,
			stopColor: "#f00",
			stopOpacity: gradientOpacity
		});

		var line = createElement("line", {
			y1:30,
			y2: "100%",
			x1: i*100,
			x2: i*100,
			stroke: "#000",
			opacity: 0.2
		});

		var widthLabel = createElement("text", {
			fontFamily: "sans-serif",
			textAnchor:"middle",
			y: 20,
			x: i*100
		});
		widthLabel.textContent = i * 100 + " px";

		widthGradient.appendChild(stop);

		grid.appendChild(line);
		labels.appendChild(widthLabel);
	}
}
function drawHeight() {
	for (var i = 1; i < heightPercentages.length; i++) {
		var gradientOffset = (((i+.5)/heightPercentages.length)*100)+"%";
		var gradientOpacity = Math.sqrt(heightPercentages[i] / highestHeightPercent);
		
		var stop = createElement("stop", {
			offset: gradientOffset,
			stopColor: "#0af",
			stopOpacity: gradientOpacity
		});

		var line = createElement("line", {
			x2: "100%",
			y1: i*100,
			y2: i*100,
			stroke: "#000",
			opacity: 0.2
		});

		var heightLabel = createElement("text", {
			fontFamily: "sans-serif",
			x: 10,
			y: (i * 100) - 10
		});
		heightLabel.textContent = i * 100 + " px";

		heightGradient.appendChild(stop);

		grid.appendChild(line);
		labels.appendChild(heightLabel);
	}
}

function getPercents(array,total) {
	var percents = [];
	var highestPercent = 0;
	for (var i = 0; i < array.length; i++) {
		var percent = array[i] / total;
		percents.push(percent);
		if (percent > highestPercent) {
			highestPercent = percent;
		}
	}
	return {percents:percents,highest:highestPercent};
}

function add(array) {
	var total = 0;
	for (var i = 0; i < array.length; i++) {
		total += array[i];
	}
	return total;
}

function setAttributes(element, attributes) {
	var keyword, key;
	for (keyword in attributes) {
		key = keyword.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
		element.setAttributeNS(
			keyword === "xlink:href" ? "http://www.w3.org/1999/xlink" : null,
			key,
			attributes[keyword]
		);
	}
}
function createElement(type, attributes) {
	var element = document.createElementNS("http://www.w3.org/2000/svg", type);
	setAttributes(element, attributes);
	return element;
}

var widthUsers = [
	16257,
	29415,
	13851884,
	83895,
	94436,
	367689,
	1280160,
	466563,
	683603,
	2543863,
	1701075,
	6233908,
	6328708,
	3072625,
	1832256,
	1980103,
	230724,
	230611,
	3136293,
	62828,
	39446,
	19749,
	11511,
	13664,
	83119,
	578,
	1922,
	849,
	567,
	779,
	109,
	327,
	100,
	2641,
	39,
	40,
	635,
	53,
	67,
	67
];

var heightUsers = [
	9835,
	211297,
	86911,
	205307,
	12310613,
	4011770,
	10679749,
	7322935,
	3242369,
	4966417,
	573577,
	215007,
	200344,
	348958,
	46584,
	66883,
	14742,
	8816,
	23557,
	2758,
	2675,
	1338,
	2732,
	1353,
	1501,
	1246,
	1416,
	1005,
	905,
	916,
	7050,
	822,
	774,
	769,
	681,
	628,
	486,
	438,
	386,
	358
];


init();


function update(value){
	svg.style.width=svg.style.height = value+"px";
	grid.style.opacity=value/4000;
}