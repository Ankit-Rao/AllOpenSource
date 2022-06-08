var canvas, context;
var walkers = [];
var colors = [
	"rgba(107, 62, 38, 0.7)",
	"rgba(255, 197, 217, 0.7)",
	"rgba(194, 242, 208,0.7)",
	"rgba(253, 245, 201,0.7)",
	"rgba(255, 203, 133,0.7)"
];

//Uncomment this to display the circles without alpha

// var colors = [
// 	"#6b3e26",
// 	"#ffc5d9",
// 	"#c2f2d0",
// 	"#fdf5c9",
// 	"#ffcb85"
// ];

window.requestAnimFrame = (function(){
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        function(callback){
            window.setTimeout(callback, 1000 / 60);
        };
})();

var Walker = function(x,y,vx,vy,radius,color) {
	this.x = x;
	this.y = y;
	this.vx = vx;
	this.vy = vy;
	this.radius = radius; //size of each ice cream ball
	this.color = color; 
}

Walker.prototype.update = function(x,y) {
	this.x = x;
	this.y = y;
}

function rand(max) {

	return Math.floor((max) * Math.random());
}

//Useful Functions
function getMousePosition(canvas, event) {
	var rect = canvas.getBoundingClientRect();
	//Returns a object with the coordinates of the current mouse location
	return {
		x: event.clientX - rect.left,
        y: event.clientY - rect.top
	};
}

//Returns Random Number
function randomNumber(max,min) {
	if(!min){
		min = 0;
	}
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

//Function that will be loaded in the load of the page
function setup() {
	var x = Math.floor(window.innerWidth / 2);
	var y = Math.floor(window.innerHeight / 2);

	canvas = document.querySelector('canvas');

	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;

	context = canvas.getContext('2d');
	for(let i = 0; i < 15; i++){
    walkers.push(new Walker(canvas.width/2, canvas.height/2, 5, 5, 10, colors[randomNumber(colors.length)]));
  }
	document.addEventListener("click", function(e){
		var mousePos = getMousePosition(canvas,e);
		var vx = randomNumber(10,5);
		var vy = randomNumber(10,5);
		var radius = randomNumber(20,10);
		var color = colors[randomNumber(colors.length)];
		var walker = new Walker(mousePos.x, mousePos.y, vx, vy, radius, color);
		walkers.push(walker);
		console.log(walker); //display the created walker in the console
	});
}

function drawLine(walker) {
	var x = walker.x, y = walker.y;
	var vx = walker.vx, vy= walker.vy;
	var radius = walker.radius;
	var color = walker.color;

	switch(randomNumber(4)) {
		case 0:
			if(walker.x < canvas.width){
				x += vx;	
			} 
		break;

		case 1:
			if(walker.x  > 0){
				x -= vx;	
			} 
		break;

		case 2:
			if(walker.y < canvas.height){
				y += vy;	
			} 
		break;

		case 3:
			if(walker.y > 0){
				y -= vy;	
			} 
		break;
	}

	context.fillStyle = color;

	context.beginPath();
	context.arc(x, y, radius , 0, 2 * Math.PI, false);
	context.fill();

	walker.update(x, y);
}

function draw() {
	for(let i in walkers) {
		var walker = walkers[i];
		drawLine(walker);
	}
	requestAnimationFrame(draw);
}

window.onload = function () {
	setup();
	requestAnimationFrame(draw);
}